import { promises as fs } from "node:fs";
import path from "node:path";

const CONTENT_ROOT = path.join(/*turbopackIgnore: true*/ process.cwd(), "content");
const ALLOWED_EXTENSIONS = new Set([".yaml", ".yml"]);
const LIST_CACHE_TTL_MS = 3_000;

type ContentFieldType = "string" | "integer" | "boolean" | "string_array";

type SchemaContract = {
  pattern: RegExp;
  requiredKeys: string[];
  fieldTypes: Record<string, ContentFieldType>;
};

const SCHEMA_CONTRACTS: SchemaContract[] = [
  {
    pattern: /^pages\/home\.ya?ml$/,
    requiredKeys: ["titleEn", "titleRu", "descriptionEn", "descriptionRu", "introEn", "introRu"],
    fieldTypes: {
      titleEn: "string",
      titleRu: "string",
      descriptionEn: "string",
      descriptionRu: "string",
      introEn: "string",
      introRu: "string",
    },
  },
  {
    pattern: /^pages\/projects\.ya?ml$/,
    requiredKeys: ["titleEn", "titleRu", "descriptionEn", "descriptionRu"],
    fieldTypes: {
      titleEn: "string",
      titleRu: "string",
      descriptionEn: "string",
      descriptionRu: "string",
    },
  },
  {
    pattern: /^pages\/legal\.ya?ml$/,
    requiredKeys: ["titleEn", "titleRu", "descriptionEn", "descriptionRu", "bodyEn", "bodyRu"],
    fieldTypes: {
      titleEn: "string",
      titleRu: "string",
      descriptionEn: "string",
      descriptionRu: "string",
      bodyEn: "string",
      bodyRu: "string",
    },
  },
  {
    pattern: /^projects\/.+\.ya?ml$/,
    requiredKeys: ["slug", "titleEn", "titleRu", "summaryEn", "summaryRu", "year", "stack"],
    fieldTypes: {
      slug: "string",
      titleEn: "string",
      titleRu: "string",
      summaryEn: "string",
      summaryRu: "string",
      year: "integer",
      stack: "string_array",
      featured: "boolean",
    },
  },
];

let listCache: { expiresAt: number; paths: string[] } | null = null;

export class ContentOpsError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export const CONTENT_OPS_CONTEXT = {
  root: "content/",
  supportedExtensions: [".yaml", ".yml"],
  operations: ["list", "read", "upsert", "delete", "context"],
  pathContracts: SCHEMA_CONTRACTS.map((entry) => ({
    pattern: entry.pattern.source,
    requiredKeys: entry.requiredKeys,
    fieldTypes: entry.fieldTypes,
  })),
};

function invalidateListCache() {
  listCache = null;
}

function ensureRelativePath(relativePath: string): string {
  if (typeof relativePath !== "string" || relativePath.trim() === "") {
    throw new ContentOpsError("Content path must be a non-empty string", "INVALID_PATH", 400);
  }

  if (path.isAbsolute(relativePath)) {
    throw new ContentOpsError("Absolute paths are not allowed", "INVALID_PATH", 400);
  }

  const normalized = path.normalize(relativePath).replace(/\\/g, "/");
  if (normalized.startsWith("../") || normalized === "..") {
    throw new ContentOpsError("Path traversal is forbidden", "PATH_TRAVERSAL", 400);
  }

  const resolved = path.resolve(CONTENT_ROOT, normalized);
  const rootResolved = path.resolve(CONTENT_ROOT);
  if (resolved !== rootResolved && !resolved.startsWith(`${rootResolved}${path.sep}`)) {
    throw new ContentOpsError("Resolved path escapes content root", "PATH_TRAVERSAL", 400);
  }

  const extension = path.extname(resolved).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    throw new ContentOpsError("Only YAML files are supported", "UNSUPPORTED_EXTENSION", 400);
  }

  return normalized;
}

async function ensureContentRootExists() {
  try {
    await fs.access(CONTENT_ROOT);
  } catch {
    throw new ContentOpsError("Content directory does not exist", "CONTENT_ROOT_MISSING", 500);
  }
}

async function assertNoSymlinkTraversal(normalizedRelativePath: string) {
  const parts = normalizedRelativePath.split("/").filter(Boolean);
  let current = CONTENT_ROOT;

  for (let index = 0; index < parts.length; index += 1) {
    current = path.join(current, parts[index]);
    try {
      const stat = await fs.lstat(current);
      if (stat.isSymbolicLink()) {
        throw new ContentOpsError("Symlink traversal is forbidden", "SYMLINK_TRAVERSAL", 400);
      }
    } catch (error) {
      if (error instanceof ContentOpsError) {
        throw error;
      }
      // Ignore missing segments; they may be created later during upsert.
    }
  }
}

async function walkYaml(directory: string, prefix = ""): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const paths: string[] = [];

  for (const entry of entries) {
    const relative = path.join(prefix, entry.name);
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      const nested = await walkYaml(fullPath, relative);
      paths.push(...nested);
      continue;
    }

    if (ALLOWED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      paths.push(relative.replace(/\\/g, "/"));
    }
  }

  return paths;
}

function validateContentByPath(
  normalizedRelativePath: string,
  content: string,
): { missingKeys: string[]; invalidTypes: string[] } {
  const contract = SCHEMA_CONTRACTS.find((entry) => entry.pattern.test(normalizedRelativePath));
  if (!contract) {
    return { missingKeys: [], invalidTypes: [] };
  }

  const missingKeys = contract.requiredKeys.filter((key) => !new RegExp(`^${key}:`, "m").test(content));
  const invalidTypes: string[] = [];

  for (const [fieldName, fieldType] of Object.entries(contract.fieldTypes)) {
    if (!new RegExp(`^${fieldName}:`, "m").test(content)) {
      continue;
    }

    if (fieldType === "integer") {
      if (!new RegExp(`^${fieldName}:\\s*['\"]?\\d+['\"]?\\s*$`, "m").test(content)) {
        invalidTypes.push(`${fieldName} must be an integer`);
      }
      continue;
    }

    if (fieldType === "boolean") {
      if (!new RegExp(`^${fieldName}:\\s*(true|false)\\s*$`, "m").test(content)) {
        invalidTypes.push(`${fieldName} must be a boolean`);
      }
      continue;
    }

    if (fieldType === "string_array") {
      const hasArrayKey = new RegExp(`^${fieldName}:\\s*(|#.*)$`, "m").test(content);
      const hasArrayItems = /^\s*-\s+.+$/m.test(content);
      if (!hasArrayKey || !hasArrayItems) {
        invalidTypes.push(`${fieldName} must be an array of strings`);
      }
      continue;
    }

    if (fieldType === "string") {
      const keyValueLine = new RegExp(`^${fieldName}:\\s*.+$`, "m").test(content);
      if (!keyValueLine) {
        invalidTypes.push(`${fieldName} must be a string`);
      }
    }
  }

  return { missingKeys, invalidTypes };
}

export async function listContentPaths(): Promise<string[]> {
  await ensureContentRootExists();

  if (listCache && listCache.expiresAt > Date.now()) {
    return [...listCache.paths];
  }

  const paths = (await walkYaml(CONTENT_ROOT)).sort();
  listCache = {
    expiresAt: Date.now() + LIST_CACHE_TTL_MS,
    paths,
  };
  return [...paths];
}

export async function readContentFile(relativePath: string): Promise<string> {
  await ensureContentRootExists();
  const normalizedRelativePath = ensureRelativePath(relativePath);
  await assertNoSymlinkTraversal(normalizedRelativePath);

  try {
    const resolvedPath = path.join(CONTENT_ROOT, normalizedRelativePath);
    return await fs.readFile(resolvedPath, "utf8");
  } catch {
    throw new ContentOpsError("Failed to read content file", "READ_FAILED", 500);
  }
}

export async function upsertContentFile(relativePath: string, content: string): Promise<void> {
  await ensureContentRootExists();
  const normalizedRelativePath = ensureRelativePath(relativePath);
  await assertNoSymlinkTraversal(normalizedRelativePath);

  if (typeof content !== "string") {
    throw new ContentOpsError("Content must be a string", "INVALID_CONTENT", 400);
  }

  const { missingKeys, invalidTypes } = validateContentByPath(normalizedRelativePath, content);
  if (missingKeys.length > 0) {
    throw new ContentOpsError(
      `Missing required keys: ${missingKeys.join(", ")}`,
      "SCHEMA_VALIDATION_FAILED",
      422,
    );
  }

  if (invalidTypes.length > 0) {
    throw new ContentOpsError(
      `Schema type validation failed: ${invalidTypes.join("; ")}`,
      "SCHEMA_TYPE_VALIDATION_FAILED",
      422,
    );
  }

  try {
    const resolvedPath = path.join(CONTENT_ROOT, normalizedRelativePath);
    await fs.mkdir(path.dirname(resolvedPath), { recursive: true });
    await fs.writeFile(resolvedPath, content, "utf8");
    invalidateListCache();
  } catch {
    throw new ContentOpsError("Failed to write content file", "WRITE_FAILED", 500);
  }
}

export async function deleteContentFile(relativePath: string): Promise<void> {
  await ensureContentRootExists();
  const normalizedRelativePath = ensureRelativePath(relativePath);
  await assertNoSymlinkTraversal(normalizedRelativePath);

  try {
    const resolvedPath = path.join(CONTENT_ROOT, normalizedRelativePath);
    await fs.unlink(resolvedPath);
    invalidateListCache();
  } catch {
    throw new ContentOpsError("Failed to delete content file", "DELETE_FAILED", 500);
  }
}

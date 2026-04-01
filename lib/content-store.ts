import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_ROOT, "projects");
const PAGES_DIR = path.join(CONTENT_ROOT, "pages");

const SAFE_PROJECT_SLUG = /^[a-z0-9-]+$/i;

const tryParseYaml = (content: string): unknown | null => {
  try {
    return YAML.parse(content);
  } catch {
    return null;
  }
};

const tryReadYamlFile = async (absolutePath: string): Promise<unknown | null> => {
  try {
    const content = await readFile(absolutePath, "utf8");
    return tryParseYaml(content);
  } catch {
    return null;
  }
};

export type SingletonKey = "home" | "projects" | "legal";

export async function readSingleton(key: SingletonKey): Promise<unknown | null> {
  return tryReadYamlFile(path.join(PAGES_DIR, `${key}.yaml`));
}

export async function listProjectSlugs(): Promise<string[]> {
  try {
    const entries = await readdir(PROJECTS_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".yaml"))
      .map((entry) => entry.name.slice(0, -".yaml".length))
      .filter((slug) => slug.length > 0)
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  } catch {
    return [];
  }
}

export async function readProject(slug: string): Promise<unknown | null> {
  if (!slug || !SAFE_PROJECT_SLUG.test(slug)) {
    return null;
  }

  return tryReadYamlFile(path.join(PROJECTS_DIR, `${slug}.yaml`));
}

export async function readAllProjects(): Promise<Array<{ slug: string; entry: unknown }>> {
  const slugs = await listProjectSlugs();
  const entries = await Promise.all(
    slugs.map(async (slug) => ({ slug, entry: await readProject(slug) })),
  );

  return entries
    .filter((record): record is { slug: string; entry: unknown } => record.entry !== null)
    .map((record) => ({ ...record }));
}

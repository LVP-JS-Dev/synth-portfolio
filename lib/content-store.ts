import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_ROOT, "projects");
const PAGES_DIR = path.join(CONTENT_ROOT, "pages");

const SAFE_PROJECT_SLUG = /^[a-z0-9-]+$/i;
const YAML_EXTENSION = ".yaml" as const;

type YamlContent = Record<string, unknown> | null;

const tryParseYaml = (content: string): YamlContent => {
  try {
    return YAML.parse(content) as YamlContent;
  } catch {
    return null;
  }
};

const tryReadYamlFile = async (absolutePath: string): Promise<YamlContent> => {
  try {
    const content = await readFile(absolutePath, "utf8");
    return tryParseYaml(content);
  } catch {
    return null;
  }
};

export type SingletonKey = "home" | "projects" | "legal";

export async function readSingleton(key: SingletonKey): Promise<YamlContent> {
  return tryReadYamlFile(path.join(PAGES_DIR, `${key}${YAML_EXTENSION}`));
}

export async function listProjectSlugs(): Promise<string[]> {
  try {
    const entries = await readdir(PROJECTS_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(YAML_EXTENSION))
      .map((entry) => entry.name.slice(0, -YAML_EXTENSION.length))
      .filter((slug) => slug.length > 0 && SAFE_PROJECT_SLUG.test(slug))
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  } catch {
    return [];
  }
}

export async function readProject(slug: string): Promise<YamlContent> {
  if (!slug || !SAFE_PROJECT_SLUG.test(slug)) {
    return null;
  }

  return tryReadYamlFile(path.join(PROJECTS_DIR, `${slug}${YAML_EXTENSION}`));
}

export type ProjectEntry = { slug: string; entry: YamlContent };

export async function readAllProjects(): Promise<ProjectEntry[]> {
  const slugs = await listProjectSlugs();
  const projects = await Promise.all(
    slugs.map(async (slug): Promise<ProjectEntry> => ({
      slug,
      entry: await readProject(slug),
    })),
  );

  return projects.filter((project): project is { slug: string; entry: Record<string, unknown> } =>
    project.entry !== null,
  );
}

import { createReader } from "@keystatic/core/reader";
import { cache } from "react";
import keystaticConfig from "@/keystatic.config";

export type Locale = "en" | "ru";

const reader = createReader(process.cwd(), keystaticConfig);

const HOME_FALLBACK = {
  titleEn: "Home",
  titleRu: "Главная",
  descriptionEn: "Portfolio homepage.",
  descriptionRu: "Главная страница портфолио.",
  introEn: "Building resilient web products with clear UX and measurable outcomes.",
  introRu: "Создаю устойчивые веб‑продукты с понятным UX и измеримым результатом.",
};

const PROJECTS_PAGE_FALLBACK = {
  titleEn: "Projects",
  titleRu: "Проекты",
  descriptionEn: "Case studies and implementation notes.",
  descriptionRu: "Кейсы и технические детали реализации.",
};

const LEGAL_FALLBACK = {
  titleEn: "Legal",
  titleRu: "Правовая информация",
  descriptionEn: "Terms and privacy overview.",
  descriptionRu: "Условия использования и политика конфиденциальности.",
  bodyEn: "Legal content is being prepared.",
  bodyRu: "Юридический контент готовится.",
};

export type ProjectRecord = {
  slug: string;
  titleEn: string;
  titleRu: string;
  summaryEn: string;
  summaryRu: string;
  year: number;
  stack: string[];
  featured: boolean;
};

type SingletonEntry<T> = Partial<T> | null | undefined;

const safeString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

const safeYear = (value: unknown): number =>
  typeof value === "number" && Number.isFinite(value) ? value : new Date().getFullYear();

const safeStack = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

const safeBoolean = (value: unknown, fallback = false): boolean =>
  typeof value === "boolean" ? value : fallback;

async function safeSingletonRead<T>(
  readFn: () => Promise<SingletonEntry<T>>,
  normalize: (entry: SingletonEntry<T>) => T
): Promise<T> {
  try {
    const entry = await readFn();
    return normalize(entry);
  } catch {
    return normalize(undefined);
  }
}

const normalizeHomeEntry = (entry: SingletonEntry<typeof HOME_FALLBACK>) => ({
  titleEn: safeString(entry?.titleEn, HOME_FALLBACK.titleEn),
  titleRu: safeString(entry?.titleRu, HOME_FALLBACK.titleRu),
  descriptionEn: safeString(entry?.descriptionEn, HOME_FALLBACK.descriptionEn),
  descriptionRu: safeString(entry?.descriptionRu, HOME_FALLBACK.descriptionRu),
  introEn: safeString(entry?.introEn, HOME_FALLBACK.introEn),
  introRu: safeString(entry?.introRu, HOME_FALLBACK.introRu),
});

const normalizeProjectsPageEntry = (entry: SingletonEntry<typeof PROJECTS_PAGE_FALLBACK>) => ({
  titleEn: safeString(entry?.titleEn, PROJECTS_PAGE_FALLBACK.titleEn),
  titleRu: safeString(entry?.titleRu, PROJECTS_PAGE_FALLBACK.titleRu),
  descriptionEn: safeString(entry?.descriptionEn, PROJECTS_PAGE_FALLBACK.descriptionEn),
  descriptionRu: safeString(entry?.descriptionRu, PROJECTS_PAGE_FALLBACK.descriptionRu),
});

const normalizeLegalEntry = (entry: SingletonEntry<typeof LEGAL_FALLBACK>) => ({
  titleEn: safeString(entry?.titleEn, LEGAL_FALLBACK.titleEn),
  titleRu: safeString(entry?.titleRu, LEGAL_FALLBACK.titleRu),
  descriptionEn: safeString(entry?.descriptionEn, LEGAL_FALLBACK.descriptionEn),
  descriptionRu: safeString(entry?.descriptionRu, LEGAL_FALLBACK.descriptionRu),
  bodyEn: safeString(entry?.bodyEn, LEGAL_FALLBACK.bodyEn),
  bodyRu: safeString(entry?.bodyRu, LEGAL_FALLBACK.bodyRu),
});

const normalizeProjectEntry = (entry: unknown, slugFallback: unknown): ProjectRecord => {
  const safeEntry = (entry ?? {}) as Record<string, unknown>;
  const fallbackSlug = safeString(slugFallback, "");
  return {
    slug: safeString(safeEntry.slug, fallbackSlug),
    titleEn: safeString(safeEntry.titleEn, ""),
    titleRu: safeString(safeEntry.titleRu, ""),
    summaryEn: safeString(safeEntry.summaryEn, ""),
    summaryRu: safeString(safeEntry.summaryRu, ""),
    year: safeYear(safeEntry.year),
    stack: safeStack(safeEntry.stack),
    featured: safeBoolean(safeEntry.featured, false),
  };
};

export async function getHomeContent(locale: Locale) {
  const entry = await readHomeEntry();

  return {
    title: locale === "ru" ? entry.titleRu : entry.titleEn,
    description: locale === "ru" ? entry.descriptionRu : entry.descriptionEn,
    intro: locale === "ru" ? entry.introRu : entry.introEn,
  };
}

export async function getProjectsPageContent(locale: Locale) {
  const entry = await readProjectsPageEntry();

  return {
    title: locale === "ru" ? entry.titleRu : entry.titleEn,
    description: locale === "ru" ? entry.descriptionRu : entry.descriptionEn,
  };
}

export async function getLegalContent(locale: Locale) {
  const entry = await readLegalEntry();

  return {
    title: locale === "ru" ? entry.titleRu : entry.titleEn,
    description: locale === "ru" ? entry.descriptionRu : entry.descriptionEn,
    body: locale === "ru" ? entry.bodyRu : entry.bodyEn,
  };
}

export async function getAllProjects() {
  const projects = await readAllProjects();
  return projects.map((project) => ({ ...project, stack: [...project.stack] }));
}

export async function getProjectSlugs(): Promise<string[]> {
  const slugs = await readProjectSlugs();
  return [...slugs];
}

export async function getProjectBySlug(slug: string) {
  return readProjectBySlug(slug);
}

const readHomeEntry = cache(async () =>
  safeSingletonRead(() => reader.singletons.home.read(), normalizeHomeEntry),
);

const readProjectsPageEntry = cache(async () =>
  safeSingletonRead(() => reader.singletons.projectsPage.read(), normalizeProjectsPageEntry),
);

const readLegalEntry = cache(async () =>
  safeSingletonRead(() => reader.singletons.legal.read(), normalizeLegalEntry),
);

const readAllProjects = cache(async () => {
  try {
    const projects = await reader.collections.projects.all();
    const safeProjects = Array.isArray(projects) ? projects : [];

    return safeProjects.map((project) =>
      normalizeProjectEntry(project?.entry as unknown, project?.slug ?? ""),
    );
  } catch {
    return [];
  }
});

const readProjectSlugs = cache(async (): Promise<string[]> => {
  try {
    return await reader.collections.projects.list();
  } catch {
    return [];
  }
});

const readProjectBySlug = cache(async (slug: string) => {
  try {
    const entry = await reader.collections.projects.read(slug);

    if (!entry) {
      return null;
    }

    return normalizeProjectEntry(entry as unknown, slug);
  } catch {
    return null;
  }
});

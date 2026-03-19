import { createReader } from "@keystatic/core/reader";
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

export async function getHomeContent(locale: Locale) {
  const entry = (await reader.singletons.home.read()) ?? HOME_FALLBACK;

  return {
    title: locale === "ru" ? entry.titleRu : entry.titleEn,
    description: locale === "ru" ? entry.descriptionRu : entry.descriptionEn,
    intro: locale === "ru" ? entry.introRu : entry.introEn,
  };
}

export async function getProjectsPageContent(locale: Locale) {
  const entry = (await reader.singletons.projectsPage.read()) ?? PROJECTS_PAGE_FALLBACK;

  return {
    title: locale === "ru" ? entry.titleRu : entry.titleEn,
    description: locale === "ru" ? entry.descriptionRu : entry.descriptionEn,
  };
}

export async function getLegalContent(locale: Locale) {
  const entry = (await reader.singletons.legal.read()) ?? LEGAL_FALLBACK;

  return {
    title: locale === "ru" ? entry.titleRu : entry.titleEn,
    description: locale === "ru" ? entry.descriptionRu : entry.descriptionEn,
    body: locale === "ru" ? entry.bodyRu : entry.bodyEn,
  };
}

export async function getAllProjects() {
  const projects = await reader.collections.projects.all();

  return projects.map((project): ProjectRecord => ({
    slug: project.slug,
    titleEn: project.entry.titleEn,
    titleRu: project.entry.titleRu,
    summaryEn: project.entry.summaryEn,
    summaryRu: project.entry.summaryRu,
    year: project.entry.year ?? new Date().getFullYear(),
    stack: [...project.entry.stack],
    featured: project.entry.featured,
  }));
}

export async function getProjectBySlug(slug: string) {
  const entry = await reader.collections.projects.read(slug);

  if (!entry) {
    return null;
  }

  return {
    slug,
    titleEn: entry.titleEn,
    titleRu: entry.titleRu,
    summaryEn: entry.summaryEn,
    summaryRu: entry.summaryRu,
    year: entry.year ?? new Date().getFullYear(),
    stack: [...entry.stack],
    featured: entry.featured,
  };
}

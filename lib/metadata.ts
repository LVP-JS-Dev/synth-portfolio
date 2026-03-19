import type { Metadata } from "next";

const FALLBACK_ORIGIN_EN = "https://example.com";
const FALLBACK_ORIGIN_RU = "https://example.ru";

export function buildMetadata(
  path: string,
  locale: "en" | "ru" = "en",
  overrides?: {
    title?: string;
    description?: string;
  }
): Metadata {
  const originEn = process.env.SITE_ORIGIN_EN ?? FALLBACK_ORIGIN_EN;
  const originRu = process.env.SITE_ORIGIN_RU ?? FALLBACK_ORIGIN_RU;

  const canonical = locale === "ru" ? `${originRu}${path}` : `${originEn}${path}`;

  return {
    ...(overrides?.title !== undefined && { title: overrides.title }),
    ...(overrides?.description !== undefined && { description: overrides.description }),
    alternates: {
      canonical,
      languages: {
        en: `${originEn}${path}`,
        // RU alternate omitted until locale routing is implemented.
        // Re-enable when RU routes are served: ru: `${originRu}${path}`,
        "x-default": `${originEn}${path}`,
      },
    },
  };
}

import type { Metadata } from "next";

const FALLBACK_ORIGIN_EN = "https://example.com";
const FALLBACK_ORIGIN_RU = "https://example.ru";

export function buildMetadata(
  path: string,
  locale: "en" | "ru" = "en"
): Metadata {
  const originEn = process.env.SITE_ORIGIN_EN ?? FALLBACK_ORIGIN_EN;
  const originRu = process.env.SITE_ORIGIN_RU ?? FALLBACK_ORIGIN_RU;

  const canonical = locale === "ru" ? `${originRu}${path}` : `${originEn}${path}`;

  return {
    alternates: {
      canonical,
      languages: {
        en: `${originEn}${path}`,
        ru: `${originRu}${path}`,
        "x-default": `${originEn}${path}`,
      },
    },
  };
}

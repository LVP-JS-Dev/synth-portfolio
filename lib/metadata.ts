import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/locale";
import { getOriginForLocale, getSiteOrigins } from "@/lib/i18n/origins";

export function buildMetadata(
  path: string,
  locale: Locale = "en",
  overrides?: {
    title?: string;
    description?: string;
  },
  request?: { host?: string | null; proto?: string | null }
): Metadata {
  const origins = getSiteOrigins({ requestHost: request?.host ?? null, requestProto: request?.proto ?? null });
  const canonical = `${getOriginForLocale(locale, origins)}${path}`;

  return {
    ...(overrides?.title !== undefined && { title: overrides.title }),
    ...(overrides?.description !== undefined && { description: overrides.description }),
    alternates: {
      canonical,
      languages: {
        en: `${origins.en}${path}`,
        ru: `${origins.ru}${path}`,
        "x-default": `${origins.en}${path}`,
      },
    },
  };
}

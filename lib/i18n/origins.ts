import type { Locale } from "@/lib/i18n/locale";

type SiteOrigins = { en: string; ru: string };

const FALLBACK_ORIGIN_EN = "https://example.com";
const FALLBACK_ORIGIN_RU = "https://example.ru";

function tryParseOrigin(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    return null;
  }
}

function normalizeProto(proto: string | null): "http" | "https" {
  if (!proto) return "https";
  const lower = proto.toLowerCase();
  return lower === "http" ? "http" : "https";
}

export function getSiteOrigins(input?: {
  requestHost?: string | null;
  requestProto?: string | null;
}): SiteOrigins {
  const envEn = tryParseOrigin(process.env.SITE_ORIGIN_EN);
  const envRu = tryParseOrigin(process.env.SITE_ORIGIN_RU);
  if (envEn && envRu) {
    return { en: envEn, ru: envRu };
  }

  const host = input?.requestHost ?? null;
  if (host) {
    const requestedProto = input?.requestProto ?? null;
    const proto =
      requestedProto === null && /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host)
        ? "http"
        : normalizeProto(requestedProto);
    const derived = `${proto}://${host}`;
    return {
      en: envEn ?? derived,
      ru: envRu ?? derived,
    };
  }

  return {
    en: envEn ?? FALLBACK_ORIGIN_EN,
    ru: envRu ?? FALLBACK_ORIGIN_RU,
  };
}

export function getOriginForLocale(locale: Locale, origins: SiteOrigins): string {
  return locale === "ru" ? origins.ru : origins.en;
}

export function getOriginHost(origin: string): string | null {
  try {
    return new URL(origin).hostname.toLowerCase();
  } catch {
    return null;
  }
}

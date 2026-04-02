import type { Locale } from "@/lib/i18n/locale";

export function buildCrossDomainUrl(input: {
  targetLocale: Locale;
  origins: { en: string; ru: string };
  pathname: string;
  search?: string | null;
  hash?: string | null;
}): string {
  const origin = input.targetLocale === "ru" ? input.origins.ru : input.origins.en;
  const safeOrigin = origin.replace(/\/+$/, "");
  const pathname = input.pathname.startsWith("/") ? input.pathname : `/${input.pathname}`;
  const search = input.search ? (input.search.startsWith("?") ? input.search : `?${input.search}`) : "";
  const hash = input.hash ? (input.hash.startsWith("#") ? input.hash : `#${input.hash}`) : "";
  return `${safeOrigin}${pathname}${search}${hash}`;
}


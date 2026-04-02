import type { Locale } from "@/lib/i18n/locale";
import { isLocale } from "@/lib/i18n/locale";

type ResolveLocaleInput = {
  host: string | null;
  forceLocale?: string | null;
  originRuHost?: string | null;
  originEnHost?: string | null;
};

function hostMatches(baseHost: string | null | undefined, candidateHost: string | null): boolean {
  if (!baseHost || !candidateHost) return false;
  if (candidateHost === baseHost) return true;
  return candidateHost.endsWith(`.${baseHost}`);
}

export function resolveLocale({
  host,
  forceLocale,
  originRuHost,
  originEnHost,
}: ResolveLocaleInput): Locale {
  if (isLocale(forceLocale)) {
    return forceLocale;
  }

  if (hostMatches(originRuHost, host)) return "ru";
  if (hostMatches(originEnHost, host)) return "en";

  return "en";
}

import "server-only";

import { getMessages } from "@/lib/i18n/messages";
import { isLocale } from "@/lib/i18n/locale";
import { getSiteOrigins } from "@/lib/i18n/origins";

function resolveForcedLocale(): "en" | "ru" {
  const forced = process.env.FORCE_LOCALE ?? null;
  if (isLocale(forced)) return forced;

  if (process.env.STATIC_EXPORT === "true") {
    throw new Error("STATIC_EXPORT=true requires FORCE_LOCALE to be set to 'en' or 'ru'");
  }

  return "en";
}

export function getI18nStaticContext() {
  const locale = resolveForcedLocale();
  const origins = getSiteOrigins();

  return {
    locale,
    messages: getMessages(locale),
    origins,
  };
}


import "server-only";

import { headers } from "next/headers";
import { parseHostname } from "@/lib/i18n/hostname";
import { getMessages } from "@/lib/i18n/messages";
import { getOriginHost, getSiteOrigins } from "@/lib/i18n/origins";
import { resolveLocale } from "@/lib/i18n/resolve-locale";
import type { Locale } from "@/lib/i18n/locale";

type HeadersLike = { get(name: string): string | null };

function getHeader(headersObj: HeadersLike, name: string): string | null {
  const value = headersObj.get(name);
  return value && value.trim() ? value : null;
}

function resolveI18nFromHeaders(headersObj: HeadersLike) {
  const rawHostHeader = getHeader(headersObj, "host");
  const rawHost = rawHostHeader ? rawHostHeader.trim().toLowerCase() : null;
  const host = parseHostname(rawHostHeader);
  const proto = getHeader(headersObj, "x-forwarded-proto");
  const origins = getSiteOrigins({ requestHost: rawHost, requestProto: proto });

  const locale = resolveLocale({
    host,
    forceLocale: process.env.FORCE_LOCALE ?? null,
    originRuHost: getOriginHost(origins.ru),
    originEnHost: getOriginHost(origins.en),
  });

  return {
    locale,
    origins,
    request: { host: rawHost, proto },
  };
}

export function getLocaleFromHeaders(headersObj: HeadersLike): Locale {
  return resolveI18nFromHeaders(headersObj).locale;
}

export async function getLocaleFromNextHeaders(): Promise<Locale> {
  return getLocaleFromHeaders(await headers());
}

export async function getI18nServerContext() {
  const resolved = resolveI18nFromHeaders(await headers());

  return {
    locale: resolved.locale,
    messages: getMessages(resolved.locale),
    origins: resolved.origins,
    request: resolved.request,
  };
}

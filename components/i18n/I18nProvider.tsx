"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n/locale";
import type { Messages } from "@/lib/i18n/messages";

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
  origins: { en: string; ru: string };
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  messages,
  origins,
  children,
}: I18nContextValue & { children: React.ReactNode }) {
  return (
    <I18nContext.Provider value={{ locale, messages, origins }}>{children}</I18nContext.Provider>
  );
}

function useI18nContext(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("I18nProvider is missing in the component tree");
  }
  return ctx;
}

export function useLocale() {
  return useI18nContext().locale;
}

export function useMessages() {
  return useI18nContext().messages;
}

export function useOrigins() {
  return useI18nContext().origins;
}


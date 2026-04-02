export type Locale = "en" | "ru";

export const LOCALES = ["en", "ru"] as const satisfies readonly Locale[];

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "ru";
}


import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import type { Locale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { I18nProvider } from "@/components/i18n/I18nProvider";

export function renderWithI18n(
  ui: ReactElement,
  options?: ({ locale?: Locale; origins?: { en: string; ru: string } } & Omit<RenderOptions, "wrapper">),
) {
  const { locale = "en", origins: originsOverride, ...renderOptions } = options ?? {};
  const origins = originsOverride ?? {
    en: "https://example.com",
    ru: "https://example.ru",
  };

  return render(
    <I18nProvider locale={locale} messages={getMessages(locale)} origins={origins}>
      {ui}
    </I18nProvider>,
    renderOptions,
  );
}

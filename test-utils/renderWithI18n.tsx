import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import type { Locale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { I18nProvider } from "@/components/i18n/I18nProvider";

export function renderWithI18n(
  ui: ReactElement,
  options?: { locale?: Locale; origins?: { en: string; ru: string } },
) {
  const locale = options?.locale ?? "en";
  const origins = options?.origins ?? {
    en: "https://example.com",
    ru: "https://example.ru",
  };

  return render(
    <I18nProvider locale={locale} messages={getMessages(locale)} origins={origins}>
      {ui}
    </I18nProvider>,
  );
}


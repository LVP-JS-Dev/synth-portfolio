import type { Metadata } from "next";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { TopNav } from "@/components/shared/TopNav";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { getI18nServerContext } from "@/lib/i18n/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synth Portfolio",
  description: "Baseline scaffold for PR-1",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const i18n = await getI18nServerContext();

  return (
    <html lang={i18n.locale}>
      <body style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)', margin: 0, padding: 0 }}>
        <I18nProvider locale={i18n.locale} messages={i18n.messages} origins={i18n.origins}>
          <TopNav />
          {children}
          <CookieBanner />
        </I18nProvider>
      </body>
    </html>
  );
}

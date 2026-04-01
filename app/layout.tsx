import type { Metadata } from "next";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { TopNav } from "@/components/shared/TopNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synth Portfolio",
  description: "Baseline scaffold for PR-1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)', margin: 0, padding: 0 }}>
        <TopNav />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}

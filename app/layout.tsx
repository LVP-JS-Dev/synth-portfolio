import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { TopNav } from "@/components/shared/TopNav";
import { NextTamaguiProvider } from "./NextTamaguiProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)', margin: 0, padding: 0 }}>
        <NextTamaguiProvider>
          <TopNav />
          {children}
          <CookieBanner />
        </NextTamaguiProvider>
      </body>
    </html>
  );
}

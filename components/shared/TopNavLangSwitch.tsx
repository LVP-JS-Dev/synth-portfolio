"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale, useMessages, useOrigins } from "@/components/i18n/I18nProvider";
import { buildCrossDomainUrl } from "@/lib/i18n/url";
import styles from "./TopNav.module.css";

export function TopNavLangSwitch() {
  const locale = useLocale();
  const messages = useMessages();
  const origins = useOrigins();
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash ?? "");
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const targetLocale = locale === "ru" ? "en" : "ru";
  const targetHref = useMemo(() => {
    const search = searchParams?.toString() ?? "";
    return buildCrossDomainUrl({
      targetLocale,
      origins,
      pathname,
      search: search ? `?${search}` : "",
      hash,
    });
  }, [hash, origins, pathname, searchParams, targetLocale]);

  return (
    <a className={styles.pillButton} aria-label={messages.nav.langSwitchAria} href={targetHref}>
      EN / RU
    </a>
  );
}


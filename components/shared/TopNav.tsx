"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu } from "lucide-react";
import { useLocale, useMessages, useOrigins } from "@/components/i18n/I18nProvider";
import { buildCrossDomainUrl } from "@/lib/i18n/url";
import styles from "./TopNav.module.css";

export function TopNav() {
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
    <nav aria-label={messages.nav.mainAria} className={styles.nav}>
      <div className={styles.inner}>
        <p className={[styles.brand, styles.brandDesktop].join(" ")}>
          {messages.nav.brandDesktop}
        </p>
        <p className={[styles.brand, styles.brandMobile].join(" ")}>{messages.nav.brandMobile}</p>

        <div className={styles.right}>
          <div className={styles.links}>
            <Link href="/#about" className={styles.navLink}>
              {messages.nav.about}
            </Link>
            <Link href="/#experience" className={styles.navLink}>
              {messages.nav.experience}
            </Link>
            <Link href="/projects" className={styles.navLink}>
              {messages.nav.projects}
            </Link>
            <Link href="/#quality" className={styles.navLink}>
              {messages.nav.quality}
            </Link>
            <Link href="/#contact" className={styles.navLink}>
              {messages.nav.contact}
            </Link>
          </div>

          <button
            type="button"
            className={[styles.pillButton, styles.menuButton].join(" ")}
            aria-label={messages.nav.openMenuAria}
          >
            <Menu size={16} color="#FFF9FF" />
            {messages.nav.menu}
          </button>

          <a className={styles.pillButton} aria-label={messages.nav.langSwitchAria} href={targetHref}>
            EN / RU
          </a>
        </div>
      </div>
    </nav>
  );
}

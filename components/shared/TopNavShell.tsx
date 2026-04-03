"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useMessages } from "@/components/i18n/I18nProvider";
import styles from "./TopNav.module.css";

export function TopNavShell(props: { langSwitch: React.ReactNode }) {
  const messages = useMessages();

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

          {props.langSwitch}
        </div>
      </div>
    </nav>
  );
}

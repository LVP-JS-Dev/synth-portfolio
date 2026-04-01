"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import styles from "./TopNav.module.css";

export function TopNav() {
  return (
    <nav aria-label="Main navigation" className={styles.nav}>
      <div className={styles.inner}>
        <p className={[styles.brand, styles.brandDesktop].join(" ")}>
          LEONID PETROV / SENIOR FRONTEND ENGINEER
        </p>
        <p className={[styles.brand, styles.brandMobile].join(" ")}>LEONID / FE</p>

        <div className={styles.right}>
          <div className={styles.links}>
            <Link href="/#about" className={styles.navLink}>
              About
            </Link>
            <Link href="/#experience" className={styles.navLink}>
              Experience
            </Link>
            <Link href="/projects" className={styles.navLink}>
              Projects
            </Link>
            <Link href="/#quality" className={styles.navLink}>
              Quality
            </Link>
            <Link href="/#contact" className={styles.navLink}>
              Contact
            </Link>
          </div>

          <button
            type="button"
            className={[styles.pillButton, styles.menuButton].join(" ")}
            aria-label="Open navigation menu"
          >
            <Menu size={16} color="#FFF9FF" />
            MENU
          </button>

          <button
            type="button"
            className={styles.pillButton}
            aria-label="Switch language (coming soon)"
            disabled
            title="Coming soon"
          >
            EN / RU
          </button>
        </div>
      </div>
    </nav>
  );
}

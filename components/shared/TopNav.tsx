"use client";

import { Suspense } from "react";
import { TopNavShell } from "@/components/shared/TopNavShell";
import { TopNavLangSwitch } from "@/components/shared/TopNavLangSwitch";
import styles from "./TopNav.module.css";

export function TopNav() {
  return (
    <TopNavShell
      langSwitch={
        <Suspense fallback={<span className={styles.pillButton} aria-hidden="true">EN / RU</span>}>
          <TopNavLangSwitch />
        </Suspense>
      }
    />
  );
}

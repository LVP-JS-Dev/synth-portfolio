"use client";

import React from "react";
import { useMessages } from "@/components/i18n/I18nProvider";
import { ButtonPrimary } from "../primitives/ButtonPrimary";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const messages = useMessages();

  return (
    <section className={styles.card}>
      <div className={styles.left}>
        <p className={styles.kicker}>{messages.hero.kicker}</p>

        <h1 className={styles.title}>
          {messages.hero.titleLine1}
          <br />
          {messages.hero.titleLine2}
        </h1>

        <p className={styles.subtitle}>{messages.hero.subtitle}</p>

        <div className={styles.ctaRow}>
          <ButtonPrimary preset="soft">{messages.hero.cta.viewProjects}</ButtonPrimary>
          <ButtonPrimary preset="medium">{messages.hero.cta.quality}</ButtonPrimary>
          <ButtonPrimary preset="hard">{messages.hero.cta.contact}</ButtonPrimary>
        </div>
      </div>

      <aside className={styles.right} aria-label={messages.hero.focusAria}>
        <p className={styles.rightTitle}>{messages.hero.focusTitle}</p>
        <ul className={styles.focusList}>
          <li className={styles.focusItem}>{messages.hero.focus.item1}</li>
          <li className={styles.focusItem}>{messages.hero.focus.item2}</li>
          <li className={styles.focusItem}>{messages.hero.focus.item3}</li>
        </ul>
      </aside>
    </section>
  );
}

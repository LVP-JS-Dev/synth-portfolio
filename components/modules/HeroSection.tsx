"use client";

import React from "react";
import { ButtonPrimary } from "../primitives/ButtonPrimary";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className={styles.card}>
      <div className={styles.left}>
        <p className={styles.kicker}>01. FRONTEND ARCHITECTURE &amp; DELIVERY</p>

        <h1 className={styles.title}>
          Senior Frontend Engineer
          {"\n"}
          for fintech &amp; B2B product teams
        </h1>

        <p className={styles.subtitle}>
          I build React and Next.js platforms that scale: architecture, performance, accessibility, and
          design systems backed by measurable outcomes.
        </p>

        <div className={styles.ctaRow}>
          <ButtonPrimary preset="soft">View Projects</ButtonPrimary>
          <ButtonPrimary preset="medium">Engineering Quality</ButtonPrimary>
          <ButtonPrimary preset="hard">Contact</ButtonPrimary>
        </div>
      </div>

      <aside className={styles.right} aria-label="Current focus">
        <p className={styles.rightTitle}>Current Focus</p>
        <ul className={styles.focusList}>
          <li className={styles.focusItem}>Product architecture — shared UI platform, DX guardrails</li>
          <li className={styles.focusItem}>Performance &amp; A11y — Core Web Vitals and inclusive UX</li>
          <li className={styles.focusItem}>Verification UX — KYC/liveness flows with high success rates</li>
        </ul>
      </aside>
    </section>
  );
}

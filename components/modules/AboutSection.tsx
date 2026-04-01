"use client";

import styles from "./AboutSection.module.css";

const ABOUT_PARAGRAPHS = [
  "I specialize in React, TypeScript, and Next.js architectures for high‑stakes products where UX stability and performance are non‑negotiable.",
  "In fintech and B2B teams, I ship end‑to‑end flows (WebView, KYC, admin tools), build UI platforms, and turn requirements into reusable system patterns.",
  "I mentor engineers, lead architecture reviews, and keep delivery predictable through testing strategy and performance budgets.",
] as const;

const FOCUS_AREAS = [
  "Architecture & DX",
  "Performance & Accessibility",
  "Design Systems",
  "Mentoring & Technical Leadership",
] as const;

export function AboutSection() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.header}>
        <p className={styles.kicker}>02. ABOUT / WHO I AM</p>
        <h2 className={styles.title}>I build durable frontend platforms</h2>
        <p className={styles.subtitle}>
          5+ years building web products with measurable outcomes: faster builds, lower latency, and higher
          verification success.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.copy}>
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <aside className={styles.focusCard} aria-label="Areas of focus">
          <p className={styles.focusTitle}>Areas of Focus</p>
          {FOCUS_AREAS.map((area) => (
            <p key={area} className={styles.focusItem}>
              {area}
            </p>
          ))}
        </aside>
      </div>
    </section>
  );
}

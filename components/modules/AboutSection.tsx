"use client";

import { useMessages } from "@/components/i18n/I18nProvider";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  const messages = useMessages();
  const paragraphs = [messages.about.p1, messages.about.p2, messages.about.p3] as const;
  const focusAreas = [
    messages.about.focus.a1,
    messages.about.focus.a2,
    messages.about.focus.a3,
    messages.about.focus.a4,
  ] as const;

  return (
    <section className={styles.section} id="about">
      <div className={styles.header}>
        <p className={styles.kicker}>{messages.about.kicker}</p>
        <h2 className={styles.title}>{messages.about.title}</h2>
        <p className={styles.subtitle}>{messages.about.subtitle}</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.copy}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <aside className={styles.focusCard} aria-label={messages.about.focusAria}>
          <h3 className={styles.focusTitle}>{messages.about.focusTitle}</h3>
          <ul className={styles.focusList}>
            {focusAreas.map((area) => (
              <li key={area} className={styles.focusItem}>
                {area}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

"use client";

import styles from "./LegalSections.module.css";

interface LegalSectionsProps {
  title: string;
  description: string;
  body?: string;
}

const LEGAL_BLOCKS = [
  {
    title: "Privacy Policy",
    description:
      "Describes what personal data is collected, lawful basis, retention period, third-party processors, and user rights under applicable law.",
  },
  {
    title: "Personal Data Processing Consent",
    description:
      "Standalone consent text for submitting contact details, with explicit acceptance, processing purpose, and withdrawal instructions.",
  },
  {
    title: "Cookie Policy",
    description:
      "Explains cookie categories, analytics usage, consent options, and controls for opting out.",
  },
] as const;

export function LegalSections({ title, description, body }: LegalSectionsProps) {
  return (
    <section className={styles.root}>
      <header className={styles.hero}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </header>

      {LEGAL_BLOCKS.map((block) => (
        <section key={block.title} className={styles.block} aria-label={block.title}>
          <h2 className={styles.blockTitle}>{block.title}</h2>
          <p className={styles.blockDescription}>{block.description}</p>
        </section>
      ))}

      {body ? (
        <section className={styles.body} aria-label="Legal notice">
          <p className={styles.bodyText}>{body}</p>
        </section>
      ) : null}

      <p className={styles.note}>
        Recommended implementation: visible cookie banner + checkbox consent in contact form.
      </p>
    </section>
  );
}

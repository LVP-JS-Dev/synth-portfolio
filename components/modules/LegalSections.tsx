"use client";

import styles from "./LegalSections.module.css";
import { useMessages } from "@/components/i18n/I18nProvider";

interface LegalSectionsProps {
  title: string;
  description: string;
  body?: string;
}

export function LegalSections({ title, description, body }: LegalSectionsProps) {
  const messages = useMessages();
  const blocks = [
    {
      title: messages.legal.block.privacy.title,
      description: messages.legal.block.privacy.desc,
    },
    {
      title: messages.legal.block.consent.title,
      description: messages.legal.block.consent.desc,
    },
    {
      title: messages.legal.block.cookies.title,
      description: messages.legal.block.cookies.desc,
    },
  ] as const;

  return (
    <section className={styles.root}>
      <header className={styles.hero}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </header>

      {blocks.map((block) => (
        <section key={block.title} className={styles.block} aria-label={block.title}>
          <h2 className={styles.blockTitle}>{block.title}</h2>
          <p className={styles.blockDescription}>{block.description}</p>
        </section>
      ))}

      {body ? (
        <section className={styles.body} aria-label={messages.legal.noticeAria}>
          <p className={styles.bodyText}>{body}</p>
        </section>
      ) : null}

      <p className={styles.note}>
        {messages.legal.note}
      </p>
    </section>
  );
}

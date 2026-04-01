"use client";

import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  kicker: string;
  title: string;
  subtitle: string;
  titleAs?: "h2" | "h3" | "h4";
};

export function SectionHeader({ kicker, title, subtitle, titleAs }: SectionHeaderProps) {
  const TitleTag = titleAs ?? "h3";

  return (
    <header className={styles.root}>
      <p className={styles.kicker}>{kicker}</p>
      <TitleTag className={styles.title}>{title}</TitleTag>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  );
}

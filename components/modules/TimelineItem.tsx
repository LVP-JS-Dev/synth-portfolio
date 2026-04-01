"use client";

import styles from "./TimelineItem.module.css";

export interface TimelineItemProps {
  role: string;
  period: string;
  achievement: string;
  highlight?: boolean;
}

export function TimelineItem({ role, period, achievement, highlight = false }: TimelineItemProps) {
  const rootClassName = [styles.root, highlight ? styles.highlight : null].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      <div className={styles.dotCol}>
        <div
          className={styles.dot}
          style={{ boxShadow: `0 0 ${highlight ? 12 : 8}px rgba(82, 255, 246, 0.75)` }}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.role}>{role}</p>
        <p className={styles.period}>{period}</p>
        <p className={styles.achievement}>{achievement}</p>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import styles from "./ProjectCard.module.css";

export interface ProjectCardProps {
  title: string;
  description: string;
  gradientColors?: [string, string, string];
  gradientRotation?: number;
  ctaLabel?: string;
}

const DEFAULT_GRADIENT: [string, string, string] = [
  "var(--bg-surface-2)",
  "var(--accent-cyan)",
  "var(--accent-pink)",
];

export function ProjectCard({
  title,
  description,
  gradientColors = DEFAULT_GRADIENT,
  gradientRotation = 140,
  ctaLabel,
}: ProjectCardProps) {
  const gradient = `linear-gradient(${gradientRotation}deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 55%, ${gradientColors[2]} 100%)`;

  return (
    <motion.div
      whileHover={{
        y: -2,
        boxShadow: "0 0 18px rgba(82, 255, 246, 0.75)",
        transition: { type: "spring", stiffness: 420, damping: 20 },
      }}
      whileTap={{ scale: 0.995, transition: { duration: 0.12, ease: "easeOut" } }}
      style={{ width: "100%" }}
    >
      <div className={styles.card}>
        <div className={styles.preview} style={{ backgroundImage: gradient }} />
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        {ctaLabel ? (
          <div className={styles.ctaRow}>
            <p className={styles.ctaText}>{ctaLabel}</p>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

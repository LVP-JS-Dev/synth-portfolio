"use client";

import type { LucideIcon } from "lucide-react";
import { Activity, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./MetricCard.module.css";

export type MetricIconName = "activity" | "zap" | "shield-check";

export interface MetricCardProps {
  icon?: LucideIcon;
  iconName?: MetricIconName;
  value: string;
  label: string;
  iconColor?: string;
  valueColor?: string;
}

const ICONS: Record<MetricIconName, LucideIcon> = {
  activity: Activity,
  zap: Zap,
  "shield-check": ShieldCheck,
};

export function MetricCard({
  icon,
  iconName = "activity",
  value,
  label,
  iconColor = "var(--accent-pink)",
  valueColor = "var(--accent-pink)",
}: MetricCardProps) {
  const Icon = icon ?? ICONS[iconName];

  return (
    <motion.div
      whileHover={{
        boxShadow: "0 0 16px rgba(82, 255, 246, 0.66)",
        transition: { type: "spring", stiffness: 420, damping: 20 },
      }}
      style={{ width: "100%" }}
    >
      <div className={styles.card}>
        <div className={styles.top}>
          <Icon size={20} color={iconColor} />
          <p className={styles.value} style={{ color: valueColor }}>
            {value}
          </p>
        </div>
        <p className={styles.label}>{label}</p>
      </div>
    </motion.div>
  );
}

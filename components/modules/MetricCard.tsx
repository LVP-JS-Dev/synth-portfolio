"use client";

import type { LucideIcon } from "lucide-react";
import { Activity, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Text, XStack, YStack } from "tamagui";

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
  iconColor = "var(--color-accentPink)",
  valueColor = "var(--color-accentPink)",
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
        <YStack
          backgroundColor="$bgSurface2"
          borderRadius={12}
          borderWidth={1}
          borderColor="$bgSurface"
          gap={8}
          padding={16}
          style={{ boxShadow: "0 0 10px var(--color-glowSoft)" }}
        >
        <XStack gap={8} alignItems="center">
          <Icon size={20} color={iconColor} />
          <Text
            color={valueColor}
            fontFamily="$heading"
            fontSize={30}
            fontWeight="700"
            style={{ textShadow: "0 0 10px rgba(82, 255, 246, 0.66)" }}
          >
            {value}
          </Text>
        </XStack>

        <Text color="$textSecondary" fontFamily="$body" fontSize={14}>
          {label}
        </Text>
      </YStack>
    </motion.div>
  );
}

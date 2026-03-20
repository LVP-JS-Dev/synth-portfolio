"use client";

import { motion } from "framer-motion";
import { Text, XStack, YStack } from "tamagui";

export interface ProjectCardProps {
  title: string;
  description: string;
  gradientColors?: [string, string, string];
  gradientRotation?: number;
  ctaLabel?: string;
  onPress?: () => void;
}

const DEFAULT_GRADIENT: [string, string, string] = ["#2C2550", "#4A3E88", "#FF7EDB"];

export function ProjectCard({
  title,
  description,
  gradientColors = DEFAULT_GRADIENT,
  gradientRotation = 140,
  ctaLabel,
  onPress,
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
      <YStack
        backgroundColor="$bgSurface2"
        borderRadius={12}
        borderWidth={1}
        borderColor="#433C69"
        gap={12}
        padding={16}
        cursor={onPress ? "pointer" : undefined}
        onPress={onPress}
        style={{ boxShadow: "0 0 14px rgba(82, 255, 246, 0.35)" }}
      >
        <YStack
          height={170}
          width="100%"
          borderRadius={8}
          style={{ backgroundImage: gradient }}
        />

        <Text
          color="$textPrimary"
          fontFamily="$heading"
          fontSize={20}
          fontWeight="700"
          style={{ textShadow: "0 0 14px rgba(255, 79, 216, 0.66)" }}
        >
          {title}
        </Text>

        <Text color="$textSecondary" fontFamily="$body" fontSize={14} lineHeight={22}>
          {description}
        </Text>

        {ctaLabel ? (
          <XStack marginTop={2}>
            <Text color="$accentCyan" fontFamily="$heading" fontSize={12} fontWeight="700">
              {ctaLabel}
            </Text>
          </XStack>
        ) : null}
      </YStack>
    </motion.div>
  );
}

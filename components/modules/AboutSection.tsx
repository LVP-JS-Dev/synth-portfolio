"use client";

import { Text, XStack, YStack } from "tamagui";

const ABOUT_PARAGRAPHS = [
  "I specialize in React, TypeScript, and Next.js architectures for products that cannot afford unstable UX or regressions.",
  "Across B2B SaaS, ecommerce, and internal platforms, I align product decisions with technical constraints, then codify those decisions into reusable system patterns.",
  "I mentor engineers, run architecture reviews, and keep teams shipping with confidence through strong DX and testing strategy.",
] as const;

const FOCUS_AREAS = [
  "Architecture & DX",
  "Performance & Accessibility",
  "Design Systems",
  "Mentoring & Technical Leadership",
] as const;

export function AboutSection() {
  return (
    <YStack gap={16}>
      <YStack gap={8}>
        <Text color="$accentCyan" fontFamily="$heading" fontSize={12} fontWeight="700" letterSpacing={1}>
          02. ABOUT / WHO I AM
        </Text>
        <Text color="$textPrimary" fontFamily="$heading" fontSize={36} fontWeight="700" $sm={{ fontSize: 24 }}>
          I build durable frontend platforms
        </Text>
        <Text color="$textSecondary" fontFamily="$body" fontSize={16} lineHeight={26} $sm={{ fontSize: 14 }}>
          My focus is shipping measurable product outcomes while improving engineering leverage across teams.
        </Text>
      </YStack>

      <XStack gap={24} flexWrap="wrap" $sm={{ flexDirection: "column", gap: 16 }}>
        <YStack flex={1} minWidth={300} gap={12}>
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <Text key={paragraph} color="$textSecondary" fontFamily="$body" fontSize={17} lineHeight={27} $sm={{ fontSize: 15 }}>
              {paragraph}
            </Text>
          ))}
        </YStack>

        <YStack
          width={420}
          $sm={{ width: "100%" }}
          backgroundColor="$bgSurface2"
          borderRadius={12}
          borderWidth={1}
          borderColor="#4A3E88"
          padding={18}
          gap={10}
        >
          <Text color="$textPrimary" fontFamily="$heading" fontSize={16} fontWeight="700">
            Areas of Focus
          </Text>
          {FOCUS_AREAS.map((area) => (
            <Text key={area} color="$accentCyan" fontFamily="$heading" fontSize={14}>
              {area}
            </Text>
          ))}
        </YStack>
      </XStack>
    </YStack>
  );
}

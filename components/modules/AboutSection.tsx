"use client";

import { Text, XStack, YStack } from "tamagui";

const ABOUT_PARAGRAPHS = [
  "I specialize in React, TypeScript, and Next.js architectures for high‑stakes products where UX stability and performance are non‑negotiable.",
  "In fintech and B2B teams, I ship end‑to‑end flows (WebView, KYC, admin tools), build UI platforms, and turn requirements into reusable system patterns.",
  "I mentor engineers, lead architecture reviews, and keep delivery predictable through testing strategy and performance budgets.",
] as const;

const FOCUS_AREAS = [
  "Architecture & DX",
  "Performance & Accessibility",
  "Design Systems",
  "Mentoring & Technical Leadership",
] as const;

export function AboutSection() {
  return (
    <YStack gap={16} id="about">
      <YStack gap={8}>
        <Text color="$accentCyan" fontFamily="$heading" fontSize={12} fontWeight="700" letterSpacing={1}>
          02. ABOUT / WHO I AM
        </Text>
        <Text color="$textPrimary" fontFamily="$heading" fontSize={36} fontWeight="700" $sm={{ fontSize: 24 }}>
          I build durable frontend platforms
        </Text>
        <Text color="$textSecondary" fontFamily="$body" fontSize={16} lineHeight={26} $sm={{ fontSize: 14 }}>
          5+ years building web products with measurable outcomes: faster builds, lower latency, and higher verification success.
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

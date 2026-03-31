"use client";

import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { ButtonPrimary } from '../primitives/ButtonPrimary';

export function HeroSection() {
  return (
    <XStack
      backgroundColor="$bgSurface"
      borderRadius={16}
      borderColor="#3C3562"
      borderWidth={1}
      padding={32}
      gap={32}
      flexWrap="wrap"
      flexDirection="row"
      $sm={{ flexDirection: 'column', padding: 24, gap: 24 }}
    >
      {/* Left Column */}
      <YStack flex={1} minWidth={300} gap={14}>
        <Text
          color="$accentCyan"
          fontFamily="$heading"
          fontSize={12}
          fontWeight="700"
          letterSpacing={1}
        >
          01. FRONTEND ARCHITECTURE & DELIVERY
        </Text>

        <Text
          color="$textPrimary"
          textShadowColor="rgba(91, 77, 255, 0.3)"
          textShadowRadius={14}
          fontFamily="$heading"
          fontSize={58}
          lineHeight={64}
          $sm={{ fontSize: 34, lineHeight: 40 }}
          fontWeight="700"
          asChild
        >
          <h1 style={{ margin: 0 }}>
            Senior Frontend Engineer{"\n"}for fintech & B2B product teams
          </h1>
        </Text>

        <Text
          color="$textSecondary"
          fontFamily="$body"
          fontSize={18}
          $sm={{ fontSize: 15 }}
          lineHeight={28}
        >
          I build React and Next.js platforms that scale: architecture, performance, accessibility, and design systems backed by measurable outcomes.
        </Text>

        <XStack flexWrap="wrap" gap={10} marginTop={10}>
          <ButtonPrimary preset="soft">View Projects</ButtonPrimary>
          <ButtonPrimary preset="medium">Engineering Quality</ButtonPrimary>
          <ButtonPrimary preset="hard">Contact</ButtonPrimary>
        </XStack>
      </YStack>

      {/* Right Column: Current Focus */}
      <YStack
        width={420}
        $sm={{ width: '100%' }}
        backgroundColor="$bgSurface2"
        borderRadius={12}
        borderColor="#4A3E88"
        borderWidth={1}
        padding={16}
        gap={12}
      >
        <Text color="$textPrimary" fontFamily="$heading" fontSize={16} fontWeight="700">
          Current Focus
        </Text>
        <YStack gap={8}>
          <Text color="$textSecondary" fontFamily="$body" fontSize={14} lineHeight={21}>
            Product architecture — shared UI platform, DX guardrails
          </Text>
          <Text color="$textSecondary" fontFamily="$body" fontSize={14} lineHeight={21}>
            Performance & A11y — Core Web Vitals and inclusive UX
          </Text>
          <Text color="$textSecondary" fontFamily="$body" fontSize={14} lineHeight={21}>
            Verification UX — KYC/liveness flows with high success rates
          </Text>
        </YStack>
      </YStack>
    </XStack>
  );
}

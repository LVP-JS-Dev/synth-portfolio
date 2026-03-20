"use client";

import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { ButtonPrimary } from '../primitives/ButtonPrimary';

export function HeroSection() {
  return (
    <XStack
      backgroundColor="$bgSurface"
      borderRadius={16}
      borderColor="$bgSurface2"
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
          01. BUILDING FRONTEND SYSTEMS THAT SCALE
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
        >
          Senior Frontend Engineer{'\n'}for high-stakes product teams
        </Text>

        <Text
          color="$textSecondary"
          fontFamily="$body"
          fontSize={18}
          $sm={{ fontSize: 15 }}
          lineHeight={28}
        >
          I design resilient React and Next.js architectures, tune performance, enforce accessibility, and raise team DX through design systems, testing, and delivery discipline.
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
        borderColor="$accentCyan"
        borderWidth={1}
        padding={16}
        gap={12}
      >
        <Text color="$textPrimary" fontFamily="$heading" fontSize={16} fontWeight="700">
          Current Focus
        </Text>
        <YStack gap={8}>
          <Text color="$textSecondary" fontFamily="$body" fontSize={14} lineHeight={21}>
            Architecture & DX — shared UI platform and guardrails
          </Text>
          <Text color="$textSecondary" fontFamily="$body" fontSize={14} lineHeight={21}>
            Performance & A11y — measurable Core Web Vitals and inclusive UX
          </Text>
          <Text color="$textSecondary" fontFamily="$body" fontSize={14} lineHeight={21}>
            Mentoring — review culture, onboarding and engineering standards
          </Text>
        </YStack>
      </YStack>
    </XStack>
  );
}

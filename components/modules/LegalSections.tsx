"use client";

import { Text, YStack } from "tamagui";

interface LegalSectionsProps {
  title: string;
  description: string;
  body?: string;
}

const LEGAL_BLOCKS = [
  {
    title: "Privacy Policy",
    description:
      "Describes what personal data is collected, lawful basis, retention period, third-party processors, and user rights under applicable law.",
  },
  {
    title: "Personal Data Processing Consent",
    description:
      "Standalone consent text for submitting contact details, with explicit acceptance, processing purpose, and withdrawal instructions.",
  },
  {
    title: "Cookie Policy",
    description:
      "Explains cookie categories, analytics usage, consent options, and controls for opting out.",
  },
] as const;

export function LegalSections({ title, description, body }: LegalSectionsProps) {
  return (
    <YStack gap={12}>
      <YStack
        backgroundColor="$bgSurface"
        borderRadius={14}
        borderWidth={1}
        borderColor="$bgSurface2"
        padding={16}
        gap={8}
      >
        <Text
          color="$textPrimary"
          fontFamily="$heading"
          fontSize={42}
          fontWeight="700"
          $sm={{ fontSize: 28 }}
          asChild
        >
          <h1 style={{ margin: 0 }}>{title}</h1>
        </Text>
        <Text color="$textSecondary" fontFamily="$body" fontSize={18} lineHeight={28} $sm={{ fontSize: 14 }}>
          {description}
        </Text>
      </YStack>

      {LEGAL_BLOCKS.map((block) => (
        <YStack
          key={block.title}
          backgroundColor="$bgSurface2"
          borderRadius={12}
          borderWidth={1}
          borderColor="$accentCyan"
          padding={16}
          gap={8}
        >
          <Text color="$textPrimary" fontFamily="$heading" fontSize={20} fontWeight="700">
            {block.title}
          </Text>
          <Text color="$textSecondary" fontFamily="$body" fontSize={15} lineHeight={24}>
            {block.description}
          </Text>
        </YStack>
      ))}

      {body ? (
        <YStack
          backgroundColor="#20183A"
          borderRadius={10}
          borderWidth={1}
          borderColor="#3C3562"
          padding={14}
        >
          <Text color="$textSecondary" fontFamily="$body" fontSize={13} lineHeight={20}>
            {body}
          </Text>
        </YStack>
      ) : null}

      <Text color="$accentCyan" fontFamily="$heading" fontSize={12}>
        Recommended implementation: visible cookie banner + checkbox consent in contact form.
      </Text>
    </YStack>
  );
}

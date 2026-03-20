"use client";

import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { Mail, User } from "lucide-react";
import { Text, XStack, YStack } from "tamagui";

function InputPlaceholder({
  label,
  placeholder,
  icon,
}: {
  label: string;
  placeholder: string;
  icon: "user" | "mail";
}) {
  const Icon = icon === "user" ? User : Mail;

  return (
    <YStack gap={6}>
      <Text color="$textSecondary" fontFamily="$heading" fontSize={12} fontWeight="500">
        {label}
      </Text>
      <XStack
        height={48}
        backgroundColor="#18122D"
        borderRadius={10}
        borderWidth={1}
        borderColor="#4A3E88"
        alignItems="center"
        gap={8}
        paddingHorizontal={12}
        style={{ boxShadow: "0 0 12px rgba(82, 255, 246, 0.35)" }}
      >
        <Icon size={14} color="#D7CCFF" />
        <Text color="$textSecondary" fontFamily="$body" fontSize={14}>
          {placeholder}
        </Text>
      </XStack>
    </YStack>
  );
}

export function ContactSection() {
  return (
    <YStack gap={16}>
      <YStack gap={8}>
        <Text color="$accentCyan" fontFamily="$heading" fontSize={12} fontWeight="700" letterSpacing={1}>
          07. CONTACT / CTA
        </Text>
        <Text color="$textPrimary" fontFamily="$heading" fontSize={36} fontWeight="700" $sm={{ fontSize: 24 }}>
          Let&apos;s work together
        </Text>
        <Text color="$textSecondary" fontFamily="$body" fontSize={16} lineHeight={26} $sm={{ fontSize: 14 }}>
          Tell me what you are building and where frontend quality can unlock business impact.
        </Text>
      </YStack>

      <XStack gap={24} flexWrap="wrap" $sm={{ flexDirection: "column", gap: 16 }}>
        <YStack
          flex={1}
          minWidth={300}
          backgroundColor="$bgSurface2"
          borderRadius={12}
          borderWidth={1}
          borderColor="#4A3E88"
          padding={20}
          gap={12}
        >
          <Text color="$textSecondary" fontFamily="$body" fontSize={18} lineHeight={28}>
            Open for senior frontend roles, architecture consulting, and technical audits.
          </Text>

          {[
            "Email: hello@leonid.dev",
            "Telegram: @leonid_frontend",
            "GitHub: github.com/leonidpetrov",
            "LinkedIn: linkedin.com/in/leonidpetrov",
          ].map((line) => (
            <Text
              key={line}
              color="$accentCyan"
              fontFamily="$heading"
              fontSize={13}
              style={{ textShadow: "0 0 8px rgba(82, 255, 246, 0.53)" }}
            >
              {line}
            </Text>
          ))}

          <XStack marginTop={4}>
            <ButtonPrimary preset="soft">Download CV</ButtonPrimary>
          </XStack>
        </YStack>

        <YStack
          width={520}
          $sm={{ width: "100%" }}
          backgroundColor="$bgSurface2"
          borderRadius={12}
          borderWidth={1}
          borderColor="#433C69"
          padding={16}
          gap={12}
        >
          <Text color="$textPrimary" fontFamily="$heading" fontSize={20} fontWeight="700">
            Send a Message
          </Text>

          <InputPlaceholder label="Your Name" placeholder="Your name" icon="user" />
          <InputPlaceholder label="Your Email" placeholder="name@company.com" icon="mail" />

          <YStack marginTop={4} width="100%">
            <ButtonPrimary preset="medium" style={{ width: "100%" }}>
              Send Message
            </ButtonPrimary>
          </YStack>
        </YStack>
      </XStack>
    </YStack>
  );
}

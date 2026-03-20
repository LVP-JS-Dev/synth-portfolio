"use client";

import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { Mail, User } from "lucide-react";
import { FormEvent } from "react";
import { Input, Text, XStack, YStack } from "tamagui";

function ContactField({
  label,
  name,
  placeholder,
  type = "text",
  icon,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
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
        backgroundColor="$bgBase"
        borderRadius={10}
        borderWidth={1}
        borderColor="$accentCyan"
        alignItems="center"
        gap={8}
        paddingHorizontal={12}
        style={{ boxShadow: "0 0 12px var(--color-glowSoft)" }}
      >
        <Icon size={14} color="var(--color-textSecondary)" />
        <Input
          name={name}
          type={type}
          required
          placeholder={placeholder}
          color="$textSecondary"
          fontFamily="$body"
          fontSize={14}
          borderWidth={0}
          backgroundColor="transparent"
          flexGrow={1}
          focusStyle={{ borderColor: "$accentCyan" }}
        />
      </XStack>
    </YStack>
  );
}

const CONTACT_LINKS = [
  {
    label: "Email",
    href: "mailto:hello@leonid.dev",
    display: "hello@leonid.dev",
  },
  {
    label: "Telegram",
    href: "https://t.me/leonid_frontend",
    display: "@leonid_frontend",
  },
  {
    label: "GitHub",
    href: "https://github.com/leonidpetrov",
    display: "github.com/leonidpetrov",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/leonidpetrov",
    display: "linkedin.com/in/leonidpetrov",
  },
] as const;

export function ContactSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("contact form submitted", Object.fromEntries(formData.entries()));
  };

  return (
    <YStack gap={16} id="contact">
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
            borderColor="$accentCyan"
            padding={20}
            gap={12}
          >
          <Text color="$textSecondary" fontFamily="$body" fontSize={18} lineHeight={28}>
            Open for senior frontend roles, architecture consulting, and technical audits.
          </Text>

          {CONTACT_LINKS.map((link) => (
            <Text
              key={link.label}
              color="$accentCyan"
              fontFamily="$heading"
              fontSize={13}
              style={{ textShadow: "0 0 8px rgba(82, 255, 246, 0.53)" }}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {link.label}: {link.display}
              </a>
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
            borderColor="$bgSurface"
            padding={16}
            gap={12}
          >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <Text color="$textPrimary" fontFamily="$heading" fontSize={20} fontWeight="700">
              Send a Message
            </Text>

            <ContactField label="Your Name" name="name" placeholder="Your name" icon="user" />
            <ContactField
              label="Your Email"
              name="email"
              placeholder="name@company.com"
              type="email"
              icon="mail"
            />

            <YStack marginTop={4} width="100%">
              <ButtonPrimary preset="medium" style={{ width: "100%" }} type="submit">
                Send Message
              </ButtonPrimary>
            </YStack>
          </form>
        </YStack>
      </XStack>
    </YStack>
  );
}

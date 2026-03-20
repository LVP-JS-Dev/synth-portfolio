"use client";

import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { MetricCard, MetricIconName } from "@/components/modules/MetricCard";
import { Text, XStack, YStack } from "tamagui";

interface ProjectCaseSectionProps {
  title: string;
  summary: string;
  year: number;
  stack: string[];
  metrics: Array<{ label: string; value: string; iconName: MetricIconName }>;
  links: Array<{ label: string; url: string }>;
  highlights: string[];
  results: string[];
}

function BlockTitle({ children }: { children: string }) {
  return (
    <Text color="$textPrimary" fontFamily="$heading" fontSize={20} fontWeight="700">
      {children}
    </Text>
  );
}

export function ProjectCaseSection({ title, summary, year, stack, metrics, links, highlights, results }: ProjectCaseSectionProps) {
  return (
    <YStack gap={14}>
        <YStack
          backgroundColor="$bgSurface"
          borderRadius={14}
          borderWidth={1}
          borderColor="$bgSurface2"
          padding={16}
          gap={10}
          $sm={{ padding: 14 }}
        >
        <Text
          color="$textPrimary"
          fontFamily="$heading"
          fontSize={50}
          fontWeight="700"
          $sm={{ fontSize: 30, lineHeight: 34 }}
          style={{ textShadow: "0 0 10px rgba(255, 79, 216, 0.8)" }}
        >
          {title}
        </Text>
        <Text color="$accentYellow" fontFamily="$heading" fontSize={13} $sm={{ fontSize: 12 }}>
          Role: Senior Frontend Engineer · Duration: 8 months · Team: 6 engineers · Year: {year}
        </Text>
        <Text color="$textSecondary" fontFamily="$body" fontSize={18} lineHeight={28} $sm={{ fontSize: 14, lineHeight: 22 }}>
          TL;DR: {summary}
        </Text>
        <XStack gap={8} flexWrap="wrap">
          {links.map((link, idx) => (
            <ButtonPrimary
              key={link.url}
              preset={idx === 0 ? "medium" : "soft"}
              onPress={() => window.open(link.url, "_blank", "noopener,noreferrer")}
            >
              {link.label}
            </ButtonPrimary>
          ))}
          <ButtonPrimary preset="soft">Architecture</ButtonPrimary>
        </XStack>
      </YStack>

      <XStack gap={12} flexWrap="wrap" $sm={{ flexDirection: "column" }}>
        {metrics.map((metric) => (
          <YStack key={metric.label} flex={1} minWidth={220}>
            <MetricCard iconName={metric.iconName} value={metric.value} label={metric.label} />
          </YStack>
        ))}
      </XStack>

      <XStack gap={12} flexWrap="wrap" $sm={{ flexDirection: "column" }}>
        <YStack flex={1} minWidth={320} gap={14}>
          <BlockTitle>Overview</BlockTitle>
          <Text color="$textSecondary" fontFamily="$body" fontSize={15} lineHeight={24} $sm={{ fontSize: 14, lineHeight: 22 }}>
            The product enabled distributed teams to edit and review complex documents in real time.
            Existing architecture could not guarantee consistency under unstable network conditions.
          </Text>
        </YStack>
        <YStack flex={1} minWidth={320} gap={14}>
          <BlockTitle>Context & Problem</BlockTitle>
          <Text color="$textSecondary" fontFamily="$body" fontSize={15} lineHeight={24} $sm={{ fontSize: 14, lineHeight: 22 }}>
            Business needed enterprise-scale collaboration with strict auditability. Legacy OT approach
            produced merge conflicts and support load spikes during peak usage.
          </Text>
        </YStack>
      </XStack>

      <YStack gap={14}>
        <BlockTitle>Architecture</BlockTitle>
        <XStack gap={12} flexWrap="wrap" $sm={{ flexDirection: "column" }}>
          {[
            ["Client", "Next.js App Router + local CRDT store"],
            ["Sync Layer", "WebSocket gateway + conflict resolution workers"],
            ["Platform", "Audit stream + analytics + Sentry traces"],
          ].map(([name, desc]) => (
              <YStack
                key={name}
                flex={1}
                minWidth={220}
                backgroundColor="$bgBase"
                borderRadius={10}
                borderWidth={1}
                borderColor="$bgSurface2"
                padding={14}
                gap={6}
              >
              <Text color="$accentCyan" fontFamily="$heading" fontSize={12}>
                {name}
              </Text>
              <Text color="$textSecondary" fontFamily="$body" fontSize={14}>
                {desc}
              </Text>
            </YStack>
          ))}
        </XStack>
      </YStack>

      <YStack gap={14}>
        <BlockTitle>Implementation Highlights</BlockTitle>
        {highlights.map((line) => (
          <Text key={line} color="$textSecondary" fontFamily="$body" fontSize={15}>
            {line}
          </Text>
        ))}
      </YStack>

      <YStack gap={14}>
        <BlockTitle>Results & Lessons</BlockTitle>
        {results.map((line) => (
          <Text key={line} color="$textSecondary" fontFamily="$body" fontSize={15}>
            {line}
          </Text>
        ))}
      </YStack>

      <YStack gap={14}>
        <BlockTitle>Stack & Links</BlockTitle>
        <Text color="$accentCyan" fontFamily="$heading" fontSize={13}>
          {stack.join(" · ")}
        </Text>
        {links.map((link) => {
          const isSafe =
            link.url.startsWith("http://") ||
            link.url.startsWith("https://") ||
            link.url.startsWith("mailto:") ||
            link.url.startsWith("tel:");
          const safeUrl = isSafe ? link.url : "#";

          return (
            <Text key={link.url} color="$accentCyan" fontFamily="$body" fontSize={15}>
              <a href={safeUrl} target="_blank" rel="noopener noreferrer">
                {link.label}: {link.url}
              </a>
            </Text>
          );
        })}
      </YStack>
    </YStack>
  );
}

"use client";

import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { MetricCard } from "@/components/modules/MetricCard";
import { Text, XStack, YStack } from "tamagui";

interface ProjectCaseSectionProps {
  title: string;
  summary: string;
  year: number;
  stack: string[];
}

function BlockTitle({ children }: { children: string }) {
  return (
    <Text color="$textPrimary" fontFamily="$heading" fontSize={20} fontWeight="700">
      {children}
    </Text>
  );
}

export function ProjectCaseSection({ title, summary, year, stack }: ProjectCaseSectionProps) {
  return (
    <YStack gap={14}>
      <YStack
        backgroundColor="$bgSurface"
        borderRadius={14}
        borderWidth={1}
        borderColor="#3C3562"
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
          <ButtonPrimary preset="medium">Live Demo</ButtonPrimary>
          <ButtonPrimary preset="soft">GitHub</ButtonPrimary>
          <ButtonPrimary preset="soft">Architecture</ButtonPrimary>
        </XStack>
      </YStack>

      <XStack gap={12} flexWrap="wrap" $sm={{ flexDirection: "column" }}>
        <YStack flex={1} minWidth={220}>
          <MetricCard iconName="activity" value="-38%" label="Editor interaction latency" />
        </YStack>
        <YStack flex={1} minWidth={220}>
          <MetricCard iconName="shield-check" value="-63%" label="Conflict-related support incidents" />
        </YStack>
        <YStack flex={1} minWidth={220}>
          <MetricCard iconName="zap" value="+21%" label="Weekly collaboration sessions" />
        </YStack>
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
              backgroundColor="#1A1630"
              borderRadius={10}
              borderWidth={1}
              borderColor="#3C3562"
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
        {[
          "1) Added operation batching and optimistic mutation rollback.",
          "2) Isolated rendering hotspots with memoized state selectors.",
          "3) Migrated editor shell to streaming SSR for faster first paint.",
          "4) Established release checks: Vitest, Playwright, Lighthouse CI.",
        ].map((line) => (
          <Text key={line} color="$textSecondary" fontFamily="$body" fontSize={15}>
            {line}
          </Text>
        ))}
      </YStack>

      <YStack gap={14}>
        <BlockTitle>Results & Lessons</BlockTitle>
        {[
          "- Collaboration sessions grew by 21% after launch.",
          "- Incident resolution time decreased by 41% with observability integration.",
          "- Team learned to codify conflict-handling as reusable design patterns.",
        ].map((line) => (
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
        <Text color="$accentCyan" fontFamily="$body" fontSize={15}>
          Case Study Repo: github.com/leonidpetrov/realtime-suite
        </Text>
        <Text color="$accentCyan" fontFamily="$body" fontSize={15}>
          Technical Notes: docs.realtime-suite.dev/architecture
        </Text>
      </YStack>
    </YStack>
  );
}

"use client";

import { Text, XStack, YStack } from "tamagui";

export interface TimelineItemProps {
  role: string;
  period: string;
  achievement: string;
  highlight?: boolean;
}

export function TimelineItem({ role, period, achievement, highlight = false }: TimelineItemProps) {
  return (
    <XStack
      width="100%"
      gap={12}
      paddingVertical={12}
      style={
        highlight
          ? {
              borderLeft: "1px solid rgba(82, 255, 246, 0.45)",
              paddingLeft: 10,
            }
          : undefined
      }
    >
      <YStack width={20} paddingTop={4} alignItems="center" justifyContent="center">
        <YStack
          width={8}
          height={8}
          borderRadius={999}
          backgroundColor="$accentCyan"
          style={{ boxShadow: `0 0 ${highlight ? 12 : 8}px rgba(82, 255, 246, 0.75)` }}
        />
      </YStack>

      <YStack flex={1} gap={6}>
        <Text
          color="$textPrimary"
          fontFamily="$heading"
          fontSize={18}
          fontWeight="700"
          style={{ boxShadow: "0 0 12px rgba(82, 255, 246, 0.35)" }}
        >
          {role}
        </Text>

        <Text color="$accentYellow" fontFamily="$heading" fontSize={12} fontWeight="500">
          {period}
        </Text>

        <Text color="$textSecondary" fontFamily="$body" fontSize={14} lineHeight={21}>
          {achievement}
        </Text>
      </YStack>
    </XStack>
  );
}

import { Text, YStack } from "tamagui";

type SectionHeaderProps = {
  kicker: string;
  title: string;
  subtitle: string;
};

export function SectionHeader({ kicker, title, subtitle }: SectionHeaderProps) {
  return (
    <YStack gap={8}>
      <Text color="$accentCyan" fontFamily="$heading" fontSize={12} fontWeight="700" letterSpacing={1}>
        {kicker}
      </Text>
      <Text color="$textPrimary" fontFamily="$heading" fontSize={36} fontWeight="700" $sm={{ fontSize: 24 }}>
        {title}
      </Text>
      <Text color="$textSecondary" fontFamily="$body" fontSize={16} lineHeight={26} $sm={{ fontSize: 14 }}>
        {subtitle}
      </Text>
    </YStack>
  );
}

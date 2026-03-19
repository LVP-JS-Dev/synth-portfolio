import type { LucideIcon } from "lucide-react";
import type { ReactElement, SVGProps } from "react";

type IconSize = 14 | 16 | 20;

interface BaseIconWrapperProps {
  icon: LucideIcon;
  size?: IconSize;
  decorative?: boolean;
}

interface DescriptiveIconWrapperProps extends BaseIconWrapperProps {
  decorative?: false;
  label: string;
}

interface DecorativeIconWrapperProps extends BaseIconWrapperProps {
  decorative?: true;
  label?: string;
}

export type IconWrapperProps = (
  | DescriptiveIconWrapperProps
  | DecorativeIconWrapperProps
) &
  Omit<SVGProps<SVGSVGElement>, "width" | "height">;

export const IconWrapper = (
  {
    icon: Icon,
    size = 16,
    decorative = true,
    label,
    ...svgProps
  }: IconWrapperProps,
): ReactElement => {
  if (!decorative && !label) {
    throw new Error("Non-decorative icons must provide an accessible label");
  }

  return (
    <Icon
      size={size}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      {...svgProps}
    />
  );
};

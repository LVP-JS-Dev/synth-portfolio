"use client";

import type { CSSProperties, HTMLAttributes } from "react";

export type StackDirection = "row" | "column";

export type StackProps = Omit<HTMLAttributes<HTMLDivElement>, "style"> & {
  direction?: StackDirection;
  gap?: number;
  wrap?: boolean;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  style?: CSSProperties;
};

export function Stack({
  direction = "row",
  gap,
  wrap,
  align,
  justify,
  style,
  ...rest
}: StackProps) {
  const mergedStyle = {
    display: "flex",
    flexDirection: direction,
    ...(gap === undefined ? {} : { gap }),
    ...(wrap ? { flexWrap: "wrap" } : {}),
    ...(align === undefined ? {} : { alignItems: align }),
    ...(justify === undefined ? {} : { justifyContent: justify }),
    ...style,
  } satisfies NonNullable<HTMLAttributes<HTMLDivElement>["style"]>;

  return <div {...rest} style={mergedStyle} />;
}

export function XStack(props: Omit<StackProps, "direction">) {
  return <Stack {...props} direction="row" />;
}

export function YStack(props: Omit<StackProps, "direction">) {
  return <Stack {...props} direction="column" />;
}

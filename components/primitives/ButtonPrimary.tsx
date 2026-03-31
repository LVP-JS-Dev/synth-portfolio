"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";
import styles from "./ButtonPrimary.module.css";

export type ButtonPreset = "soft" | "medium" | "hard";

export interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  preset?: ButtonPreset;
  children: ReactNode;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
}

export const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonPrimaryProps>(function ButtonPrimary(
  { preset = "soft", children, iconLeft: IconLeft, iconRight: IconRight, className, type, ...rest },
  ref,
) {
  const presetClass =
    preset === "hard" ? styles.hard : preset === "medium" ? styles.medium : styles.soft;

  const mergedClassName = [styles.button, presetClass, className].filter(Boolean).join(" ");

  return (
    <button ref={ref} className={mergedClassName} type={type ?? "button"} {...rest}>
      {IconLeft ? (
        <span aria-hidden="true">
          <IconLeft size={16} strokeWidth={2.5} focusable="false" />
        </span>
      ) : null}
      {children}
      {IconRight ? (
        <span aria-hidden="true">
          <IconRight size={16} strokeWidth={2.5} focusable="false" />
        </span>
      ) : null}
    </button>
  );
});

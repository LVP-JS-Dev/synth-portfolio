import { ReactElement } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  iconSlot?: ReactElement;
}

export const Button = (
  { variant = "primary", iconSlot, children, className, type = "button", ...rest }: ButtonProps,
) => (
  <button
    type={type}
    className={
      [styles.button, styles[variant], className].filter(Boolean).join(" ")
    }
    {...rest}
  >
    {iconSlot && <span className={styles.iconSlot}>{iconSlot}</span>}
    {children}
  </button>
);

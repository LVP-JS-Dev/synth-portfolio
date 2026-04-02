"use client";

import type { CSSProperties, ReactNode } from "react";
import styles from "./PageContainer.module.css";

type PageContainerProps = {
  children: ReactNode;
  gap?: number;
};

export function PageContainer({ children, gap }: PageContainerProps) {
  const style = gap !== undefined
    ? ({ ["--page-gap" as unknown as keyof CSSProperties]: `${gap}px` } as CSSProperties)
    : undefined;

  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
}

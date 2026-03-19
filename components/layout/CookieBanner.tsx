"use client";

import { ReactElement, useCallback, useState } from "react";
import styles from "./CookieBanner.module.css";

interface CookieBannerProps {
  onAccept?: () => void;
  onDismiss?: () => void;
}

const CONSENT_KEY = "cookie-consent";

type ConsentValue = "accepted" | "dismissed" | null;

const readConsent = (): ConsentValue => {
  if (typeof window === "undefined") {
    return null;
  }

  return (localStorage.getItem(CONSENT_KEY) as ConsentValue) ?? null;
};

const writeConsent = (value: ConsentValue) => {
  if (typeof window === "undefined") {
    return;
  }

  if (value === null) {
    localStorage.removeItem(CONSENT_KEY);
  } else {
    localStorage.setItem(CONSENT_KEY, value);
  }
};

export const CookieBanner = ({ onAccept, onDismiss }: CookieBannerProps): ReactElement | null => {
  const [consent, setConsent] = useState<ConsentValue>(() => readConsent());

  const visible = consent === null;

  const handleAccept = useCallback(() => {
    writeConsent("accepted");
    setConsent("accepted");
    onAccept?.();
  }, [onAccept]);

  const handleDismiss = useCallback(() => {
    writeConsent("dismissed");
    setConsent("dismissed");
    onDismiss?.();
  }, [onDismiss]);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.banner} role="status" aria-live="polite">
      <p className={styles.message}>
        Мы используем куки для улучшения опыта использования сайта. Примите или отклоните их, чтобы продолжить.
      </p>
      <div className={styles.actions}>
        <button className={styles.ghost} onClick={handleDismiss} type="button">
          Отказаться
        </button>
        <button className={styles.primary} onClick={handleAccept} type="button">
          Принять
        </button>
      </div>
    </div>
  );
};

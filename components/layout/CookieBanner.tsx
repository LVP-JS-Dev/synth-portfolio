"use client";

import { ReactElement, useCallback, useSyncExternalStore } from "react";
import styles from "./CookieBanner.module.css";
import {
  getConsentSnapshot,
  notifyConsentChange,
  subscribeToConsent,
  writeConsent,
} from "./consentService";

interface CookieBannerProps {
  onAccept?: () => void;
  onDismiss?: () => void;
}

export const CookieBanner = ({ onAccept, onDismiss }: CookieBannerProps): ReactElement | null => {
  const consent = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, getConsentSnapshot);

  const visible = consent === null;

  const handleAccept = useCallback(() => {
    writeConsent("accepted");
    notifyConsentChange();
    onAccept?.();
  }, [onAccept]);

  const handleDismiss = useCallback(() => {
    // Dismissal is intentionally treated as non-consent; it leaves cookies disabled while hiding the banner.
    writeConsent("dismissed");
    notifyConsentChange();
    onDismiss?.();
  }, [onDismiss]);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.banner} role="region" aria-label="Cookie consent">
      <p className={styles.message} aria-live="polite">
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

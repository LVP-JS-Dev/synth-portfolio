"use client";

import { ReactElement, useCallback, useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import styles from "./CookieBanner.module.css";
import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
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
        Cookies are used for analytics. You can accept or reject non-essential cookies.
      </p>
      <div className={styles.actions}>
        <ButtonPrimary preset="soft" onClick={handleDismiss}>
          Reject
        </ButtonPrimary>
        <ButtonPrimary preset="medium" onClick={handleAccept} iconLeft={Check}>
          Accept
        </ButtonPrimary>
      </div>
    </div>
  );
};

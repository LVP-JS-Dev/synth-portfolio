"use client";

import { ReactElement, useCallback, useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import styles from "./CookieBanner.module.css";
import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { useMessages } from "@/components/i18n/I18nProvider";
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
  const messages = useMessages();
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
    <div className={styles.banner} role="region" aria-label={messages.cookies.regionAria}>
      <p className={styles.message} aria-live="polite">
        {messages.cookies.message}
      </p>
      <div className={styles.actions}>
        <ButtonPrimary preset="soft" onClick={handleDismiss}>
          {messages.cookies.reject}
        </ButtonPrimary>
        <ButtonPrimary preset="medium" onClick={handleAccept} iconLeft={Check}>
          {messages.cookies.accept}
        </ButtonPrimary>
      </div>
    </div>
  );
};

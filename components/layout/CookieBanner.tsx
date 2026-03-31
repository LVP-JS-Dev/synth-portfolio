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
}

export const CookieBanner = ({ onAccept }: CookieBannerProps): ReactElement | null => {
  const consent = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, getConsentSnapshot);

  const visible = consent === null;

  const handleAccept = useCallback(() => {
    writeConsent("accepted");
    notifyConsentChange();
    onAccept?.();
  }, [onAccept]);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.banner} role="region" aria-label="Cookie consent">
      <p className={styles.message} aria-live="polite">
        Cookies are used for analytics and contact form reliability.
      </p>
      <ButtonPrimary preset="medium" onClick={handleAccept} iconLeft={Check}>
        Accept
      </ButtonPrimary>
    </div>
  );
};

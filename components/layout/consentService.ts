const CONSENT_KEY = "cookie-consent";
const CONSENT_EVENT = "cookie-consent-change";

export type ConsentValue = "accepted" | "dismissed" | null;
export type ExplicitConsentValue = Exclude<ConsentValue, null>;

const isConsentValue = (value: string | null): value is ExplicitConsentValue =>
  value === "accepted" || value === "dismissed";

export const readConsent = (): ConsentValue => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(CONSENT_KEY);

    if (!isConsentValue(raw)) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }

    return raw;
  } catch {
    return null;
  }
};

export const getConsentSnapshot = (): ConsentValue => readConsent();

export const writeConsent = (value: ExplicitConsentValue): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    localStorage.setItem(CONSENT_KEY, value);

    return true;
  } catch {
    return false;
  }
};

export const notifyConsentChange = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(CONSENT_EVENT));
};

export const subscribeToConsent = (callback: () => void): (() => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => callback();

  window.addEventListener("storage", handleChange);
  window.addEventListener(CONSENT_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(CONSENT_EVENT, handleChange);
  };
};

export const CONSENT_STORAGE_KEY = CONSENT_KEY;

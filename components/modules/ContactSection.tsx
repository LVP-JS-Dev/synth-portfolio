"use client";

import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { Mail, User } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useMessages } from "@/components/i18n/I18nProvider";
import styles from "./ContactSection.module.css";

function ContactField({
  label,
  name,
  placeholder,
  type = "text",
  icon,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  icon: "user" | "mail";
}) {
  const Icon = icon === "user" ? User : Mail;
  const inputId = `contact-${name}`;

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles.fieldRow}>
        <span className={styles.fieldIcon} aria-hidden="true">
          <Icon size={14} />
        </span>
        <input
          id={inputId}
          className={styles.input}
          name={name}
          type={type}
          required
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

const CONTACT_LINKS = [
  {
    id: "email",
    href: "mailto:lvpjsdev@gmail.com",
    display: "lvpjsdev@gmail.com",
  },
  {
    id: "telegram",
    href: "https://t.me/lvpjsdev",
    display: "@lvpjsdev",
  },
  {
    id: "github",
    href: "https://github.com/leonidpetrov",
    display: "github.com/leonidpetrov",
  },
] as const;

export function ContactSection() {
  const messages = useMessages();
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sent">("idle");
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();

    setSubmitStatus("sent");
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setSubmitStatus("idle");
      resetTimerRef.current = null;
    }, 3500);
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.header}>
        <p className={styles.kicker}>{messages.contact.kicker}</p>
        <h2 className={styles.title}>{messages.contact.title}</h2>
        <p className={styles.subtitle}>{messages.contact.subtitle}</p>
      </div>

      <div className={styles.grid}>
        <div className={[styles.card, styles.cardLeft].join(" ")}>
          <p className={styles.lead}>{messages.contact.lead}</p>

          {CONTACT_LINKS.map((link) => {
            const label =
              link.id === "email"
                ? messages.contact.link.email
                : link.id === "telegram"
                  ? messages.contact.link.telegram
                  : messages.contact.link.github;

            return (
              <a
                key={link.id}
                className={styles.contactLink}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}: {link.display}
              </a>
            );
          })}

          <div className={styles.downloadRow}>
            <ButtonPrimary preset="soft">{messages.contact.downloadCv}</ButtonPrimary>
          </div>
        </div>

        <div className={[styles.card, styles.cardRight].join(" ")}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.formTitle}>{messages.contact.formTitle}</p>

            <ContactField
              label={messages.contact.nameLabel}
              name="name"
              placeholder={messages.contact.namePlaceholder}
              icon="user"
            />
            <ContactField
              label={messages.contact.emailLabel}
              name="email"
              placeholder={messages.contact.emailPlaceholder}
              type="email"
              icon="mail"
            />

            <div className={styles.submitRow}>
              <ButtonPrimary preset="medium" style={{ width: "100%" }} type="submit">
                {messages.contact.submit}
              </ButtonPrimary>
            </div>

            <p className={styles.submitStatus} role="status" aria-live="polite">
              {submitStatus === "sent" ? messages.contact.sent : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

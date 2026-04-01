"use client";

import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { Mail, User } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
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
    label: "Email",
    href: "mailto:lvpjsdev@gmail.com",
    display: "lvpjsdev@gmail.com",
  },
  {
    label: "Telegram",
    href: "https://t.me/lvpjsdev",
    display: "@lvpjsdev",
  },
  {
    label: "GitHub",
    href: "https://github.com/leonidpetrov",
    display: "github.com/leonidpetrov",
  },
] as const;

export function ContactSection() {
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
        <p className={styles.kicker}>07. CONTACT / CTA</p>
        <h2 className={styles.title}>Let&apos;s work together</h2>
        <p className={styles.subtitle}>
          Tell me about your product and where frontend quality can unlock business impact.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={[styles.card, styles.cardLeft].join(" ")}>
          <p className={styles.lead}>
            Open for senior frontend roles, platform architecture, and performance audits.
          </p>

          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              className={styles.contactLink}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}: {link.display}
            </a>
          ))}

          <div className={styles.downloadRow}>
            <ButtonPrimary preset="soft">Download CV</ButtonPrimary>
          </div>
        </div>

        <div className={[styles.card, styles.cardRight].join(" ")}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.formTitle}>Send a Message</p>

            <ContactField label="Your Name" name="name" placeholder="Your name" icon="user" />
            <ContactField
              label="Your Email"
              name="email"
              placeholder="name@company.com"
              type="email"
              icon="mail"
            />

            <div className={styles.submitRow}>
              <ButtonPrimary preset="medium" style={{ width: "100%" }} type="submit">
                Send Message
              </ButtonPrimary>
            </div>

            <p className={styles.submitStatus} role="status" aria-live="polite">
              {submitStatus === "sent" ? "Message sent. I’ll reply as soon as possible." : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { MetricCard, MetricIconName } from "@/components/modules/MetricCard";
import { useMessages } from "@/components/i18n/I18nProvider";
import { formatTemplate } from "@/lib/i18n/format";
import styles from "./ProjectCaseSection.module.css";

interface ProjectCaseSectionProps {
  title: string;
  summary: string;
  year: number;
  stack: string[];
  metrics: Array<{ label: string; value: string; iconName: MetricIconName }>;
  links: Array<{ label: string; url: string }>;
  highlights: string[];
  results: string[];
}

function BlockTitle({ children }: { children: string }) {
  return <h2 className={styles.blockTitle}>{children}</h2>;
}

export function ProjectCaseSection({ title, summary, year, stack, metrics, links, highlights, results }: ProjectCaseSectionProps) {
  const messages = useMessages();
  const openLinkSafely = (rawUrl: string) => {
    const isSafe =
      rawUrl.startsWith("http://") ||
      rawUrl.startsWith("https://") ||
      rawUrl.startsWith("mailto:") ||
      rawUrl.startsWith("tel:");

    if (!isSafe) {
      return;
    }

    window.open(rawUrl, "_blank", "noopener,noreferrer");
  };

  const scrollToArchitecture = () => {
    document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={styles.root}>
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroMeta}>
          {formatTemplate(messages.case.heroMeta, { year })}
        </p>
        <p className={styles.heroSummary}>
          {messages.case.tldr} {summary}
        </p>
        <div className={styles.buttonRow}>
          {links.map((link, idx) => (
            <ButtonPrimary
              key={`${link.label}-${idx}`}
              preset={idx === 0 ? "medium" : "soft"}
              onClick={() => openLinkSafely(link.url)}
            >
              {link.label}
            </ButtonPrimary>
          ))}
          <ButtonPrimary preset="soft" onClick={scrollToArchitecture}>
            {messages.case.archBtn}
          </ButtonPrimary>
        </div>
      </header>

      <section className={styles.metricsRow} aria-label={messages.case.aria.metrics}>
        {metrics.map((metric) => (
          <div key={metric.label} className={styles.metricWrap}>
            <MetricCard iconName={metric.iconName} value={metric.value} label={metric.label} />
          </div>
        ))}
      </section>

      <section className={styles.twoCol} aria-label={messages.case.aria.overviewContext}>
        <div className={styles.col}>
          <BlockTitle>{messages.case.overview.title}</BlockTitle>
          <p className={styles.bodyText}>
            {messages.case.overview.body}
          </p>
        </div>
        <div className={styles.col}>
          <BlockTitle>{messages.case.context.title}</BlockTitle>
          <p className={styles.bodyText}>
            {messages.case.context.body}
          </p>
        </div>
      </section>

      <section className={styles.root} id="architecture" aria-label={messages.case.aria.architecture}>
        <BlockTitle>{messages.case.archBtn}</BlockTitle>
        <div className={styles.archGrid}>
          {[
            [messages.case.archGrid.client.title, messages.case.archGrid.client.desc],
            [messages.case.archGrid.sync.title, messages.case.archGrid.sync.desc],
            [messages.case.archGrid.platform.title, messages.case.archGrid.platform.desc],
          ].map(([name, desc]) => (
            <div key={name} className={styles.archCard}>
              <p className={styles.archName}>{name}</p>
              <p className={styles.archDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.list} aria-label={messages.case.aria.highlights}>
        <BlockTitle>{messages.case.highlightsTitle}</BlockTitle>
        {highlights.map((line) => (
          <p key={line} className={styles.bodyText}>
            {line}
          </p>
        ))}
      </section>

      <section className={styles.list} aria-label={messages.case.aria.results}>
        <BlockTitle>{messages.case.resultsTitle}</BlockTitle>
        {results.map((line) => (
          <p key={line} className={styles.bodyText}>
            {line}
          </p>
        ))}
      </section>

      <section className={styles.list} aria-label={messages.case.aria.stackLinks}>
        <BlockTitle>{messages.case.stackTitle}</BlockTitle>
        <p className={styles.stackText}>{stack.join(" · ")}</p>
        {links.map((link, idx) => {
          const isSafe =
            link.url.startsWith("http://") ||
            link.url.startsWith("https://") ||
            link.url.startsWith("mailto:") ||
            link.url.startsWith("tel:");
          if (!isSafe) {
            return (
              <span key={`${link.label}-${idx}`} className={styles.linkText}>
                {link.label}: {link.url}
              </span>
            );
          }

          return (
            <a
              key={`${link.label}-${idx}`}
              className={styles.link}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}: {link.url}
            </a>
          );
        })}
      </section>
    </section>
  );
}

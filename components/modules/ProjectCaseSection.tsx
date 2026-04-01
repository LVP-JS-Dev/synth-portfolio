"use client";

import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { MetricCard, MetricIconName } from "@/components/modules/MetricCard";
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
          Role: Senior Frontend Engineer · Duration: 8 months · Team: 6 engineers · Year: {year}
        </p>
        <p className={styles.heroSummary}>TL;DR: {summary}</p>
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
            Architecture
          </ButtonPrimary>
        </div>
      </header>

      <section className={styles.metricsRow} aria-label="Key metrics">
        {metrics.map((metric) => (
          <div key={metric.label} className={styles.metricWrap}>
            <MetricCard iconName={metric.iconName} value={metric.value} label={metric.label} />
          </div>
        ))}
      </section>

      <section className={styles.twoCol} aria-label="Overview and context">
        <div className={styles.col}>
          <BlockTitle>Overview</BlockTitle>
          <p className={styles.bodyText}>
            The product enabled distributed teams to edit and review complex documents in real time. Existing
            architecture could not guarantee consistency under unstable network conditions.
          </p>
        </div>
        <div className={styles.col}>
          <BlockTitle>Context &amp; Problem</BlockTitle>
          <p className={styles.bodyText}>
            Business needed enterprise-scale collaboration with strict auditability. Legacy OT approach produced
            merge conflicts and support load spikes during peak usage.
          </p>
        </div>
      </section>

      <section className={styles.root} id="architecture" aria-label="Architecture">
        <BlockTitle>Architecture</BlockTitle>
        <div className={styles.archGrid}>
          {[
            ["Client", "Next.js App Router + local CRDT store"],
            ["Sync Layer", "WebSocket gateway + conflict resolution workers"],
            ["Platform", "Audit stream + analytics + Sentry traces"],
          ].map(([name, desc]) => (
            <div key={name} className={styles.archCard}>
              <p className={styles.archName}>{name}</p>
              <p className={styles.archDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.list} aria-label="Implementation highlights">
        <BlockTitle>Implementation Highlights</BlockTitle>
        {highlights.map((line) => (
          <p key={line} className={styles.bodyText}>
            {line}
          </p>
        ))}
      </section>

      <section className={styles.list} aria-label="Results and lessons">
        <BlockTitle>Results &amp; Lessons</BlockTitle>
        {results.map((line) => (
          <p key={line} className={styles.bodyText}>
            {line}
          </p>
        ))}
      </section>

      <section className={styles.list} aria-label="Stack and links">
        <BlockTitle>Stack &amp; Links</BlockTitle>
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

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { useMessages } from "@/components/i18n/I18nProvider";

type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
};

const FILTERS = [
  "all",
  "react",
  "next",
  "performance",
  "a11y",
  "design_systems",
] as const;

type FilterId = (typeof FILTERS)[number];

function normalizeTag(tag: string): FilterId {
  const lower = tag.toLowerCase();

  if (lower.includes("next")) return "next";
  if (lower.includes("react")) return "react";
  if (lower.includes("a11y") || lower.includes("access")) return "a11y";
  if (lower.includes("perf") || lower.includes("lighthouse") || lower.includes("cwv")) return "performance";
  if (lower.includes("design") || lower.includes("system")) return "design_systems";

  return "all";
}

export function ProjectsFilterGrid({ projects }: { projects: ProjectItem[] }) {
  const messages = useMessages();
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filterLabels: Record<FilterId, string> = {
    all: messages.projects.filters.all,
    react: messages.projects.filters.react,
    next: messages.projects.filters.next,
    performance: messages.projects.filters.performance,
    a11y: messages.projects.filters.a11y,
    design_systems: messages.projects.filters.designSystems,
  };

  const prepared = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        normalizedTags: Array.from(new Set(project.tags.map(normalizeTag).filter((v) => v !== "all"))),
      })),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return prepared;
    return prepared.filter((project) => project.normalizedTags.includes(activeFilter));
  }, [activeFilter, prepared]);

  return (
    <>
      <section style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {FILTERS.map((chip) => (
          <ButtonPrimary
            key={chip}
            preset={chip === activeFilter ? "medium" : "soft"}
            onClick={() => setActiveFilter(chip)}
            aria-pressed={chip === activeFilter}
          >
            {filterLabels[chip]}
          </ButtonPrimary>
        ))}
      </section>

      <section
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {filteredProjects.map((project, index) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
            <ProjectCard
              title={project.title}
              description={project.description}
              ctaLabel={messages.projects.caseCta}
              gradientRotation={130 + ((index % 3) * 10)}
              gradientColors={
                index % 3 === 0
                  ? [
                      "var(--bg-surface-2)",
                      "var(--accent-cyan)",
                      "var(--accent-yellow)",
                    ]
                  : index % 3 === 1
                    ? [
                        "var(--bg-surface-2)",
                        "var(--accent-pink)",
                        "var(--accent-cyan)",
                      ]
                    : [
                        "var(--bg-surface-2)",
                        "var(--accent-cyan)",
                        "var(--accent-yellow)",
                      ]
              }
            />
          </Link>
        ))}

        {filteredProjects.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              padding: 16,
              border: "1px solid var(--stroke-1)",
              borderRadius: 10,
              background: "var(--bg-base)",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-display)",
              fontSize: 13,
            }}
          >
            {messages.projects.empty}
          </div>
        ) : null}
      </section>
    </>
  );
}

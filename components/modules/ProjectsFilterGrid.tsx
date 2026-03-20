"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { ProjectCard } from "@/components/modules/ProjectCard";

type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
};

const FILTERS = ["All", "React", "Next.js", "Performance", "A11y", "Design Systems"] as const;

function normalizeTag(tag: string): string {
  const lower = tag.toLowerCase();

  if (lower.includes("next")) return "Next.js";
  if (lower.includes("react")) return "React";
  if (lower.includes("a11y") || lower.includes("access")) return "A11y";
  if (lower.includes("perf") || lower.includes("lighthouse") || lower.includes("cwv")) return "Performance";
  if (lower.includes("design") || lower.includes("system")) return "Design Systems";

  return "All";
}

export function ProjectsFilterGrid({ projects }: { projects: ProjectItem[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");

  const prepared = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        normalizedTags: Array.from(new Set(project.tags.map(normalizeTag).filter((v) => v !== "All"))),
      })),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return prepared;
    return prepared.filter((project) => project.normalizedTags.includes(activeFilter));
  }, [activeFilter, prepared]);

  return (
    <>
      <section style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {FILTERS.map((chip) => (
          <ButtonPrimary
            key={chip}
            preset={chip === activeFilter ? "medium" : "soft"}
            onPress={() => setActiveFilter(chip)}
            aria-pressed={chip === activeFilter}
          >
            {chip}
          </ButtonPrimary>
        ))}
      </section>

      <section
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {filteredProjects.map((project, index) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
            <ProjectCard
              title={project.title}
              description={project.description}
              ctaLabel="Case Study →"
              gradientRotation={130 + ((index % 3) * 10)}
              gradientColors={
                index % 3 === 0
                  ? ["#2C2550", "#4F46A7", "#36F9F6"]
                  : index % 3 === 1
                    ? ["#2C2550", "#5B2F9B", "#FF7EDB"]
                    : ["#2C2550", "#365A9A", "#FEDE5D"]
              }
            />
          </Link>
        ))}

        {filteredProjects.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              padding: 16,
              border: "1px solid #3C3562",
              borderRadius: 10,
              background: "#20183A",
              color: "#D7CCFF",
              fontFamily: "var(--font-geist-mono)",
              fontSize: 13,
            }}
          >
            No projects for the selected filter yet.
          </div>
        ) : null}
      </section>
    </>
  );
}

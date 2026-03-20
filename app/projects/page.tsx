import { buildMetadata } from "@/lib/metadata";
import { getAllProjects, getProjectsPageContent } from "@/lib/content";
import Link from "next/link";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";

export async function generateMetadata() {
  const page = await getProjectsPageContent("en");

  return buildMetadata("/projects", "en", {
    title: page.title,
    description: page.description,
  });
}

export default async function ProjectsPage() {
  const page = await getProjectsPageContent("en");
  const projects = await getAllProjects();

  const chips = ["All", "React", "Next.js", "Performance", "A11y", "Design Systems"] as const;

  return (
    <main>
      <div style={{ padding: "24px 20px", display: "grid", gap: 24 }}>
        <section
          style={{
            background: "#221C3E",
            border: "1px solid #3C3562",
            borderRadius: 14,
            padding: 24,
            display: "grid",
            gap: 10,
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#FFF9FF",
              fontFamily: "var(--font-geist-mono)",
              fontSize: 48,
              fontWeight: 700,
              textShadow: "0 0 10px rgba(255,79,216,0.8)",
            }}
          >
            {page.title}
          </h1>
          <p
            style={{
              margin: 0,
              color: "#D7CCFF",
              fontSize: 18,
              lineHeight: 1.55,
            }}
          >
            {page.description}
          </p>
        </section>

        <section style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {chips.map((chip, index) => (
            <ButtonPrimary key={chip} preset={index === 0 ? "medium" : "soft"}>
              {chip}
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
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              style={{ textDecoration: "none" }}
            >
              <ProjectCard
                title={project.titleEn}
                description={project.summaryEn}
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
        </section>

        <section style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {[
            { value: "01", active: true },
            { value: "02", active: false },
            { value: "03", active: false },
          ].map((pageItem) => (
            <span
              key={pageItem.value}
              style={{
                color: pageItem.active ? "#52FFF6" : "#D7CCFF",
                fontFamily: "var(--font-geist-mono)",
                fontSize: 12,
                fontWeight: pageItem.active ? 700 : 400,
              }}
            >
              {pageItem.value}
            </span>
          ))}
        </section>
      </div>
    </main>
  );
}

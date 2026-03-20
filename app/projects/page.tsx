import { buildMetadata } from "@/lib/metadata";
import { getAllProjects, getProjectsPageContent } from "@/lib/content";
import { ProjectsFilterGrid } from "@/components/modules/ProjectsFilterGrid";

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
  const cardsCount = Math.max(projects.length, 1);
  const pagesCount = Math.max(1, Math.ceil(cardsCount / 6));

  return (
    <main>
      <div
        style={{
          padding: "16px 20px 24px",
          display: "grid",
          gap: 20,
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <section
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--bg-surface-2)",
            borderRadius: 14,
            padding: "16px",
            display: "grid",
            gap: 8,
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#FFF9FF",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "clamp(30px, 6vw, 48px)",
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
              fontSize: "clamp(14px, 2.5vw, 18px)",
              lineHeight: 1.55,
            }}
          >
            {page.description}
          </p>
        </section>

        <ProjectsFilterGrid
          projects={projects.map((project) => ({
            slug: project.slug,
            title: project.titleEn,
            description: project.summaryEn,
            tags: project.stack,
          }))}
        />

        <section style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {Array.from({ length: pagesCount }, (_, index) => ({
            value: String(index + 1).padStart(2, "0"),
            active: index === 0,
          })).map((pageItem) => (
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

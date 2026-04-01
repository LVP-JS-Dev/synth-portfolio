import { buildMetadata } from "@/lib/metadata";
import { getAllProjects, getProjectsPageContent } from "@/lib/content";
import { ProjectsFilterGrid } from "@/components/modules/ProjectsFilterGrid";
import { PageContainer } from "@/components/layout/PageContainer";

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
      <PageContainer gap={40}>
        <section
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--stroke-1)",
            borderRadius: 14,
            padding: "24px",
            display: "grid",
            gap: 8,
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "var(--text-primary)",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 6vw, 48px)",
              fontWeight: 700,
              textShadow: "0 0 10px var(--glow-hard)",
            }}
          >
            {page.title}
          </h1>
          <p
            style={{
              margin: 0,
              color: "var(--text-secondary)",
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
                color: pageItem.active ? "var(--accent-cyan)" : "var(--text-secondary)",
                fontFamily: "var(--font-display)",
                fontSize: 12,
                fontWeight: pageItem.active ? 700 : 400,
              }}
            >
              {pageItem.value}
            </span>
          ))}
        </section>
      </PageContainer>
    </main>
  );
}

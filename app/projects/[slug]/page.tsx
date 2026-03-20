import { buildMetadata } from "@/lib/metadata";
import { getProjectSlugs, getProjectBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { ProjectCaseSection } from "@/components/modules/ProjectCaseSection";

type Params = {
  slug: string;
};

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return buildMetadata(`/projects/${slug}`, "en", {
    title: project?.titleEn ?? slug,
    description: project?.summaryEn,
  });
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <div style={{ padding: "24px 20px", display: "grid", gap: 24 }}>
        <ProjectCaseSection
          title={project.titleEn}
          summary={project.summaryEn}
          year={project.year}
          stack={project.stack}
          metrics={[
            { iconName: "activity", value: "-38%", label: "Editor interaction latency" },
            { iconName: "shield-check", value: "-63%", label: "Conflict support tickets" },
            { iconName: "zap", value: "+21%", label: "Weekly active sessions" },
          ]}
          links={[
            { label: "Live Demo", url: "#" },
            { label: "GitHub", url: "#" },
          ]}
          highlights={[
            "Added operation batching and optimistic mutation rollback.",
            "Isolated rendering hotspots with memoized state selectors.",
            "Migrated editor shell to streaming SSR for faster first paint.",
            "Established release checks: Vitest, Playwright, Lighthouse CI.",
          ]}
          results={[
            "Collaboration sessions grew by 21% after launch.",
            "Incident resolution time decreased by 41% with observability integration.",
            "Team learned to codify conflict-handling as reusable design patterns.",
          ]}
        />
      </div>
    </main>
  );
}

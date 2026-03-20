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
        />
      </div>
    </main>
  );
}

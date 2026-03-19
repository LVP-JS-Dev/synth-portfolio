import { buildMetadata } from "@/lib/metadata";
import { getProjectSlugs, getProjectBySlug } from "@/lib/content";
import { notFound } from "next/navigation";

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
      <h1>{project.titleEn}</h1>
      <p>{project.summaryEn}</p>
      <p>Year: {project.year}</p>
      <p>Stack: {project.stack.join(", ")}</p>
    </main>
  );
}

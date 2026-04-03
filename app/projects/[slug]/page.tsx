import { buildMetadata } from "@/lib/metadata";
import { getProjectSlugs, getProjectBySlug } from "@/lib/content";
import { getI18nStaticContext } from "@/lib/i18n/static";
import { getProjectCasePlaceholder } from "@/lib/i18n/project-case-placeholder";
import { notFound } from "next/navigation";
import { ProjectCaseSection } from "@/components/modules/ProjectCaseSection";
import { PageContainer } from "@/components/layout/PageContainer";

type Params = {
  slug: string;
};

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const i18n = getI18nStaticContext();

  const title =
    project === null
      ? slug
      : i18n.locale === "ru"
        ? project?.titleRu ?? project?.titleEn ?? slug
        : project?.titleEn ?? slug;

  const description =
    project === null
      ? undefined
      : i18n.locale === "ru"
        ? project?.summaryRu ?? project?.summaryEn
        : project?.summaryEn;

  return buildMetadata(
    `/projects/${slug}`,
    i18n.locale,
    {
      title,
      description,
    },
  );
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const i18n = getI18nStaticContext();

  if (!project) {
    notFound();
  }

  const placeholder = getProjectCasePlaceholder(i18n.locale);

  return (
    <main>
      <PageContainer gap={40}>
        <ProjectCaseSection
          title={i18n.locale === "ru" ? project.titleRu : project.titleEn}
          summary={i18n.locale === "ru" ? project.summaryRu : project.summaryEn}
          year={project.year}
          stack={[...project.stack]}
          metrics={placeholder.metrics}
          links={placeholder.links}
          highlights={placeholder.highlights}
          results={placeholder.results}
        />
      </PageContainer>
    </main>
  );
}

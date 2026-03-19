import { buildMetadata } from "@/lib/metadata";
import { getAllProjects, getProjectsPageContent } from "@/lib/content";
import Link from "next/link";

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

  return (
    <main>
      <h1>{page.title}</h1>
      <p>{page.description}</p>
      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`}>{project.titleEn}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

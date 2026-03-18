import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata("/projects");
}

export default async function ProjectsPage() {
  return (
    <main>
      <h1>Projects</h1>
    </main>
  );
}

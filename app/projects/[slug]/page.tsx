import { buildMetadata } from "@/lib/metadata";

type Params = {
  slug: string;
};

export async function generateMetadata({ params: { slug } }: { params: Params }) {
  return buildMetadata(`/projects/${slug}`);
}

export default async function ProjectPage({ params }: { params: Params }) {
  return (
    <main>
      <h1>Project: {params.slug}</h1>
    </main>
  );
}

import { buildMetadata } from "@/lib/metadata";

type Params = {
  slug: string;
};

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildMetadata(`/projects/${slug}`);
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main>
      <h1>Project: {slug}</h1>
    </main>
  );
}

import { buildMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content";

export async function generateMetadata() {
  const legal = await getLegalContent("en");

  return buildMetadata("/legal", "en", {
    title: legal.title,
    description: legal.description,
  });
}

export default async function LegalPage() {
  const legal = await getLegalContent("en");

  return (
    <main>
      <h1>{legal.title}</h1>
      <p>{legal.body}</p>
    </main>
  );
}

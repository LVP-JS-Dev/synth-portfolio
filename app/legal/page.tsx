import { buildMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content";
import { LegalSections } from "@/components/modules/LegalSections";

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
      <div style={{ padding: "24px 20px", display: "grid", gap: 24 }}>
        <LegalSections title={legal.title} description={legal.description} body={legal.body} />
      </div>
    </main>
  );
}

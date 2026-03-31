import { buildMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content";
import { LegalSections } from "@/components/modules/LegalSections";
import { PageContainer } from "@/components/layout/PageContainer";

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
      <PageContainer gap={32}>
        <LegalSections title={legal.title} description={legal.description} body={legal.body} />
      </PageContainer>
    </main>
  );
}

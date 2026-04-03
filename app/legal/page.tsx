import { buildMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content";
import { getI18nStaticContext } from "@/lib/i18n/static";
import { LegalSections } from "@/components/modules/LegalSections";
import { PageContainer } from "@/components/layout/PageContainer";

export async function generateMetadata() {
  const i18n = getI18nStaticContext();
  const legal = await getLegalContent(i18n.locale);

  return buildMetadata(
    "/legal",
    i18n.locale,
    {
      title: legal.title,
      description: legal.description,
    },
  );
}

export default async function LegalPage() {
  const i18n = getI18nStaticContext();
  const legal = await getLegalContent(i18n.locale);

  return (
    <main>
      <PageContainer gap={32}>
        <LegalSections title={legal.title} description={legal.description} body={legal.body} />
      </PageContainer>
    </main>
  );
}

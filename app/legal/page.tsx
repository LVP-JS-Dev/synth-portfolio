import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata("/legal");
}

export default async function LegalPage() {
  return (
    <main>
      <h1>Legal</h1>
    </main>
  );
}

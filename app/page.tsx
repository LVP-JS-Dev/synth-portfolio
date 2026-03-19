import { buildMetadata } from "@/lib/metadata";
import { getHomeContent } from "@/lib/content";
import { HeroSection } from "@/components/modules/HeroSection";

export async function generateMetadata() {
  const home = await getHomeContent("en");

  return buildMetadata("/", "en", {
    title: home.title,
    description: home.description,
  });
}

export default async function Home() {
  const home = await getHomeContent("en");

  return (
    <main>
      <div style={{ padding: '24px 20px', gap: '32px' }}>
        <HeroSection />
      </div>
    </main>
  );
}

import { buildMetadata } from "@/lib/metadata";
import { getHomeContent } from "@/lib/content";

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
      <h1>{home.title}</h1>
      <p>{home.intro}</p>
    </main>
  );
}

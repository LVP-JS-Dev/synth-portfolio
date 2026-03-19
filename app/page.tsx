import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata("/");
}

export default async function Home() {
  return (
    <main>
      <h1>Home</h1>
    </main>
  );
}

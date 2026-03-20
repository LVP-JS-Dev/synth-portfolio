import { buildMetadata } from "@/lib/metadata";
import { getHomeContent } from "@/lib/content";
import { HeroSection } from "@/components/modules/HeroSection";
import { MetricCard } from "@/components/modules/MetricCard";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { TimelineItem } from "@/components/modules/TimelineItem";
import { AboutSection } from "@/components/modules/AboutSection";
import { ContactSection } from "@/components/modules/ContactSection";

export async function generateMetadata() {
  const home = await getHomeContent("en");

  return buildMetadata("/", "en", {
    title: home.title,
    description: home.description,
  });
}

export default async function Home() {
  const metrics = [
    {
      iconName: "zap" as const,
      value: "-49%",
      label: "JS bundle after architecture split",
    },
    {
      iconName: "shield-check" as const,
      value: "98/100",
      label: "Accessibility score in production",
    },
    {
      iconName: "activity" as const,
      value: "-41%",
      label: "Mean time to resolve frontend incidents",
    },
  ] as const;

  const projects = [
    {
      title: "Realtime Collaboration Suite",
      description:
        "Problem → fragmented comments; Solution → CRDT + optimistic UI; Result → 2.1x faster collaboration.",
      gradientColors: ["$bgSurface2", "#4F46A7", "$accentCyan"] as [string, string, string],
      gradientRotation: 120,
    },
    {
      title: "Ecommerce Edge Frontend",
      description:
        "Problem → slow storefront; Solution → ISR + streaming SSR; Result → conversion +18%.",
      gradientColors: ["$bgSurface2", "#5B2F9B", "$accentPink"] as [string, string, string],
      gradientRotation: 135,
    },
    {
      title: "Design System Federation",
      description:
        "Problem → duplicated UI stacks; Solution → shared primitives + codemods; Result → release speed +34%.",
      gradientColors: ["$bgSurface2", "#365A9A", "$accentYellow"] as [string, string, string],
      gradientRotation: 150,
    },
  ] as const;

  const timeline = [
    {
      role: "Senior Frontend Engineer · FinTech Core Platform",
      period: "2022 — Present",
      achievement:
        "Cut p95 page load from 3.8s to 1.9s, implemented observability and a11y gates in CI.",
      highlight: true,
    },
    {
      role: "Frontend Lead · Commerce Experience Team",
      period: "2019 — 2022",
      achievement:
        "Introduced design system adoption across 9 product squads and reduced UI defects by 37%.",
      highlight: false,
    },
    {
      role: "Frontend Engineer · SaaS Analytics",
      period: "2017 — 2019",
      achievement:
        "Rebuilt dashboard rendering pipeline, improving interaction responsiveness by 55%.",
      highlight: false,
    },
  ] as const;

  return (
    <main>
      <div style={{ padding: "24px 20px", display: "grid", gap: 32 }}>
        <HeroSection />

        <AboutSection />

        <section id="experience" style={{ display: "grid", gap: 16 }}>
          <h2
            style={{
              margin: 0,
              color: "#FFF9FF",
              fontFamily: "var(--font-geist-mono)",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            Experience
          </h2>

          <div
            style={{
              borderLeft: "2px solid #3D3564",
              paddingLeft: 8,
              display: "grid",
              gap: 6,
            }}
          >
            {timeline.map((item) => (
              <TimelineItem
                key={item.role}
                role={item.role}
                period={item.period}
                achievement={item.achievement}
                highlight={item.highlight}
              />
            ))}
          </div>
        </section>

        <section id="quality" style={{ display: "grid", gap: 16 }}>
          <h2
            style={{
              margin: 0,
              color: "#FFF9FF",
              fontFamily: "var(--font-geist-mono)",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            Engineering Quality
          </h2>

          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {metrics.map((metric) => (
              <MetricCard
                key={metric.label}
                iconName={metric.iconName}
                value={metric.value}
                label={metric.label}
              />
            ))}
          </div>
        </section>

        <section id="projects" style={{ display: "grid", gap: 16 }}>
          <h2
            style={{
              margin: 0,
              color: "#FFF9FF",
              fontFamily: "var(--font-geist-mono)",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            Selected Projects
          </h2>

          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            }}
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                gradientColors={project.gradientColors}
                gradientRotation={project.gradientRotation}
                ctaLabel="Case Study →"
              />
            ))}
          </div>
        </section>

        <ContactSection />
      </div>
    </main>
  );
}

import React from "react";
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

const SECTION_TITLE_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#FFF9FF",
  fontFamily: "var(--font-geist-mono)",
  fontSize: 28,
  fontWeight: 700,
};

export default async function Home() {
  const metrics = [
    {
      iconName: "zap" as const,
      value: "95%+",
      label: "Successful KYC/liveness verifications after UX tuning",
    },
    {
      iconName: "shield-check" as const,
      value: "-40%",
      label: "Lower real-time video latency via WebSocket optimizations",
    },
    {
      iconName: "activity" as const,
      value: "95+",
      label: "Mobile PageSpeed for AI audio cleanup platform",
    },
  ] as const;

  const projects = [
    {
      title: "KYC Liveness Verification Widget",
      description:
        "Cross‑browser iframe widget with getUserMedia and UX guidance; 95%+ verification success and 40% lower latency.",
      gradientColors: ["$bgSurface2", "#4F46A7", "$accentCyan"] as [string, string, string],
      gradientRotation: 120,
    },
    {
      title: "AI Audio Cleanup Platform",
      description:
        "Next.js marketing site with 95+ mobile PageSpeed and interactive before/after waveform player.",
      gradientColors: ["$bgSurface2", "#5B2F9B", "$accentPink"] as [string, string, string],
      gradientRotation: 135,
    },
    {
      title: "Mobile Credit Application Flow",
      description:
        "React/TypeScript WebView flow plus internal UI library (12+ components) and faster builds.",
      gradientColors: ["$bgSurface2", "#365A9A", "$accentYellow"] as [string, string, string],
      gradientRotation: 150,
    },
  ] as const;

  const timeline = [
    {
      role: "Senior Fullstack Developer · Void0",
      period: "Dec 2024 — Present",
      achievement:
        "Built KYC/liveness verification widget (95%+ success) and reduced real‑time video latency by 40% via WebSocket optimizations.",
      highlight: true,
    },
    {
      role: "Senior Frontend Developer · Selecty",
      period: "Dec 2022 — Nov 2024",
      achievement:
        "Delivered mobile credit application flow for WebView and built an internal UI library (12+ components).",
      highlight: true,
    },
    {
      role: "Lead Engineer · Sber",
      period: "Sep 2021 — Oct 2022",
      achievement:
        "Led a 3‑engineer frontend team; shipped unified web/mobile UX on React/React Native and admin tools.",
      highlight: false,
    },
    {
      role: "JavaScript Developer · EPAM",
      period: "Dec 2020 — Aug 2021",
      achievement:
        "Implemented B2B onboarding flows on React/Redux‑Saga and improved initial load by 40% with code splitting.",
      highlight: false,
    },
    {
      role: "Fullstack Developer · LATOKEN",
      period: "Aug 2020 — Dec 2020",
      achievement:
        "Built CRM dashboards and a Node.js/Express BFF layer; introduced cross‑team code review practice.",
      highlight: false,
    },
  ] as const;

  return (
    <main>
      <div style={{ padding: "24px 20px", display: "grid", gap: 32 }}>
        <HeroSection />

        <AboutSection />

        <section id="experience" style={{ display: "grid", gap: 16 }}>
          <h2 style={SECTION_TITLE_STYLE}>
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
          <h2 style={SECTION_TITLE_STYLE}>
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
          <h2 style={SECTION_TITLE_STYLE}>
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

import React from "react";
import { buildMetadata } from "@/lib/metadata";
import { getHomeContent } from "@/lib/content";
import { getI18nStaticContext } from "@/lib/i18n/static";
import { getHomePageCopy } from "@/lib/i18n/home-page-copy";
import { HeroSection } from "@/components/modules/HeroSection";
import { MetricCard } from "@/components/modules/MetricCard";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { TimelineItem } from "@/components/modules/TimelineItem";
import { AboutSection } from "@/components/modules/AboutSection";
import { ContactSection } from "@/components/modules/ContactSection";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/modules/SectionHeader";

export async function generateMetadata() {
  const i18n = getI18nStaticContext();
  const home = await getHomeContent(i18n.locale);

  return buildMetadata(
    "/",
    i18n.locale,
    {
      title: home.title,
      description: home.description,
    },
  );
}

export default async function Home() {
  const i18n = getI18nStaticContext();
  const copy = getHomePageCopy(i18n.locale);

  return (
    <main>
      <PageContainer gap={48}>
        <HeroSection />

        <AboutSection />

        <section id="experience" style={{ display: "grid", gap: 16 }}>
          <h2 className="sr-only">{copy.experience.srOnlyHeading}</h2>
          <SectionHeader
            kicker={copy.experience.kicker}
            title={copy.experience.title}
            subtitle={copy.experience.subtitle}
          />

          <div
            style={{
              borderLeft: "2px solid #3D3564",
              paddingLeft: 8,
              display: "grid",
              gap: 6,
            }}
          >
            {copy.timeline.map((item) => (
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

        <section id="projects" style={{ display: "grid", gap: 16 }}>
          <SectionHeader
            kicker={copy.selectedProjects.kicker}
            title={copy.selectedProjects.title}
            subtitle={copy.selectedProjects.subtitle}
          />

          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            }}
          >
            {copy.projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                gradientColors={project.gradientColors}
                gradientRotation={project.gradientRotation}
                ctaLabel={i18n.messages.projects.caseCta}
              />
            ))}
          </div>
        </section>

        <section id="quality" style={{ display: "grid", gap: 16 }}>
          <SectionHeader
            kicker={copy.quality.kicker}
            title={copy.quality.title}
            subtitle={copy.quality.subtitle}
          />

          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {copy.metrics.map((metric) => (
              <MetricCard
                key={metric.label}
                iconName={metric.iconName}
                value={metric.value}
                label={metric.label}
              />
            ))}
          </div>
        </section>

        <ContactSection />
      </PageContainer>
    </main>
  );
}

import type { Locale } from "@/lib/i18n/locale";
import type { MetricIconName } from "@/components/modules/MetricCard";

type HomeMetric = {
  iconName: MetricIconName;
  value: string;
  label: string;
};

type FeaturedProject = {
  title: string;
  description: string;
  gradientColors: [string, string, string];
  gradientRotation: number;
};

type TimelineRecord = {
  role: string;
  period: string;
  achievement: string;
  highlight: boolean;
};

export function getHomePageCopy(locale: Locale) {
  const metrics: readonly HomeMetric[] =
    locale === "ru"
      ? [
          {
            iconName: "zap",
            value: "95%+",
            label: "Успешные KYC/liveness‑проверки после UX‑тюнинга",
          },
          {
            iconName: "shield-check",
            value: "-40%",
            label: "Снижение задержки видео в реальном времени за счёт оптимизаций WebSocket",
          },
          {
            iconName: "activity",
            value: "95+",
            label: "Mobile PageSpeed для AI‑платформы очистки аудио",
          },
        ]
      : [
          {
            iconName: "zap",
            value: "95%+",
            label: "Successful KYC/liveness verifications after UX tuning",
          },
          {
            iconName: "shield-check",
            value: "-40%",
            label: "Lower real-time video latency via WebSocket optimizations",
          },
          {
            iconName: "activity",
            value: "95+",
            label: "Mobile PageSpeed for AI audio cleanup platform",
          },
        ];

  const projects: readonly FeaturedProject[] =
    locale === "ru"
      ? [
          {
            title: "Виджет KYC/Liveness‑верификации",
            description:
              "Кроссбраузерный iframe‑виджет с getUserMedia и UX‑подсказками; 95%+ успешных проверок и −40% задержки.",
            gradientColors: ["var(--bg-surface-2)", "#4F46A7", "var(--accent-cyan)"],
            gradientRotation: 120,
          },
          {
            title: "Платформа очистки аудио на базе AI",
            description:
              "Маркетинговый сайт на Next.js с 95+ mobile PageSpeed и интерактивным плеером waveform до/после.",
            gradientColors: ["var(--bg-surface-2)", "#5B2F9B", "var(--accent-pink)"],
            gradientRotation: 135,
          },
          {
            title: "Мобильный флоу кредитной заявки",
            description:
              "React/TypeScript WebView‑флоу плюс внутренняя UI‑библиотека (12+ компонентов) и ускорение сборок.",
            gradientColors: ["var(--bg-surface-2)", "#365A9A", "var(--accent-yellow)"],
            gradientRotation: 150,
          },
        ]
      : [
          {
            title: "KYC Liveness Verification Widget",
            description:
              "Cross‑browser iframe widget with getUserMedia and UX guidance; 95%+ verification success and 40% lower latency.",
            gradientColors: ["var(--bg-surface-2)", "#4F46A7", "var(--accent-cyan)"],
            gradientRotation: 120,
          },
          {
            title: "AI Audio Cleanup Platform",
            description:
              "Next.js marketing site with 95+ mobile PageSpeed and interactive before/after waveform player.",
            gradientColors: ["var(--bg-surface-2)", "#5B2F9B", "var(--accent-pink)"],
            gradientRotation: 135,
          },
          {
            title: "Mobile Credit Application Flow",
            description:
              "React/TypeScript WebView flow plus internal UI library (12+ components) and faster builds.",
            gradientColors: ["var(--bg-surface-2)", "#365A9A", "var(--accent-yellow)"],
            gradientRotation: 150,
          },
        ];

  const timeline: readonly TimelineRecord[] =
    locale === "ru"
      ? [
          {
            role: "Senior Fullstack Developer · Void0",
            period: "Дек 2024 — сейчас",
            achievement:
              "Собрал KYC/liveness‑виджет (95%+ успех) и снизил задержку видео на 40% через оптимизации WebSocket.",
            highlight: true,
          },
          {
            role: "Senior Frontend Developer · Selecty",
            period: "Дек 2022 — Ноя 2024",
            achievement:
              "Поставил мобильный флоу кредитной заявки для WebView и развил внутреннюю UI‑библиотеку (12+ компонентов).",
            highlight: true,
          },
          {
            role: "Lead Engineer · Sber",
            period: "Сен 2021 — Окт 2022",
            achievement:
              "Вёл frontend‑команду из 3 инженеров; выпустил единый UX для web/mobile на React/React Native и админ‑инструменты.",
            highlight: false,
          },
          {
            role: "JavaScript Developer · EPAM",
            period: "Дек 2020 — Авг 2021",
            achievement:
              "Реализовал B2B onboarding‑флоу на React/Redux‑Saga и ускорил initial load на 40% за счёт code splitting.",
            highlight: false,
          },
          {
            role: "Fullstack Developer · LATOKEN",
            period: "Авг 2020 — Дек 2020",
            achievement:
              "Сделал CRM‑дашборды и Node.js/Express BFF; внедрил практику code review между командами.",
            highlight: false,
          },
        ]
      : [
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
        ];

  const experience = {
    srOnlyHeading: locale === "ru" ? "Опыт" : "Experience",
    kicker: locale === "ru" ? "03. ОПЫТ / РАБОТА" : "03. EXPERIENCE / WORK HISTORY",
    title:
      locale === "ru"
        ? "Роли, масштаб задач и измеримые результаты"
        : "Roles, scope, and measurable outcomes",
    subtitle:
      locale === "ru"
        ? "Роли, контекст и результаты из финтеха и B2B команд."
        : "Roles, scope, and measurable outcomes from fintech and B2B teams.",
  } as const;

  const selectedProjects = {
    kicker: locale === "ru" ? "04. ИЗБРАННЫЕ ПРОЕКТЫ" : "04. SELECTED PROJECTS",
    title:
      locale === "ru"
        ? "Frontend‑инжиниринг на основе кейсов"
        : "Case-driven frontend engineering",
    subtitle:
      locale === "ru"
        ? "Каждый проект связывает продуктовую задачу с архитектурными решениями и измеримым эффектом."
        : "Each project maps a product problem to architecture decisions and measurable delivery impact.",
  } as const;

  const quality = {
    kicker: locale === "ru" ? "05. КАЧЕСТВО ИНЖЕНЕРИИ" : "05. ENGINEERING QUALITY",
    title: locale === "ru" ? "Производительность, доступность, DX" : "Performance, Accessibility, DX",
    subtitle:
      locale === "ru"
        ? "Практичная модель качества: измерить, зафиксировать, наблюдать и улучшать."
        : "A practical quality model: benchmark, enforce, observe, and iterate.",
  } as const;

  return {
    metrics: [...metrics],
    projects: [...projects],
    timeline: [...timeline],
    experience,
    selectedProjects,
    quality,
  };
}

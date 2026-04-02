import type { Locale } from "@/lib/i18n/locale";
import type { MetricIconName } from "@/components/modules/MetricCard";

export function getProjectCasePlaceholder(locale: Locale) {
  const metrics =
    locale === "ru"
      ? [
          { iconName: "activity" as const, value: "-38%", label: "Задержка взаимодействия с редактором" },
          { iconName: "shield-check" as const, value: "-63%", label: "Тикеты в поддержку по конфликтам" },
          { iconName: "zap" as const, value: "+21%", label: "Еженедельные активные сессии" },
        ]
      : [
          { iconName: "activity" as const, value: "-38%", label: "Editor interaction latency" },
          { iconName: "shield-check" as const, value: "-63%", label: "Conflict support tickets" },
          { iconName: "zap" as const, value: "+21%", label: "Weekly active sessions" },
        ];

  const links =
    locale === "ru"
      ? [
          { label: "Демо", url: "#" },
          { label: "GitHub", url: "#" },
        ]
      : [
          { label: "Live Demo", url: "#" },
          { label: "GitHub", url: "#" },
        ];

  const highlights =
    locale === "ru"
      ? [
          "Добавил батчинг операций и откат optimistic‑мутаций.",
          "Изолировал hotspots рендера мемоизированными селекторами состояния.",
          "Перевёл оболочку редактора на streaming SSR для более быстрого first paint.",
          "Зафиксировал release‑чеки: Vitest, Playwright, Lighthouse CI.",
        ]
      : [
          "Added operation batching and optimistic mutation rollback.",
          "Isolated rendering hotspots with memoized state selectors.",
          "Migrated editor shell to streaming SSR for faster first paint.",
          "Established release checks: Vitest, Playwright, Lighthouse CI.",
        ];

  const results =
    locale === "ru"
      ? [
          "Сессии совместного редактирования выросли на 21% после релиза.",
          "Время решения инцидентов снизилось на 41% за счёт интеграции observability.",
          "Команда научилась формализовать обработку конфликтов как переиспользуемые паттерны.",
        ]
      : [
          "Collaboration sessions grew by 21% after launch.",
          "Incident resolution time decreased by 41% with observability integration.",
          "Team learned to codify conflict-handling as reusable design patterns.",
        ];

  return {
    metrics: metrics.map((m) => ({ ...m })) as Array<{ label: string; value: string; iconName: MetricIconName }>,
    links: links.map((l) => ({ ...l })),
    highlights: [...highlights],
    results: [...results],
  };
}

import type { Locale } from "@/lib/i18n/locale";

type CaseMessages = {
  heroMeta: string;
  tldr: string;
  archBtn: string;
  aria: {
    metrics: string;
    overviewContext: string;
    architecture: string;
    highlights: string;
    results: string;
    stackLinks: string;
  };
  overview: { title: string; body: string };
  context: { title: string; body: string };
  archGrid: {
    client: { title: string; desc: string };
    sync: { title: string; desc: string };
    platform: { title: string; desc: string };
  };
  highlightsTitle: string;
  resultsTitle: string;
  stackTitle: string;
};

export type Messages = {
  nav: {
    brandDesktop: string;
    brandMobile: string;
    about: string;
    experience: string;
    projects: string;
    quality: string;
    contact: string;
    menu: string;
    openMenuAria: string;
    mainAria: string;
    langSwitchAria: string;
  };
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    cta: {
      viewProjects: string;
      quality: string;
      contact: string;
    };
    focusAria: string;
    focusTitle: string;
    focus: { item1: string; item2: string; item3: string };
  };
  about: {
    kicker: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
    focusAria: string;
    focusTitle: string;
    focus: { a1: string; a2: string; a3: string; a4: string };
  };
  projects: {
    caseCta: string;
    filters: {
      all: string;
      react: string;
      next: string;
      performance: string;
      a11y: string;
      designSystems: string;
    };
    empty: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    lead: string;
    link: { email: string; telegram: string; github: string };
    downloadCv: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    sent: string;
  };
  cookies: {
    regionAria: string;
    message: string;
    reject: string;
    accept: string;
  };
  legal: {
    block: {
      privacy: { title: string; desc: string };
      consent: { title: string; desc: string };
      cookies: { title: string; desc: string };
    };
    noticeAria: string;
    note: string;
  };
  case: CaseMessages;
};

export const messagesEn: Messages = {
  nav: {
    brandDesktop: "LEONID PETROV / SENIOR FRONTEND ENGINEER",
    brandMobile: "LEONID / FE",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    quality: "Quality",
    contact: "Contact",
    menu: "MENU",
    openMenuAria: "Open navigation menu",
    mainAria: "Main navigation",
    langSwitchAria: "Switch language",
  },
  hero: {
    kicker: "01. FRONTEND ARCHITECTURE & DELIVERY",
    titleLine1: "Senior Frontend Engineer",
    titleLine2: "for fintech & B2B product teams",
    subtitle:
      "I build React and Next.js platforms that scale: architecture, performance, accessibility, and design systems backed by measurable outcomes.",
    cta: {
      viewProjects: "View Projects",
      quality: "Engineering Quality",
      contact: "Contact",
    },
    focusAria: "Current focus",
    focusTitle: "Current Focus",
    focus: {
      item1: "Product architecture — shared UI platform, DX guardrails",
      item2: "Performance & A11y — Core Web Vitals and inclusive UX",
      item3: "Verification UX — KYC/liveness flows with high success rates",
    },
  },
  about: {
    kicker: "02. ABOUT / WHO I AM",
    title: "I build durable frontend platforms",
    subtitle:
      "5+ years building web products with measurable outcomes: faster builds, lower latency, and higher verification success.",
    p1: "I specialize in React, TypeScript, and Next.js architectures for high‑stakes products where UX stability and performance are non‑negotiable.",
    p2: "In fintech and B2B teams, I ship end‑to‑end flows (WebView, KYC, admin tools), build UI platforms, and turn requirements into reusable system patterns.",
    p3: "I mentor engineers, lead architecture reviews, and keep delivery predictable through testing strategy and performance budgets.",
    focusAria: "Areas of focus",
    focusTitle: "Areas of Focus",
    focus: {
      a1: "Architecture & DX",
      a2: "Performance & Accessibility",
      a3: "Design Systems",
      a4: "Mentoring & Technical Leadership",
    },
  },
  projects: {
    caseCta: "Case Study →",
    filters: {
      all: "All",
      react: "React",
      next: "Next.js",
      performance: "Performance",
      a11y: "A11y",
      designSystems: "Design Systems",
    },
    empty: "No projects for the selected filter yet.",
  },
  contact: {
    kicker: "07. CONTACT / CTA",
    title: "Let's work together",
    subtitle: "Tell me about your product and where frontend quality can unlock business impact.",
    lead: "Open for senior frontend roles, platform architecture, and performance audits.",
    link: {
      email: "Email",
      telegram: "Telegram",
      github: "GitHub",
    },
    downloadCv: "Download CV",
    formTitle: "Send a Message",
    nameLabel: "Your Name",
    namePlaceholder: "Your name",
    emailLabel: "Your Email",
    emailPlaceholder: "name@company.com",
    submit: "Send Message",
    sent: "Message sent. I’ll reply as soon as possible.",
  },
  cookies: {
    regionAria: "Cookie consent",
    message: "Cookies are used for analytics. You can accept or reject non-essential cookies.",
    reject: "Reject",
    accept: "Accept",
  },
  legal: {
    block: {
      privacy: {
        title: "Privacy Policy",
        desc: "Describes what personal data is collected, lawful basis, retention period, third-party processors, and user rights under applicable law.",
      },
      consent: {
        title: "Personal Data Processing Consent",
        desc: "Standalone consent text for submitting contact details, with explicit acceptance, processing purpose, and withdrawal instructions.",
      },
      cookies: {
        title: "Cookie Policy",
        desc: "Explains cookie categories, analytics usage, consent options, and controls for opting out.",
      },
    },
    noticeAria: "Legal notice",
    note: "Recommended implementation: visible cookie banner + checkbox consent in contact form.",
  },
  case: {
    heroMeta: "Role: Senior Frontend Engineer · Duration: 8 months · Team: 6 engineers · Year: {year}",
    tldr: "TL;DR:",
    archBtn: "Architecture",
    aria: {
      metrics: "Key metrics",
      overviewContext: "Overview and context",
      architecture: "Architecture",
      highlights: "Implementation highlights",
      results: "Results and lessons",
      stackLinks: "Stack and links",
    },
    overview: {
      title: "Overview",
      body: "The product enabled distributed teams to edit and review complex documents in real time. Existing architecture could not guarantee consistency under unstable network conditions.",
    },
    context: {
      title: "Context & Problem",
      body: "Business needed enterprise-scale collaboration with strict auditability. Legacy OT approach produced merge conflicts and support load spikes during peak usage.",
    },
    archGrid: {
      client: { title: "Client", desc: "Next.js App Router + local CRDT store" },
      sync: { title: "Sync Layer", desc: "WebSocket gateway + conflict resolution workers" },
      platform: { title: "Platform", desc: "Audit stream + analytics + Sentry traces" },
    },
    highlightsTitle: "Implementation Highlights",
    resultsTitle: "Results & Lessons",
    stackTitle: "Stack & Links",
  },
};

export const messagesRu: Messages = {
  nav: {
    brandDesktop: "ЛЕОНИД ПЕТРОВ / SENIOR FRONTEND‑ИНЖЕНЕР",
    brandMobile: "ЛЕОНИД / FE",
    about: "Обо мне",
    experience: "Опыт",
    projects: "Проекты",
    quality: "Качество",
    contact: "Контакты",
    menu: "МЕНЮ",
    openMenuAria: "Открыть меню навигации",
    mainAria: "Основная навигация",
    langSwitchAria: "Переключить язык",
  },
  hero: {
    kicker: "01. FRONTEND АРХИТЕКТУРА И ПОСТАВКА",
    titleLine1: "Senior Frontend‑инженер",
    titleLine2: "для финтеха и B2B продуктовых команд",
    subtitle:
      "Строю масштабируемые платформы на React и Next.js: архитектура, производительность, доступность и дизайн‑системы с измеримым результатом.",
    cta: {
      viewProjects: "Смотреть проекты",
      quality: "Качество инженерии",
      contact: "Контакты",
    },
    focusAria: "Текущий фокус",
    focusTitle: "Текущий фокус",
    focus: {
      item1: "Архитектура продукта — общая UI‑платформа, DX‑гейты",
      item2: "Производительность и A11y — Core Web Vitals и инклюзивный UX",
      item3: "UX верификации — KYC/liveness‑флоу с высокой успешностью",
    },
  },
  about: {
    kicker: "02. ОБО МНЕ / КТО Я",
    title: "Строю устойчивые frontend‑платформы",
    subtitle:
      "5+ лет в веб‑продуктах с измеримым результатом: быстрее сборки, ниже задержки, выше успешность верификации.",
    p1: "Специализируюсь на архитектуре React/TypeScript/Next.js для продуктов, где стабильность UX и производительность — обязательные требования.",
    p2: "В финтехе и B2B я поставляю end‑to‑end флоу (WebView, KYC, админки), строю UI‑платформы и превращаю требования в переиспользуемые системные паттерны.",
    p3: "Менторю инженеров, веду архитектурные ревью и делаю поставку предсказуемой через стратегию тестирования и бюджеты производительности.",
    focusAria: "Ключевые направления",
    focusTitle: "Ключевые направления",
    focus: {
      a1: "Архитектура и DX",
      a2: "Производительность и доступность",
      a3: "Дизайн‑системы",
      a4: "Менторинг и техлидство",
    },
  },
  projects: {
    caseCta: "Кейс →",
    filters: {
      all: "Все",
      react: "React",
      next: "Next.js",
      performance: "Производительность",
      a11y: "Доступность",
      designSystems: "Дизайн‑системы",
    },
    empty: "Для выбранного фильтра пока нет проектов.",
  },
  contact: {
    kicker: "07. КОНТАКТЫ / CTA",
    title: "Давайте поработаем вместе",
    subtitle: "Расскажите о продукте и о том, где качество фронтенда может дать бизнес‑эффект.",
    lead: "Открыт к senior frontend ролям, архитектуре платформ и аудитам производительности.",
    link: {
      email: "Почта",
      telegram: "Telegram",
      github: "GitHub",
    },
    downloadCv: "Скачать CV",
    formTitle: "Отправить сообщение",
    nameLabel: "Ваше имя",
    namePlaceholder: "Ваше имя",
    emailLabel: "Ваш email",
    emailPlaceholder: "name@company.com",
    submit: "Отправить",
    sent: "Сообщение отправлено. Отвечу как можно скорее.",
  },
  cookies: {
    regionAria: "Согласие на cookies",
    message: "Мы используем cookies для аналитики. Можно принять или отклонить необязательные cookies.",
    reject: "Отклонить",
    accept: "Принять",
  },
  legal: {
    block: {
      privacy: {
        title: "Политика конфиденциальности",
        desc: "Описывает, какие персональные данные собираются, правовое основание, срок хранения, третьих лиц‑обработчиков и права пользователя по применимому праву.",
      },
      consent: {
        title: "Согласие на обработку персональных данных",
        desc: "Отдельный текст согласия на отправку контактных данных: явное принятие, цель обработки и инструкция по отзыву согласия.",
      },
      cookies: {
        title: "Политика использования cookies",
        desc: "Объясняет категории cookies, использование аналитики, варианты согласия и способы отключения.",
      },
    },
    noticeAria: "Юридическое уведомление",
    note: "Рекомендуемая реализация: заметный cookie‑баннер + чекбокс согласия в форме контакта.",
  },
  case: {
    heroMeta: "Роль: Senior Frontend Engineer · Длительность: 8 месяцев · Команда: 6 инженеров · Год: {year}",
    tldr: "Коротко:",
    archBtn: "Архитектура",
    aria: {
      metrics: "Ключевые метрики",
      overviewContext: "Обзор и контекст",
      architecture: "Архитектура",
      highlights: "Ключевые детали реализации",
      results: "Результаты и выводы",
      stackLinks: "Стек и ссылки",
    },
    overview: {
      title: "Обзор",
      body: "Продукт позволял распределённым командам редактировать и ревьюить сложные документы в реальном времени. Текущая архитектура не гарантировала согласованность при нестабильной сети.",
    },
    context: {
      title: "Контекст и проблема",
      body: "Бизнесу нужна была collaboration‑система enterprise‑уровня со строгой аудитируемостью. Старый OT‑подход приводил к конфликтам мержа и всплескам нагрузки на поддержку в пиковые часы.",
    },
    archGrid: {
      client: { title: "Клиент", desc: "Next.js App Router + локальное CRDT‑хранилище" },
      sync: { title: "Слой синхронизации", desc: "WebSocket‑шлюз + воркеры разрешения конфликтов" },
      platform: { title: "Платформа", desc: "Аудит‑стрим + аналитика + трейсы Sentry" },
    },
    highlightsTitle: "Детали реализации",
    resultsTitle: "Результаты и выводы",
    stackTitle: "Стек и ссылки",
  },
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getMessages(locale: Locale): Messages {
  const primary = locale === "ru" ? messagesRu : messagesEn;
  const fallback = messagesEn;

  const merge = (a: unknown, b: unknown): unknown => {
    if (a === undefined) return b;
    if (typeof a === "string") return a;
    if (isPlainObject(a) && isPlainObject(b)) {
      const keys = new Set([...Object.keys(b), ...Object.keys(a)]);
      return Array.from(keys).reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = merge(a[key], b[key]);
        return acc;
      }, {});
    }
    return a;
  };

  return merge(primary, fallback) as Messages;
}

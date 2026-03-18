## 1. Цель проекта

Создать персональный сайт‑портфолио для **Senior Frontend Engineer**, который:

- Быстро объясняет рекрутёру/тимлиду, кто ты и чем полезен.
- Глубоко показывает инженерную экспертизу (архитектура, performance, accessibility, DX).
- Визуально и UX‑но опирается на референсы: **Brittany Chiang, Sara Soueidan, Adam Hartwig**.[1][2][3]
- Может масштабироваться: кейс‑стади, блог, playground, мультиязычность.

***

## 2. Основные референсы (для агента)

Агент должен проанализировать эти сайты/страницы перед планированием:

- Brittany Chiang — структура и общая архитектура портфолио  
  https://brittanychiang.com[1]
  Обзор: https://onepagelove.com/brittany-chiang[4]
  Кодовые клоны: https://github.com/ishwarjagdale/portfolio[5]
- Sara Soueidan — инженерный фокус, контент, клиенты  
  https://www.sarasoueidan.com[2]
- Adam Hartwig — playful UI и микроанимации  
  https://www.adamhartwig.co.uk[3]
  Разбор: https://www.creativebloq.com/web-design/web-design-project-day-adam-hartwig-9134340[6]
- SynthWave '84 - VS Code theme - цветовая схемма
  https://github.com/robb0wen/synthwave-vscode
- Tamagui - A powerful style system
  https://tamagui.dev/docs/intro/introduction

Дополнительные обзоры с этими примерами:

- https://www.wearedevelopers.com/en/magazine/161/web-developer-portfolio-examples[7][1]
- https://www.twine.net/blog/best-web-developer-portfolio-examples/[8]

***

## 3. Стек и технические требования

Агент должен спланировать проект на:

- **Next.js 14+ (App Router) + TypeScript.**
- **Tamagui** дизайн система 
- **Motion (Framer Motion / Motion.dev)** для анимаций.[13][14]
- Опционально: **React Three Fiber / Three.js** для playground‑страницы.[15][16][17]
- Деплой: **Vercel** (для теста) + Dockerfile для self‑host (на cвой VPS через Dokploy).

Нефункциональные требования:

- Lighthouse ≥ 90 по Performance/Accessibility/Best Practices.
- SEO‑friendly (Next Metadata API, OpenGraph, schema.org `Person`/`WebSite`).
- Чистый DX: ESLint, Prettier, Husky, базовые тесты (Vitest/Playwright).

***

## 4. Структура роутов и страниц

Минимальный набор:

- `/` — главная (одностраничный лендинг а‑ля Brittany, но с блоками Sara и анимациями Adam).[2][3][1]
- `/projects` — полный список проектов (это будут пет проекты для портфолио)
- `/projects/[slug]` — детальный кейс‑стади проекта.
- `/about` (может быть объединена с `/` в виде секции).
- `/api/contact` — обработка контактной формы.

Поддержка RU/EN: либо `(ru)/(en)` сегменты, либо next‑intl.

Дополнительно: Обязательные по российскому законодательству документы для обработки персональных данных (тк мы предлагаем пользователю оставить данные для контакта) + согласие на использование cookies

***

## 5. Иерархия и содержимое секций главной страницы

Агент должен заложить в дизайн такие секции (в порядке):

1. **Hero**  
   Референс: Brittany intro + Sara intro.[18][4][1][2]
   Содержимое:
   - Имя, роль «Senior Frontend Engineer».
   - Краткое описание: специализация (React, TS, Next.js, architecture, performance, accessibility).
   - CTA: `View Projects`, `Engineering Quality`, `Contact`.
   - Краткий стек/домены.

2. **About / Who I am**  
   Рефы: Brittany About/Experience, тон Sara.[1][2]
   - 2–3 абзаца о тебе, доменах, подходе.
   - Список «areas of focus»: Architecture & DX, Performance & Accessibility, Design Systems, Mentoring.

3. **Experience / Work History**  
   Реф: timeline Brittany.[18][1]
   - Лента компаний, ролей, дат.
   - 2–4 достижения/метрики на каждую роль.

4. **Selected Projects**  
   Реф: Brittany projects layout, depth как у Sara кейсов, микроанимации как у Adam.[3][6][1][2]
   - 4–8 избранных проектов.
   - Для каждой карточки:
     - Название, краткий description, стек.
     - Буллеты: проблема → решение → результат.
     - Линки: `Case Study`, `Live/GitHub`.

5. **Engineering Quality (Performance / Accessibility / DX)**  
   Реф: фокус Sara на a11y/perf.[19][20][2]
   - Текст о подходе.
   - 2–3 мини‑кейса: до/после, конкретные метрики.
   - Упоминание инструментов (Lighthouse, Sentry, tests, CI/CD).

6. **Content / Writing / Speaking**  
   Реф: блог/ресурсы Sara.[2]
   - Карточки статей, докладов, подкастов (если есть).
   - Если нет контента — roadmap.

7. **Contact / CTA**  
   Реф: финальный блок Brittany + playful‑подход Adam.[6][3][1]
   - Краткий текст «Let’s work together».
   - Контакты: email, Telegram, GitHub, LinkedIn.
   - Форма с отправкой на `/api/contact`.
   - Кнопка `Download CV`.

***

## 6. Детальные кейсы проектов `/projects/[slug]`

Агент должен заложить шаблон страницы проекта:

- Overview: контекст, роль, TL;DR результата.
- Context & Problem: бизнес‑контекст, ограничения.
- Architecture: диаграммы, слои, микрофронты, решения.
- Implementation Highlights: 3–5 ключевых технических моментов.
- Results: метрики до/после, уроки.
- Stack & Links.

Формат вдохновлён структурой кейсов и статей из SkyPro/Habr/Hostinger и общим стилем Sara.[21][22][23][2]

***

## 7. UX‑и визуальные принципы для агента

1. **Базовый стиль**  
   - Каркас: минимализм и читаемость как у Brittany.[4][1]
   - Цвета/типографика: спокойные, контрастные.

2. **Инженерный слой**  
   - Ясное подчёркивание компетенций и процессов как у Sara: a11y, perf, контент.[2]

3. **Playful‑слой**  
   - Микроанимации, hover‑эффекты, слегка «игровой» вайб, но не мешающий чтению — как у Adam.[3][6]
   - Использовать Motion для появления секций, карточек, навигации.[14]

***

## 8. Структура кода и данных (задача для агента)

Агенту нужно:

- Спроектировать типы/схемы данных:
  - `Project` (со всеми полями для карточек и кейса).
  - `Experience`, `Talk`, `Article`.
- Хранить контент в JSON/TS или MDX (как в современных Next‑шаблонах).[10][11][12][9]
- Разбить UI на переиспользуемые компоненты:
  - `Hero`, `Section`, `ProjectCard`, `Timeline`, `ContentGrid`, `ContactForm` и т.д.

***

## 9. План действий для агента (high‑level)

1. Разобрать указанные референсы (структура, layout, анимации).[1][3][2]
2. Спроектировать информационную архитектуру по секциям из п.5.
3. Спроектировать схему данных (TS types / content‑модели).
4. Настроить Next.js проект со стеком (Tailwind, Motion, i18n, ESLint/Prettier).
5. Реализовать каркас страниц и секций без «реального» контента.
6. Подключить данные (mock JSON/MDX), убедиться, что всё собирается.
7. Добавить анимации, переходы, микро‑интеракции в духе Adam.
8. Настроить performance/SEO (Lighthouse, метаданные).
9. Подготовить инструкцию, куда и как подставлять реальные данные (проекты, опыт, статьи).

Sources
[1] Brittany Chiang https://brittanychiang.com
[2] Sara Soueidan https://www.sarasoueidan.com
[3] Adam Hartwig https://www.adamhartwig.co.uk
[4] Brittany Chiang - One Page Website Award https://onepagelove.com/brittany-chiang
[5] my portfolio. Design by Brittany Chiang @bchiang7 - GitHub https://github.com/ishwarjagdale/portfolio
[6] Web design project of the day: Adam Hartwig portfolio | Creative Bloq https://www.creativebloq.com/web-design/web-design-project-day-adam-hartwig-9134340
[7] Web Developer Portfolio Inspiration and Examples - March 2025 https://www.wearedevelopers.com/en/magazine/561/web-developer-portfolio-inspiration-and-examples-march-2025-561
[8] 9 Best Web Developer Portfolio Examples (and What Makes ... - Twine https://www.twine.net/blog/best-web-developer-portfolio-examples/
[9] namanbarkiya/minimal-next-portfolio https://github.com/namanbarkiya/minimal-next-portfolio
[10] Open source Next.js Developer Portfolio Template [Modern + ... https://dev.to/abdulbasit313/open-source-nextjs-developer-portfolio-template-modern-responsive-42cj
[11] Next.js Portfolio Template for Frontend Developers - ToLearn Blog https://tolearn.blog/templates/nextjs/frontend-developer
[12] Next.js Portfolio Templates: Minimalist, Creative, & More https://nextjstemplates.com/portfolio
[13] GitHub - ikramdeveloper/animated-portfolio-framer-motion: Animated portfolio website using NextJS and Framer Motion https://github.com/ikramdeveloper/animated-portfolio-framer-motion
[14] Official Motion Examples | React, JS & Vue Animations https://motion.dev/examples
[15] Six Stunning Web Developer Portfolios Showcasing Three.js Mastery https://dev.to/hr21don/six-stunning-web-developer-portfolios-showcasing-threejs-mastery-206n
[16] Best Three.js Portfolio Examples (2025) | CreativeDevJobs Blog https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025
[17] My Personal Portfolio Website | 3D Room - Showcase - three.js forum https://discourse.threejs.org/t/my-personal-portfolio-website-3d-room/63822
[18] Brittany Chiang - Unmatched Style https://unmatchedstyle.com/gallery/brittany-chiang.php
[19] Workshop Accessible UI Patterns by Sara Soueidan - Frozen Rockets https://academy.frozenrockets.nl/workshop/accessible-ui-patterns-10-june
[20] Spotlight: Sara Soueidan - Responsive Web Design https://responsivewebdesign.com/podcast/sara-soueidan/
[21] 15 проектов для портфолио frontend-разработчика https://sky.pro/wiki/javascript/luchshie-proekty-dlya-portfolio-na-frontend-i-javascript/
[22] Как я придумал 20 проектов и собрал портфолио https://habr.com/ru/companies/yandex_praktikum/articles/755512/
[23] 25 web developer portfolio examples from top developers - Hostinger https://www.hostinger.com/tutorials/web-developer-portfolio

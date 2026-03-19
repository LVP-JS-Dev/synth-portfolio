# Git-Based Headless CMS Evaluation for Next.js 16 (2026)

This report evaluates the top Git-based headless CMS options for a Next.js 16 (App Router, TypeScript) project hosted on GitHub. 

## 1. Keystatic (Recommended for Developer Experience)
Keystatic (by Thinkmill) has emerged as the premier local-first, Git-backed CMS specifically optimized for modern Next.js architectures.

*   **Architecture Model:** Local-first. Runs entirely inside your Next.js app as a Route Handler (`/keystatic`). No external database required.
*   **GitHub Workflow:** "GitHub Mode" connects directly to the GitHub API. Edits are committed directly to the repository. Supports branch-based workflows.
*   **Next.js App Router Compatibility:** Native and seamless. Fully supports Next.js 16 App Router and React 19 Server Components.
*   **Self-hosted vs SaaS:** Fully self-hosted (runs in your app). Optional "Keystatic Cloud" SaaS available to bypass GitHub OAuth rate limits for larger teams.
*   **Pricing Model:** 100% Free and Open Source. Keystatic Cloud has paid tiers for enterprise team management.
*   **Editorial UX Quality:** Excellent. Features a clean, Notion-like block editor. Uses Markdoc for structured rich text.
*   **i18n Support:** Handled structurally (via nested folders or filename suffixes). No native UI magic for side-by-side translation yet.
*   **Media Handling:** Commits media directly to Git (public folder) or integrates with external storage.
*   **Preview Workflow:** Integrates natively with Next.js Draft Mode for real-time previews.
*   **Operational Risks:** Large media files can bloat the Git repository over time.
*   **Vendor Lock-in Risk:** Zero. Content is stored as pure YAML, JSON, MDX, or Markdoc.
*   **Migration Effort:** Very low. You simply map your existing folder structure in `keystatic.config.ts`.
*   **Official Docs:** [keystatic.com/docs/installation-next-js](https://keystatic.com/docs/installation-next-js)

## 2. TinaCMS (Recommended for Visual Editing)
TinaCMS provides the best balance between Git-backed content and a premium visual editing experience (often referred to as "Vibe Coding" in their 2026 marketing).

*   **Architecture Model:** Git-backed, but requires a GraphQL API layer (DataLayer) to power the visual editor and search.
*   **GitHub Workflow:** Two-way sync. Commits to Git, but editors interact with the Tina interface which pushes commits.
*   **Next.js App Router Compatibility:** Fully supported. Uses a `tina/` folder for configuration and generates typed GraphQL queries for Server Components.
*   **Self-hosted vs SaaS:** Both. You can use TinaCloud (SaaS) or self-host the DataLayer using Node.js and Vercel KV/Redis.
*   **Pricing Model:** Free tier available on TinaCloud. Self-hosted is free.
*   **Editorial UX Quality:** Premium. Offers contextual overlays and real-time visual editing directly on the page.
*   **i18n Support:** Supported via document structure or field-level localization.
*   **Media Handling:** Supports Git-based media, Cloudinary, and AWS S3.
*   **Preview Workflow:** The visual editor *is* the preview. Changes reflect instantly before committing.
*   **Operational Risks:** Higher architectural complexity. You are maintaining a GraphQL backend (or relying on TinaCloud) even though Git is the source of truth.
*   **Vendor Lock-in Risk:** Medium. While content is Markdown/JSON, your React components become heavily coupled to Tina's `useTina` hooks and `tinaField` attributes.
*   **Migration Effort:** Medium. Requires wrapping existing components with Tina's visual editing hooks.
*   **Official Docs:** [tina.io/docs/frameworks/next/app-router](https://tina.io/docs/frameworks/next/app-router)

## 3. CloudCannon (Recommended for Enterprise/Marketing Teams)
CloudCannon is a commercial Git CMS that focuses heavily on empowering non-technical marketing teams without breaking developer workflows.

*   **Architecture Model:** SaaS Git CMS. It reads your repository, builds the site in their container (or syncs with Vercel), and provides an editing overlay.
*   **GitHub Workflow:** Robust two-way Git sync. Excellent support for branching, staging, and merging workflows directly from the CMS UI.
*   **Next.js App Router Compatibility:** Fully supported. You build React components, and CloudCannon maps them to drag-and-drop blocks.
*   **Self-hosted vs SaaS:** SaaS only.
*   **Pricing Model:** Standard ($49/mo), Team ($300/mo), Enterprise.
*   **Editorial UX Quality:** Enterprise-grade. Drag-and-drop page building using your custom Next.js components.
*   **i18n Support:** Strong native support for multilingual sites.
*   **Media Handling:** Integrates with enterprise DAMs (Cloudinary, Tenovos) or Git.
*   **Preview Workflow:** Live visual editing and dedicated staging environments.
*   **Operational Risks:** Dependency on a paid SaaS platform.
*   **Vendor Lock-in Risk:** Low for content (standard Markdown/HTML), Medium for visual editing configuration (CloudCannon specific config files).
*   **Migration Effort:** Medium. Requires adding CloudCannon configuration files and mapping components.
*   **Official Docs:** [cloudcannon.com/documentation/guides/nextjs-starter-guide](https://cloudcannon.com/documentation/guides/nextjs-starter-guide)

## 4. Pages CMS (Recommended for Simplicity)
Pages CMS is the modern, no-hassle successor to the aging Decap CMS (Netlify CMS).

*   **Architecture Model:** Pure GitHub API client. It is a web app that authenticates with GitHub and edits files directly. No backend required.
*   **GitHub Workflow:** Direct commits to the configured branches via GitHub API.
*   **Next.js App Router Compatibility:** Framework agnostic. It doesn't care about your router, it only cares about your Markdown/JSON files.
*   **Self-hosted vs SaaS:** Can be used via their SaaS (pagescms.org) or self-hosted easily.
*   **Pricing Model:** 100% Free and Open Source.
*   **Editorial UX Quality:** Basic, clean, form-based. No visual live preview.
*   **i18n Support:** Manual (configured via folder structures in `pages.yml`).
*   **Media Handling:** Commits directly to Git.
*   **Preview Workflow:** Relies entirely on your CI/CD (e.g., Vercel Preview Deployments). No instant preview in the CMS.
*   **Operational Risks:** Very basic feature set. Lacks advanced relational data modeling.
*   **Vendor Lock-in Risk:** Zero.
*   **Migration Effort:** Near zero. Just add a `pages.yml` configuration file to your repo root.
*   **Official Docs:** [pagescms.org/docs](https://pagescms.org/docs)

## 5. Outstatic (Notable Next.js Alternative)
A Next.js-specific CMS that sits between Keystatic and Pages CMS in terms of functionality.

*   **Architecture Model:** Runs inside your Next.js app via Route Handlers. Uses GitHub API for storage.
*   **GitHub Workflow:** Commits directly to the repository.
*   **Next.js App Router Compatibility:** Native support.
*   **Self-hosted vs SaaS:** Self-hosted (runs in your app).
*   **Pricing Model:** Free and Open Source.
*   **Editorial UX Quality:** Clean, Notion-like interface.
*   **Vendor Lock-in Risk:** Zero.
*   **Migration Effort:** Low.
*   **Official Docs:** [outstatic.com](https://outstatic.com)

---

## Summary & Next.js 16 Caveats
*   **Next.js 16 / React 19:** Ensure you are using the latest versions of these CMS packages. Next.js 16 introduced stricter caching and Server Component behaviors. Keystatic and TinaCMS have actively updated their App Router integrations to support Next.js 16's dynamic API changes (like `draftMode()`).
*   **If you want zero lock-in and a great developer experience:** Choose **Keystatic**.
*   **If your marketing team demands visual drag-and-drop editing:** Choose **TinaCMS** (if on a budget) or **CloudCannon** (if you have budget).
*   **If you want the absolute simplest setup with zero app integration:** Choose **Pages CMS**.
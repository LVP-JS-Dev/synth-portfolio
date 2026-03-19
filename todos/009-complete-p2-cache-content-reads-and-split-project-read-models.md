---
status: complete
priority: p2
issue_id: "009"
tags: [code-review, performance, architecture, nextjs]
dependencies: []
---

# Cache content reads and split project read models

## Problem Statement

Current route implementations read content multiple times per request/render path (metadata + page), and `getAllProjects()` returns broader data than needed for some use-cases. This increases I/O and allocation costs as content volume grows.

## Findings

- Duplicate reads observed in:
  - `app/page.tsx` (`generateMetadata` + page render)
  - `app/legal/page.tsx`
  - `app/projects/page.tsx`
  - `app/projects/[slug]/page.tsx`
- `lib/content.ts:getAllProjects()` maps full records even for `generateStaticParams` slug-only path.
- `performance-oracle` recommends cache/memoization and narrower read APIs.

## Proposed Solutions

### Option 1: Use React cache + narrow read functions (recommended)

**Approach:** Wrap read functions with `cache()` and introduce `getProjectSlugs()` for static params, keeping detail readers separate.

**Pros:**
- Small targeted diff
- Immediate runtime/build efficiency gains

**Cons:**
- Requires careful function boundary choices

**Effort:** 2-3 hours

**Risk:** Low

---

### Option 2: Route-level caching directives only

**Approach:** Use Next route caching hints without restructuring reader API.

**Pros:**
- Minimal code change

**Cons:**
- Does not remove duplicated application-level work

**Effort:** 1-2 hours

**Risk:** Medium

---

### Option 3: Keep as-is until larger content scale

**Approach:** Defer optimization and monitor.

**Pros:**
- No immediate engineering cost

**Cons:**
- Known inefficiency persists
- Harder cleanup later

**Effort:** 0

**Risk:** Medium

## Recommended Action

**Option 1 selected.** Added `getProjectSlugs()` backed by `reader.collections.projects.list()` with `cache()` wrapping. `generateStaticParams` now uses this lightweight reader instead of `getAllProjects()`.

## Technical Details

**Affected files:**
- `lib/content.ts`
- `app/page.tsx`
- `app/legal/page.tsx`
- `app/projects/page.tsx`
- `app/projects/[slug]/page.tsx`

## Resources

- PR: https://github.com/LVP-JS-Dev/synth-portfolio/pull/6

## Acceptance Criteria

- [x] Metadata and page rendering reuse cached reads where possible.
- [x] `generateStaticParams` uses a slug-focused reader function.
- [x] No behavior regressions in content rendering.
- [x] Build/test/lint/typecheck stay green.

## Work Log

### 2026-03-19 - Initial discovery from multi-agent review

**By:** Claude Code

**Actions:**
- Aggregated perf findings and validated duplicate reads in route files.
- Confirmed broad read model usage in `getAllProjects()`.

**Learnings:**
- Even file-based content benefits from read-model specialization in App Router.

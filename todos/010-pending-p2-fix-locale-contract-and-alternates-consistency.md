---
status: pending
priority: p2
issue_id: "010"
tags: [code-review, architecture, i18n, seo, quality]
dependencies: []
---

# Fix locale contract and alternates consistency

## Problem Statement

The app currently renders EN content while metadata alternates publish RU links as if RU content were fully served. This creates locale/SEO contract inconsistency and increases future i18n refactor cost.

## Findings

- Route calls are hardcoded to EN in content access (`"en"` in page and metadata functions).
- `lib/metadata.ts` always emits `alternates.languages.ru`, regardless of actual locale routing/content delivery.
- `architecture-strategist` and `data-integrity-guardian` flagged this as i18n correctness debt.

## Proposed Solutions

### Option 1: Keep EN-only now and limit alternates accordingly (recommended short-term)

**Approach:** Publish only locales that are actually served, remove RU alternate until locale routing is implemented.

**Pros:**
- Correct SEO semantics now
- Minimal implementation effort

**Cons:**
- RU discoverability deferred

**Effort:** 1-2 hours

**Risk:** Low

---

### Option 2: Implement full locale routing and locale-aware readers now

**Approach:** Add locale segment/host mapping and propagate locale through reader APIs and pages.

**Pros:**
- Complete i18n correctness
- Strong long-term foundation

**Cons:**
- Larger scope and testing surface

**Effort:** 1-2 days

**Risk:** Medium

---

### Option 3: Feature-flag RU alternates

**Approach:** Keep code paths but gate RU alternates by env/config until rollout.

**Pros:**
- Controlled rollout

**Cons:**
- Adds configuration complexity

**Effort:** 2-4 hours

**Risk:** Medium

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `lib/metadata.ts`
- `app/page.tsx`
- `app/projects/page.tsx`
- `app/projects/[slug]/page.tsx`
- `app/legal/page.tsx`
- optional i18n routing files

## Resources

- PR: https://github.com/LVP-JS-Dev/synth-portfolio/pull/6

## Acceptance Criteria

- [ ] Alternate language links match actually served locales/routes.
- [ ] Locale passed to content readers is consistent with route/host strategy.
- [ ] No metadata regressions for EN canonical URLs.
- [ ] Tests cover locale metadata behavior.

## Work Log

### 2026-03-19 - Initial discovery from multi-agent review

**By:** Claude Code

**Actions:**
- Consolidated i18n/SEO findings from architecture + data-integrity reviews.
- Verified hardcoded EN calls in route files and unconditional RU alternates in metadata.

**Learnings:**
- i18n correctness should be explicit: either fully shipped or not advertised in alternates.

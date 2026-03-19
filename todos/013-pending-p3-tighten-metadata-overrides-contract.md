---
status: pending
priority: p3
issue_id: "013"
tags: [code-review, typescript, quality, metadata]
dependencies: []
---

# Tighten metadata overrides contract

## Problem Statement

`buildMetadata` currently always emits `title`/`description` keys even when override values are `undefined`, which is less explicit and can produce less predictable metadata merge behavior.

## Findings

- `lib/metadata.ts:19-22` sets:
  - `title: overrides?.title`
  - `description: overrides?.description`
- Type review suggested emitting these keys conditionally when values are present.

## Proposed Solutions

### Option 1: Conditional property inclusion (recommended)

**Approach:** Include `title` and `description` only when defined.

**Pros:**
- Cleaner metadata object contract
- Easier to reason about inheritance/merge

**Cons:**
- Very small refactor with no functional change

**Effort:** <1 hour

**Risk:** Low

---

### Option 2: Keep as-is and document behavior

**Approach:** Leave implementation unchanged, add comment/tests for expected merge behavior.

**Pros:**
- No code change

**Cons:**
- Keeps implicit contract

**Effort:** <1 hour

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `lib/metadata.ts`
- `lib/metadata.test.ts`

## Resources

- PR: https://github.com/LVP-JS-Dev/synth-portfolio/pull/6

## Acceptance Criteria

- [ ] `title`/`description` are only present in metadata when provided.
- [ ] Tests cover override-present and override-absent paths.
- [ ] Existing canonical/hreflang behavior remains unchanged.

## Work Log

### 2026-03-19 - Initial discovery from TS review

**By:** Claude Code

**Actions:**
- Captured metadata contract hygiene finding from TypeScript-focused review.
- Verified exact location in `lib/metadata.ts`.

**Learnings:**
- Explicit metadata contracts reduce ambiguity in App Router head generation.

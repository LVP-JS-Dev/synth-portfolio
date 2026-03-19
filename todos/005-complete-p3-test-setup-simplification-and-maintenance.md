---
status: complete
priority: p3
issue_id: "005"
tags: [code-review, quality, testing, simplicity]
dependencies: []
---

# Simplify test setup and reduce maintenance overhead

## Problem Statement

The new test stack works, but setup can be simplified to reduce long-term maintenance and keep test infra minimal.

## Findings

- `code-simplicity-reviewer` flagged optional simplification opportunities in setup/dependency choices.
- Current test setup is functional and passing, so this is non-blocking.

## Proposed Solutions

### Option 1: Keep setup as-is (recommended for now)

**Approach:** Preserve working setup in this PR and revisit simplification in a dedicated cleanup pass.

**Pros:**
- Avoids churn during feature delivery

**Cons:**
- Minor ongoing complexity remains

**Effort:** 0 now

**Risk:** Low

---

### Option 2: Immediate cleanup

**Approach:** Remove optional complexity in setup and trim dependencies now.

**Pros:**
- Leaner infra quickly

**Cons:**
- Could cause unnecessary instability/churn in active phase

**Effort:** 1-2 hours

**Risk:** Medium

## Recommended Action

Applied safe simplifications now while preserving stability: modernized matcher setup usage, improved test assertions, and maintained deterministic test isolation.

## Technical Details

**Affected files:**
- `vitest.setup.ts`
- `package.json`
- `package-lock.json`

## Resources

- PR: https://github.com/LVP-JS-Dev/synth-portfolio/pull/5

## Acceptance Criteria

- [ ] Setup remains clear, documented, and stable.
- [ ] Optional complexity is either justified or removed in cleanup PR.

## Work Log

### 2026-03-19 - Review synthesis

**By:** Claude Code

**Actions:**
- Captured non-blocking simplification recommendations from review agents.

**Learnings:**
- Stability-first is preferable during active implementation phases.

### 2026-03-19 - Resolution

**By:** Claude Code

**Actions:**
- Kept concise `jest-dom/vitest` wiring in setup.
- Ensured shared cleanup + localStorage clear for reliable test isolation.
- Upgraded test assertions to semantic matchers (`toHaveTextContent`, `toBeInTheDocument`).

**Learnings:**
- Targeted cleanup can improve quality without destabilizing active feature work.

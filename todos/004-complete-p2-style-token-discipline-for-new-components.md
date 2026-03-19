---
status: complete
priority: p2
issue_id: "004"
tags: [code-review, quality, architecture, performance]
dependencies: []
---

# Enforce token discipline in new component styles

## Problem Statement

New component CSS introduced raw style literals (sizes/effects) that may drift from the token-first design policy.

## Findings

- Review agents flagged raw literals in new component style files as policy drift risk.
- Current lint rules focus on TS/TSX literals; CSS token policy is not fully enforced.

## Proposed Solutions

### Option 1: Introduce explicit style token mapping (recommended)

**Approach:** Replace raw CSS literals with defined design tokens and add lightweight checks.

**Pros:**
- Better consistency and maintainability

**Cons:**
- Small refactor in CSS modules

**Effort:** 1-2 hours

**Risk:** Low

---

### Option 2: Defer to later visual pass

**Approach:** Keep current styles and normalize during fidelity phase.

**Pros:**
- Faster now

**Cons:**
- Tech debt accumulates

**Effort:** 30 minutes now, more later

**Risk:** Medium

## Recommended Action

Implemented Option 1 in scope: normalized new component styles to tokenized spacing/size values and removed key raw literals from the PR-5 style modules.

## Technical Details

**Affected files:**
- `components/ui/Button.module.css`
- `components/layout/CookieBanner.module.css`

## Resources

- PR: https://github.com/LVP-JS-Dev/synth-portfolio/pull/5

## Acceptance Criteria

- [ ] Component CSS aligns with token-first policy.
- [ ] No unexplained raw literals remain in new style modules.

## Work Log

### 2026-03-19 - Review synthesis

**By:** Claude Code

**Actions:**
- Consolidated style-token findings from architecture/performance/simplicity review.

**Learnings:**
- CSS policy enforcement should be explicit to avoid drift over phases.

### 2026-03-19 - Resolution

**By:** Claude Code

**Actions:**
- Added `--font-size-sm` token and switched new component styles to consume it.
- Replaced raw spacing literals in `CookieBanner.module.css` with spacing tokens.
- Updated `Button.module.css` to use tokenized font size and hover media parity.

**Learnings:**
- Small token extensions are enough to keep fidelity and policy alignment without expanding scope.

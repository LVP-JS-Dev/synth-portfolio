---
status: complete
priority: p2
issue_id: "012"
tags: [code-review, operations, architecture, cms]
dependencies: ["006"]
---

# Define Keystatic production storage strategy

## Problem Statement

Keystatic is currently configured with `storage.kind = "local"`, which is acceptable for local development but can be non-persistent or unsafe in common serverless production environments.

## Findings

- `keystatic.config.ts:7-9` sets local filesystem storage.
- Research artifacts (`git-cms-nextjs16-evaluation.md`) explicitly note local-mode limitations in hosted/serverless contexts.
- No documented production strategy (GitHub mode, persistence guarantees, operational constraints) is included yet.

## Proposed Solutions

### Option 1: Keep local mode for dev only + document production constraint (recommended immediate)

**Approach:** Explicitly mark local mode as non-production, gate prod usage, and define migration path to GitHub mode.

**Pros:**
- Minimal change now
- Reduces operational ambiguity

**Cons:**
- Production editorial flow still pending

**Effort:** 1-2 hours

**Risk:** Low

---

### Option 2: Implement GitHub mode in this phase

**Approach:** Switch to GitHub storage with required app/env setup and workflow docs.

**Pros:**
- Production-ready Git-backed editing flow

**Cons:**
- More setup complexity and security review

**Effort:** 1-2 days

**Risk:** Medium

---

### Option 3: Disable hosted admin until storage strategy finalization

**Approach:** Keep CMS read path, disable admin routes in production environments.

**Pros:**
- Operational safety

**Cons:**
- No hosted editing until follow-up

**Effort:** <1 hour

**Risk:** Low

## Recommended Action

**Option 1 selected.** Local mode explicitly documented as dev-only in `keystatic.config.ts` with inline comment explaining serverless limitation and linking to GitHub mode migration docs.

## Technical Details

**Affected files:**
- `keystatic.config.ts`
- docs/handoff or README deployment section
- env example files

## Resources

- PR: https://github.com/LVP-JS-Dev/synth-portfolio/pull/6
- Research doc: `git-cms-nextjs16-evaluation.md`

## Acceptance Criteria

- [ ] Production support statement for CMS storage is documented.
- [ ] Local mode behavior and limits are explicit.
- [ ] If production editing is enabled, persistence and auth model are documented.
- [ ] Runbook for switching to GitHub mode exists.

## Work Log

### 2026-03-19 - Initial discovery from architecture/learnings review

**By:** Claude Code

**Actions:**
- Consolidated operational findings from history/learnings analysis.
- Mapped local storage mode to deployment risk scenarios.

**Learnings:**
- CMS storage mode must be treated as an operational contract, not just implementation detail.

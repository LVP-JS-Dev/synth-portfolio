---
status: complete
priority: p2
issue_id: "003"
tags: [code-review, security, operations]
dependencies: []
---

# Harden CSP policy for production rollout

## Problem Statement

Current CSP is report-only and compatibility-focused. A staged hardening plan is needed to move toward production enforcement safely.

## Findings

- `next.config.ts` currently sets `Content-Security-Policy-Report-Only`.
- `security-sentinel` recommends production-enforced policy after stabilization.
- `librarian` notes Next App Router CSP constraints and need for careful transition.

## Proposed Solutions

### Option 1: Two-phase rollout (recommended)

**Approach:** Keep report-only now; collect violations; then introduce enforced CSP with approved allowlist and fallback plan.

**Pros:**
- Lower breakage risk
- Observable migration

**Cons:**
- Requires follow-up operational step

**Effort:** 2-3 hours

**Risk:** Low

---

### Option 2: Enforce immediately

**Approach:** Switch to enforced CSP in current PR.

**Pros:**
- Faster hardening

**Cons:**
- High breakage risk without violation baseline

**Effort:** 1-2 hours

**Risk:** High

## Recommended Action

Completed staged hardening for this PR: keep report-only mode while strengthening policy with `object-src 'none'` and `base-uri 'self'`, and document staged enforcement path.

## Technical Details

**Affected files:**
- `next.config.ts`

## Resources

- PR: https://github.com/LVP-JS-Dev/synth-portfolio/pull/5

## Acceptance Criteria

- [x] CSP hardening path documented with explicit stage gates.
- [x] Violation monitoring defined before enforcement.
- [x] Rollback steps for CSP enforcement documented.

### Stage Gates (Report-Only → Enforced)

1. **Gate 1 (Baseline Collection):** Run `Content-Security-Policy-Report-Only` in production for 14 days.
2. **Gate 2 (Triage & Allowlist):** Classify violations by source/path, remediate first-party issues, and approve every third-party source explicitly.
3. **Gate 3 (Go/No-Go):** Security owner + frontend owner sign off when all conditions are met:
   - no unexplained high-severity violations during the last 7 days;
   - violation rate is ≤ 0.1% of requests over the same 7-day window;
   - violation trend is stable or decreasing;
   - required third-party sources are documented in the allowlist record.
4. **Gate 4 (Enforcement Rollout):** Switch from report-only to enforced `Content-Security-Policy` in traffic stages: 10% → 50% → 100%.

### Monitoring Method

- Owner: Security (primary) + Frontend (secondary).
- Collect CSP reports via report endpoint/Sentry ingestion and aggregate by directive, route, and user agent.
- Review metrics daily during rollout; publish weekly summary in security worklog.
- Trigger alert on:
  - any new blocked first-party script/style source;
  - any spike above 0.1% violation rate over 24h;
  - any high-severity violation pattern on critical routes.

### Rollback Triggers and Actions

- Immediate rollback triggers:
  - critical user flow breakage attributable to CSP;
  - sustained violation rate > 0.1% for 24h after enforcement stage change;
  - newly introduced high-severity violations without approved mitigation.
- Rollback action:
  - revert header to `Content-Security-Policy-Report-Only` using last-known-good policy (`object-src 'none'`, `base-uri 'self'` retained);
  - notify security + frontend stakeholders and incident channel.
- Post-rollback requirement:
  - file incident follow-up with root cause, policy diff, and re-entry criteria before next enforcement attempt.

## Work Log

### 2026-03-19 - Review synthesis

**By:** Claude Code

**Actions:**
- Captured CSP recommendations from security/performance/library context.
- Normalized into staged rollout todo.

**Learnings:**
- Report-only is acceptable for this stage; enforcement must be deliberate.

### 2026-03-19 - Resolution

**By:** Claude Code

**Actions:**
- Updated `next.config.ts` CSP report-only value to include `object-src 'none'` and `base-uri 'self'`.
- Added rollout comment in config clarifying staged enforcement intent.
- Updated handoff checklist with staged CSP note.

**Learnings:**
- Progressive CSP hardening remains compatible with current App Router constraints.

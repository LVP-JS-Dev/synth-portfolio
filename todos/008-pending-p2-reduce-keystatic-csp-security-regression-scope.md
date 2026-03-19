---
status: complete
priority: p2
issue_id: "008"
tags: [code-review, security, csp, operations]
dependencies: ["006"]
---

# Reduce Keystatic CSP/security regression scope

## Problem Statement

The Keystatic route header profile currently weakens security directives compared to the app baseline (notably `unsafe-eval`, framing policy changes, and `X-Frame-Options: SAMEORIGIN`). This may be necessary for CMS functionality, but the exception scope and governance need tighter control.

## Findings

- `next.config.ts:17-25` defines `KEYSTATIC_HEADERS` with `script-src ... 'unsafe-eval'` and `frame-ancestors 'self'`.
- `next.config.ts:36-41` applies these headers broadly to `/keystatic/*` and `/api/keystatic/*`.
- Security review flagged this as a meaningful surface-area increase vs prior baseline.

## Proposed Solutions

### Option 1: Keep exceptions but minimize and document (recommended)

**Approach:** Restrict exceptions to the exact directives required by Keystatic, preserve strongest shared headers, and document justification + sunset criteria.

**Pros:**
- Preserves functionality
- Reduces risk and improves auditability

**Cons:**
- Requires iterative testing with Keystatic UI

**Effort:** 2-4 hours

**Risk:** Low

---

### Option 2: Dedicated admin subdomain with separate policy

**Approach:** Serve Keystatic on isolated host with independent CSP and hardened ingress.

**Pros:**
- Strong blast-radius containment
- Cleaner policy separation

**Cons:**
- Infrastructure complexity
- Higher operational overhead

**Effort:** 1-2 days

**Risk:** Medium

---

### Option 3: Disable hosted admin entirely

**Approach:** Development-only admin; no production Keystatic routes.

**Pros:**
- Eliminates exception risk

**Cons:**
- Removes hosted editorial workflow

**Effort:** <1 hour

**Risk:** Low

## Recommended Action

**Option 1 selected.** Keystatic routes now inherit all shared SECURITY_HEADERS and only override X-Frame-Options (SAMEORIGIN) and CSP (adding unsafe-eval + blob: img-src). Rationale documented inline in `next.config.ts`.

## Technical Details

**Affected files:**
- `next.config.ts`
- security rollout docs in `todos/003-*` and/or handoff docs

## Resources

- PR: https://github.com/LVP-JS-Dev/synth-portfolio/pull/6
- CSP staging context: `todos/003-complete-p2-csp-hardening-plan-for-production.md`

## Acceptance Criteria

- [ ] Keystatic exceptions are minimized to only required directives.
- [ ] Header policy differences are documented with rationale and rollback plan.
- [ ] Security owner sign-off captured for production posture.
- [ ] Monitoring for CSP regressions includes Keystatic route segment.

## Work Log

### 2026-03-19 - Initial discovery from multi-agent review

**By:** Claude Code

**Actions:**
- Consolidated findings from `security-sentinel` + `git-history-analyzer`.
- Verified header deltas in `next.config.ts` against existing baseline posture.

**Learnings:**
- CMS admin routes usually require policy exceptions; strict scoping and documentation are mandatory.

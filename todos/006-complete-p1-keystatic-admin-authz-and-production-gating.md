---
status: complete
priority: p1
issue_id: "006"
tags: [code-review, security, authz, keystatic, operations]
dependencies: []
---

# Harden Keystatic admin authz and production gating

## Problem Statement

Keystatic admin UI/API exposure is currently controlled by environment flags only. This creates a high-impact misconfiguration path where admin routes can become available in production without explicit authentication/authorization controls.

## Findings

- `keystatic.config.ts:3-4` enables admin when `NODE_ENV=development` OR `KEYSTATIC_ENABLE_ADMIN_UI=true`.
- `app/keystatic/layout.tsx:6-10` and `app/api/keystatic/[...params]/route.ts:9-11` rely on `showAdminUI` only.
- No route-level authn/authz guard is present for `/keystatic/:path*` and `/api/keystatic/:path*`.
- `git-history-analyzer`, `security-sentinel`, and `kieran-typescript-reviewer` independently flagged this as a merge-risk pattern.

## Proposed Solutions

### Option 1: Dual-gate + explicit authz middleware (recommended)

**Approach:** Keep feature flag but require a second production-allow flag and enforce authz in middleware/route checks.

**Pros:**
- Fail-closed behavior in production
- Clear operational control and auditability
- Minimal structural change

**Cons:**
- Requires auth integration decision (session/token/basic-auth)

**Effort:** 3-6 hours

**Risk:** Medium

---

### Option 2: Development-only admin, no production enablement

**Approach:** Force `showAdminUI` to `NODE_ENV === "development"` and remove prod flag path.

**Pros:**
- Lowest risk profile
- Very small code diff

**Cons:**
- No hosted editorial workflow
- Blocks near-term non-dev content editing

**Effort:** 30-60 minutes

**Risk:** Low

---

### Option 3: Network allowlist at edge + flag gate

**Approach:** Restrict Keystatic routes by source IP/network and keep current flag behavior.

**Pros:**
- Strong perimeter control
- Works without app-level auth refactor

**Cons:**
- Operational complexity
- Brittle for distributed teams / dynamic IPs

**Effort:** 2-4 hours

**Risk:** Medium

## Recommended Action

Implemented Option 1 with a fail-closed production gate plus proxy-level HTTP Basic auth for Keystatic admin routes.

## Technical Details

**Affected files:**
- `keystatic.config.ts`
- `app/keystatic/layout.tsx`
- `app/api/keystatic/[...params]/route.ts`
- optional: `middleware.ts` (new)

## Resources

- PR: https://github.com/LVP-JS-Dev/synth-portfolio/pull/6
- Related pattern: `todos/001-complete-p1-agent-native-consent-parity-gap.md` (P1 parity/security posture precedent)

## Acceptance Criteria

- [x] Keystatic admin/API remain inaccessible by default in production.
- [x] Unauthorized access to `/keystatic/*` and `/api/keystatic/*` returns 401/403 (or 404 by design) consistently.
- [x] Authz mechanism is documented with operational runbook notes.
- [x] Regression tests or integration checks cover unauthorized/authorized paths.

## Work Log

### 2026-03-19 - Initial discovery from multi-agent review

**By:** Claude Code

**Actions:**
- Aggregated findings from `security-sentinel`, `kieran-typescript-reviewer`, and `git-history-analyzer`.
- Verified env-only gate in `keystatic.config.ts` and absence of explicit authz checks on Keystatic routes.

**Learnings:**
- Feature-flag-only admin gating is not a sufficient production control for write-capable CMS endpoints.

### 2026-03-19 - Resolution

**By:** Claude Code

**Actions:**
- Hardened `showAdminUI` in `keystatic.config.ts` to require dual production flags.
- Added `proxy.ts` guard for `/keystatic/*` and `/api/keystatic/*` with HTTP Basic auth outside development.
- Added `.env.example` entries for admin credentials and gating flags.
- Verified with `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build`.

**Learnings:**
- Combining route-level availability gates with request auth checks materially reduces misconfiguration risk.

## Notes

- This is a merge-blocking item (P1) until fail-closed behavior is guaranteed.

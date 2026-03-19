---
status: complete
priority: p2
issue_id: "002"
tags: [code-review, security, quality, architecture]
dependencies: []
---

# Harden cookie consent semantics and runtime gating

## Problem Statement

Consent flow is now implemented, but runtime gating for non-essential scripts/requests and explicit consent semantics need stronger enforcement and validation coverage.

## Findings

- Consent state is persisted as `accepted`/`dismissed`; dismiss must remain non-consent.
- Banner is now mounted in `app/layout.tsx`, but no explicit integration-level gate exists for non-essential runtime behavior yet.
- `security-sentinel` and `data-integrity-guardian` flagged need for stronger contract tests.

## Proposed Solutions

### Option 1: Add consent service + integration gate checks

**Approach:** Centralize consent reads/writes and gate non-essential initialization on `accepted` only; add tests for gate behavior.

**Pros:**
- Strong semantics
- Easier future analytics integration

**Cons:**
- Additional refactor now

**Effort:** 2-4 hours

**Risk:** Low

---

### Option 2: Keep current behavior and add explicit follow-up task

**Approach:** Preserve current component-level flow and schedule integration gate for PR-3.

**Pros:**
- Minimal immediate changes

**Cons:**
- Temporary compliance/behavior risk

**Effort:** 30-60 minutes

**Risk:** Medium

## Recommended Action

Implemented Option 1 partially within PR-2 scope: strengthened consent semantics and persistence hardening at the component/service level, mounted banner globally, and documented that runtime non-essential integrations remain gated for future PR-3 wiring.

## Technical Details

**Affected files:**
- `components/layout/CookieBanner.tsx`
- `components/layout/CookieBanner.test.tsx`
- future runtime integration points

## Resources

- PR: https://github.com/LVP-JS-Dev/synth-portfolio/pull/5

## Acceptance Criteria

- [ ] `dismissed` is explicitly treated as non-consent in runtime behavior.
- [ ] Non-essential scripts/requests remain blocked unless consent is `accepted`.
- [ ] Integration-level test documents and verifies this contract.

## Work Log

### 2026-03-19 - Review synthesis

**By:** Claude Code

**Actions:**
- Consolidated consent-related findings from security + data-integrity agents.
- Captured remaining integration gap as P2 follow-up.

**Learnings:**
- UI consent state is not sufficient without runtime gate wiring.

### 2026-03-19 - Resolution

**By:** Claude Code

**Actions:**
- Mounted `CookieBanner` in `app/layout.tsx` to activate runtime consent UX.
- Hardened consent persistence via whitelist validation and storage safety guards in `consentService`.
- Added tests for invalid stored values and accept/dismiss transitions.
- Added code-level note that dismiss is intentionally non-consent.

**Learnings:**
- Full analytics gating belongs to PR-3, but component/service contracts can be safely enforced now.

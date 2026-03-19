---
status: complete
priority: p1
issue_id: "007"
tags: [code-review, data-integrity, reliability, cms, quality]
dependencies: []
---

# Add runtime validation and error hardening for file-based content reader

## Problem Statement

The content reader currently assumes schema correctness at runtime and can fail hard (500) on malformed or partially corrupted content files. This threatens route reliability for `/`, `/projects`, `/projects/[slug]`, and `/legal`.

## Findings

- `lib/content.ts:83` and `:102` spread `stack` without runtime guard; malformed value can throw.
- `lib/content.ts:45-70` uses full fallback only when entire singleton read is null, not when fields are partially missing.
- `lib/content.ts:45,55,64,74,89` has no `try/catch` around read operations; YAML parse errors bubble up.
- `data-integrity-guardian` flagged these as corruption/invalid-state failure modes.

## Proposed Solutions

### Option 1: Lightweight guards + field-level fallback merge (recommended)

**Approach:** Add defensive normalization for arrays/required fields, merge per-field fallbacks, and catch parse/read errors with safe outputs.

**Pros:**
- Small diff
- Prevents user-facing crashes
- Maintains current architecture

**Cons:**
- Manual validation logic can drift

**Effort:** 2-4 hours

**Risk:** Low

---

### Option 2: Formal runtime schema validation (Zod or equivalent)

**Approach:** Validate raw content entries against explicit runtime schemas and fail with structured errors.

**Pros:**
- Strong contract enforcement
- Clear error diagnostics

**Cons:**
- Additional dependency/boilerplate
- Slightly higher maintenance overhead

**Effort:** 4-8 hours

**Risk:** Medium

---

### Option 3: Build-time content preflight check only

**Approach:** Add script/CI step validating `content/**/*.yaml`, leave runtime logic mostly unchanged.

**Pros:**
- Catches bad content before deploy
- Minimal runtime overhead

**Cons:**
- Does not protect runtime from manual drift/environment anomalies

**Effort:** 2-3 hours

**Risk:** Medium

## Recommended Action

Implemented Option 1 with defensive normalization, singleton field-level fallbacking, guarded reader calls, and dedicated resilience tests.

## Technical Details

**Affected files:**
- `lib/content.ts`
- optional new tests: `lib/content.test.ts`

## Resources

- PR: https://github.com/LVP-JS-Dev/synth-portfolio/pull/6
- Related content files: `content/pages/*.yaml`, `content/projects/*.yaml`

## Acceptance Criteria

- [x] Invalid `stack` values no longer throw runtime errors.
- [x] Partial singleton data falls back per field, not only whole-object null.
- [x] Parse/read failures are handled with safe fallback behavior and logging.
- [x] Tests cover malformed YAML/data-shape edge cases.

## Work Log

### 2026-03-19 - Initial discovery from multi-agent review

**By:** Claude Code

**Actions:**
- Consolidated reliability findings from `data-integrity-guardian` and cross-checked in `lib/content.ts`.
- Identified concrete crash points and fallback blind spots.

**Learnings:**
- File-based CMS content requires runtime hardening even with typed config due to external/manual edits.

### 2026-03-19 - Resolution

**By:** Claude Code

**Actions:**
- Added hardened normalization and guarded read wrappers in `lib/content.ts`.
- Added `lib/content.test.ts` covering malformed stack values, partial singletons, and read exception paths.
- Added request-level caching for repeated content reads to reduce duplicate I/O.
- Verified with `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`.

**Learnings:**
- Defensive parsing and bounded fallbacks eliminate most file-content corruption crashes without changing route contracts.

## Notes

- Classified P1 due to user-facing availability impact (possible 500s on core pages).

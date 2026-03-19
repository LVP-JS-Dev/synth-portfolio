---
status: complete
priority: p1
issue_id: "011"
tags: [code-review, architecture, agent-native, cms]
dependencies: []
---

# Add agent-native parity for CMS content operations

## Problem Statement

PR #6 adds user-facing CMS capabilities via Keystatic UI and API, but no equivalent agent-facing tool contract for content CRUD operations. This introduces a UI-only capability gap.

## Findings

- `app/keystatic/*` and `app/api/keystatic/[...params]/route.ts` provide UI/API content operations for humans.
- No agent tool interface exists for listing, reading, creating, updating, or deleting CMS content in `content/**`.
- `agent-native-reviewer` flagged this as parity debt with potential merge impact.

## Proposed Solutions

### Option 1: Minimal agent content tools over file-backed CMS (recommended)

**Approach:** Add agent primitives for `list/get/upsert/delete` on CMS content with validation and audit output.

**Pros:**
- Restores user/agent capability parity quickly
- Keeps Keystatic as source of truth

**Cons:**
- Requires tool/runtime wiring

**Effort:** 4-8 hours

**Risk:** Medium

---

### Option 2: Expose constrained API wrapper for agent use

**Approach:** Add dedicated server endpoints for agent operations with strict auth and schema validation.

**Pros:**
- Clear boundary and permission model

**Cons:**
- Larger implementation surface

**Effort:** 1-2 days

**Risk:** Medium

---

### Option 3: Temporary documented parity exception

**Approach:** Merge with explicit exception and deadline for parity tooling.

**Pros:**
- Fastest short-term path

**Cons:**
- Leaves architectural debt
- Conflicts with agent-native goals

**Effort:** 30-60 minutes

**Risk:** High

## Recommended Action

Implemented Option 2 baseline: added a constrained authenticated API plus filesystem-safe content operations with schema checks and structured audit payloads.

## Technical Details

**Affected files (expected):**
- tool/runtime integration layer (new)
- `lib/content.ts` (or adapter layer)
- optional auth/audit files

## Resources

- PR: https://github.com/LVP-JS-Dev/synth-portfolio/pull/6

## Acceptance Criteria

- [x] Agent can list and read CMS content used by routes.
- [x] Agent can update/create/delete content with schema validation.
- [x] All agent writes emit structured before/after audit output.
- [x] Unauthorized operations are denied by policy.

## Work Log

### 2026-03-19 - Initial discovery from agent-native review

**By:** Claude Code

**Actions:**
- Consolidated `agent-native-reviewer` findings for PR #6.
- Verified absence of agent-level CMS operation interfaces.

**Learnings:**
- New UI capabilities should ship with equivalent agent operation paths to maintain parity.

### 2026-03-19 - Resolution

**By:** Claude Code

**Actions:**
- Added `lib/content-ops.ts` with path-safe YAML list/read/upsert/delete operations constrained to `content/`.
- Added `app/api/content-ops/route.ts` with authenticated GET/POST/DELETE operations and `op=context` contract endpoint.
- Added auth policy in `lib/content-ops/auth.ts` using bearer token (`CONTENT_OPS_TOKEN`) with explicit insecure-dev override flag.
- Added structured audit payloads for write/delete responses (previous/next hashes and sizes).
- Updated `README.md` and `.env.example` with usage/auth details.

**Learnings:**
- A constrained filesystem API with explicit schema checks is the minimum practical parity bridge between UI editing and agent automation.

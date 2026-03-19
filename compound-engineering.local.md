---
review_agents: [kieran-typescript-reviewer, security-sentinel, performance-oracle, architecture-strategist, code-simplicity-reviewer, git-history-analyzer, data-integrity-guardian, agent-native-reviewer]
plan_review_agents: [kieran-typescript-reviewer, code-simplicity-reviewer]
---

# Review Context

- Next.js 16 App Router project: prefer server components by default and minimal client boundaries.
- Token-first styling policy: no hardcoded design color/font literals outside token sources.
- Security baseline is progressive: report-only CSP now, stricter enforcement in follow-up PRs.
- Keep diffs small and solo-maintainable; avoid process bloat.

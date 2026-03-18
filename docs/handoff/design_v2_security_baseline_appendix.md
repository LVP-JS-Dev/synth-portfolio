# Design v2 Security Baseline Appendix

Version: v1-slim
Last updated: 2026-03-18

1. Keep all secrets in environment variables, never in repository files.
2. Rotate mail and captcha credentials at least every 90 days.
3. Log only required contact metadata; avoid storing full message bodies in analytics.
4. Retain contact submission data for a defined period and document deletion workflow.
5. Define severity levels and one owner response SLA for abuse incidents.
6. Keep contact endpoint controls enabled: honeypot, captcha, validation, rate limit.
7. Fail release if SPF, DKIM, or DMARC is invalid on either domain.
8. Keep dependency vulnerability checks in CI and fail on high/critical findings.
9. Require HTTPS on all environments serving contact forms.
10. Record security-related rollback triggers in each release note.

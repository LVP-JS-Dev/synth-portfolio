# Design v2 Iconography Spec

Last updated: 2026-03-18  
Source: `design_v2.pen`

## Icon Library

- Library: **Lucide**
- URL: `https://lucide.dev/`
- License: **ISC** (free for personal and commercial use)
- Rationale: consistent 24-grid stroke style, clean readability at small sizes, good fit for engineering portfolio UIs.

## Usage Rules

- Use a single icon family (`lucide`) across all routes.
- Keep icon semantics stable by context (navigation, legal, metric, action).
- Keep icon and label spacing consistent:
  - compact controls/chips: `gap: 6`
  - metric value groups: `gap: 8`
- Keep icon sizing consistent:
  - compact nav/legal/consent: `14`
  - mobile menu trigger: `16`
  - metric callouts: `20`

## Implemented Mapping

### Navigation / Wayfinding

- `XbQS2` (mobile menu): `menu`
- `HFw8g` (desktop projects back): `chevron-left`
- `GkHPL` (mobile projects back): `chevron-left`
- `f7O7q` (mobile case back): `chevron-left`
- `jgiSz` (mobile legal back): `chevron-left`
- `ihaGP` (desktop case back to projects): `chevron-left`
- `mBVeY` (desktop legal back): `chevron-left`
- `WceB9`, `HSrAf`, `LSUHj`, `y4W8K`, `T985Z` (case-study CTA chevrons): `chevron-right`

### Legal / Compliance Chips

- `E7bpN`, `VfzOW`: `shield`
- `XeuTq`, `fTtIs`: `user`
- `mCWxd`, `0giTJ`: `cookie`

### Consent CTA

- `6RqJ8` (cookie accept): `check`

### Metrics

- `w2arq`: `zap`
- `QxeNa`: `shield-check`
- `hvMJd`: `activity`
- `iTFoP`, `2iWx0`: `timer`
- `cyOFw`, `4b6lQ`: `shield`
- `ACAZO`, `nGfNo`: `users`

### Contact / Form Context

- `AI6FD` form field component includes a leading icon slot (`j3hri`) for contextual overrides.
- `zlQQb` (`mFullForm`) uses `Ljsno` and `CL2sg` refs to override `j3hri` as `user` and `mail`.

## Implementation Notes

- Keep decorative icons `aria-hidden="true"` in code.
- If an icon is the only visual cue for an action, provide an accessible label.
- Use tokens/approved colors for icon fills (no arbitrary color literals in app code).
- Preserve current contrast behavior on dark surfaces for icon+label pairs.

## Verification Checklist

- [ ] Desktop and mobile nav back controls include icon affordance.
- [ ] Legal chips include semantic icons and remain readable.
- [ ] Cookie accept button keeps icon+label alignment.
- [ ] Metric cards render icon+value groups without clipping.
- [ ] Route-level QA passed for `/`, `/projects`, `/projects/[slug]`, `/legal`.

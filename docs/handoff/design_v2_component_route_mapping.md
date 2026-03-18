# Design v2 Component-Route Mapping

Date: 2026-03-18  
Source: `design_v2.pen`

## Route to Frame Mapping

| Route | Desktop Frame | Mobile Frame |
|---|---|---|
| `/` | `7oH3p` (Home / Desktop) | `yfDUF` (Home / Mobile) |
| `/projects` | `PDYt3` (Projects / Desktop) | `QMw9l` (Projects / Mobile) |
| `/projects/[slug]` | `GUKCH` (Project Case / Desktop) | `Uqn1U` (Project Case / Mobile) |
| `/legal` | `X9jYR` (Legal / Desktop) | `utC7L` (Legal / Mobile) |

## Section Mapping by Route

### `/` (Home)

- Desktop (`7oH3p`): `tgLrQ` nav, `cXJxk` cookie, `EK2r6` hero, `P0Mf0` about header, `mFXGd` about, `r5ULi` exp header, `eT397` experience, `Sa0f4` projects header, `tN3lj` projects grid, `pZQFd` quality header, `PZ7i4` quality metrics, `gJFDq` quality details, `j29WJ` content header, `UcFVJ` content grid, `w6lzr` contact header, `9cI24` contact, `msStG` footer, `HZMgR` in-development
- Mobile (`yfDUF`): `kOz1f` nav, `x7woU` cookie, `7g8eJ` hero, `g2cM4` about, `ZuAXZ` experience, `a43WO` projects, `tGQHu` quality, `W1uXG` contact, `V46Hp` content, `hn0PC` contact form, `IeYzn` footer, `vByqS` in-development

### `/projects`

- Desktop (`PDYt3`): `6tW9O` nav, `MfDE5` header, `lHDB6` filters, `I59Uf` grid, `RIFrn` pager
- Mobile (`QMw9l`): `HEnEl` nav, `XuDPb` header, `oMf1x` hint, `DlgvS`/`UIrWH` filters, `FlcMR` grid, `i325E` pager, `WzL64` footer, `7Joju` in-development

### `/projects/[slug]`

- Desktop (`GUKCH`): `zKZl9` nav, `eKF87` hero, `gOCh4` metrics, `2JPHn` context split, `ehvhQ` architecture, `h6xUY` implementation, `rjoNR` results, `HAK5c` stack
- Mobile (`Uqn1U`): `J4W2O` nav, `gqeyh` cookie, `8Q9cP` hero, `mWWoz` metrics title, `zXLcE` metrics, `S12wz` overview, `ElVp8` context, `vB7Td` architecture, `VHKcv` implementation, `lZRK3` results, `1t682` stack, `HumN6` footer, `9VcXT` in-development

### `/legal`

- Desktop (`X9jYR`): `cxG6M` nav, `AjEYt` header, `BLpQ9` legal docs, `VMdzi` implementation note
- Mobile (`utC7L`): `IirDX` nav, `RJUO6` header, `qloUY` privacy, `vhgfM` consent, `BOB8H` cookie policy, `1QB5F` cookie banner, `SzXrL` implementation note

## Reusable Component Catalog (Design System)

| Component ID | Name | Primary Usage |
|---|---|---|
| `oNDTR` | Component / Button Primary | CTAs, filter buttons, reset actions |
| `RAwqq` | Component / Section Header | Desktop section intro blocks |
| `z0Nf5` | Component / Project Card | Project listings on home/projects |
| `tUNiC` | Component / Timeline Item | Experience timeline |
| `eJ7Df` | Component / Metric Card | Quality and case-study metrics |
| `MAqDx` | Component / Content Card | Writing/speaking cards |
| `AI6FD` | Component / Form Field | Contact form input fields |
| `4AabH` | Component / Contact Form | Home contact CTA blocks |
| `6fvkC` | Component / Cookie Banner | Consent banners |
| `ixV4l` | Component / In Development | Placeholder/status content |

## Implementation Notes

- Use one shared content model per route and render Desktop/Mobile variants from the same data.
- Keep reusable component contracts stable first (`Button`, `ProjectCard`, `MetricCard`, `FormField`, `CookieBanner`), then compose pages.
- Preserve tokenized typography (`$font-display`, `$font-body`) and color usage in component APIs.
- Treat `In Development` and legal notes as content flags, not permanent UI states.

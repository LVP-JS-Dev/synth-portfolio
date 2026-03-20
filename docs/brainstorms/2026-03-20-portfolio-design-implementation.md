---
date: 2026-03-20
topic: portfolio-design-implementation
---

# Portfolio Design Implementation (design_v2.pen)

## What We're Building
Implementation of a highly polished, responsive portfolio website across 4 main views:
1. Home (Desktop/Mobile)
2. Projects Index (Desktop/Mobile)
3. Project Case Study (Desktop/Mobile)
4. Legal / Compliance (Desktop/Mobile)

The design features a dark-mode cyberpunk aesthetic with extensive use of glow effects (soft/medium/hard), specialized typography (JetBrains Mono for display, Inter for body), and dynamic interaction states (hover/focus/active).

## Why This Approach
The user selected **Next.js + Tamagui + Motion**. 
This approach aligns perfectly with the design's stated constraints (found in the footer text of `design_v2.pen`). Tamagui provides excellent token management for the complex nested glow states and responsive layouts, while Motion handles the physics-based interactions (springs, eases) specified in the design's "State Tokens".

## Key Decisions
- **Styling**: Tamagui will be used as the primary styling solution to encapsulate design tokens (colors, blur radius, strokes).
- **Animation**: Motion (formerly Framer Motion) will be used for state transitions (hover springs, focus fades).
- **Design System Translation**: The `Variables` block from the `.pen` file will be translated 1:1 into a `tamagui.config.ts` theme.
- **Components**: Reusable components from the `.pen` file (Button Primary, Project Card, Metric Card, Timeline Item, Content Card, Form Field) will be built as Tamagui-styled components.

## Open Questions
- Is the content for the Legal pages and Project Case study static, or should it be hooked up to Keystatic/Markdoc right away?

## Next Steps
→ Proceed to `ce:plan` for implementation details.
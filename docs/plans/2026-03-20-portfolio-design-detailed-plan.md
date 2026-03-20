# Detailed Component Plan: Portfolio Design (v2)

## 1. File Structure Architecture
```text
synth-portfolio/
├── app/
│   ├── layout.tsx         # Tamagui Provider & Font configuration
│   ├── page.tsx           # Home Page
│   ├── projects/
│   │   ├── page.tsx       # Projects Index
│   │   └── [slug]/page.tsx# Project Case Study
│   └── legal/
│       └── page.tsx       # Privacy, Consent, Cookie Policy
├── components/
│   ├── shared/
│   │   ├── TopNav.tsx     # Desktop & Mobile Header
│   │   ├── Footer.tsx     # Desktop & Mobile Footer
│   │   └── CookieBanner.tsx
│   ├── primitives/
│   │   ├── Button.tsx     # ButtonPrimary with Tamagui variants
│   │   ├── FormField.tsx  # Input + Label + Icon
│   │   └── SectionHeader.tsx
│   ├── modules/
│   │   ├── ProjectCard.tsx
│   │   ├── TimelineItem.tsx
│   │   ├── MetricCard.tsx
│   │   └── ContentCard.tsx
│   └── icons/             # Lucide React wrappers
└── theme/
    ├── tamagui.config.ts  # Token & theme definitions
    ├── tokens.ts          # Extracted from design_v2.pen
    └── animations.ts      # Motion configurations
```

## 2. Design Tokens Translation (`theme/tokens.ts`)
Derived directly from the `Variables` and `State Tokens` block in the `.pen` file.

### Colors
- `bg-base`: `#1A1630`
- `bg-surface`: `#221C3E`
- `bg-surface-2`: `#2C2550`
- `accent-cyan`: `#52FFF6`
- `accent-pink`: `#FF4FD8`
- `accent-yellow`: `#FFE86F`
- `text-primary`: `#FFF9FF`
- `text-secondary`: `#D7CCFF`

### Glows (Shadows)
- `glow-soft`: Blur `8px`, Color `rgba(82, 255, 246, 0.4)`
- `glow-medium`: Blur `14px`, Color `rgba(82, 255, 246, 0.66)`
- `glow-hard`: Blur `24px`, Color `rgba(255, 79, 216, 0.8)`

### Typography
- `$font-display`: `JetBrains Mono`
- `$font-body`: `Inter`

## 3. Component APIs & Tamagui Variants

### `ButtonPrimary` (`components/primitives/Button.tsx`)
```typescript
interface ButtonProps {
  preset?: 'soft' | 'medium' | 'hard'; // maps to glow intensity
  iconRight?: ReactNode;
  children: ReactNode;
  onPress?: () => void;
}
```
**Tamagui Variants**:
- `preset="soft"`: `bg="$bg-surface-2"`, `shadowColor="$glow-soft"`, `shadowRadius="$8"`
- `preset="medium"`: `bg="$accent-cyan"`, `shadowColor="$glow-medium"`, `shadowRadius="$14"`, `color="#111226"`
- **States (via Motion)**:
  - `hover`: `shadowRadius: 16, borderColor: $accent-cyan`
  - `focus`: `shadowRadius: 20, borderColor: $accent-yellow, outlineWidth: 2`
  - `active`: `shadowRadius: 22, backgroundColor: $accent-pink`

### `ProjectCard` (`components/modules/ProjectCard.tsx`)
```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  gradientColors: [string, string, string];
  gradientRotation: number; // e.g., 140deg
  href: string;
}
```
- **Layout**: Vertical stack, 12px gap, 16px padding.
- **Preview**: 170px height, linear gradient background mapped from props.

### `SectionHeader` (`components/primitives/SectionHeader.tsx`)
```typescript
interface SectionHeaderProps {
  eyebrow: string; // e.g., "01. SECTION"
  title: string;
  subtitle: string;
}
```
- **Styling**: Eyebrow uses `$font-display` 12px uppercase + letterSpacing 1.2px. Title uses 36px `$font-display` bold.

### `TimelineItem` (`components/modules/TimelineItem.tsx`)
```typescript
interface TimelineItemProps {
  role: string;
  company: string;
  period: string; // e.g., "2022 — Present"
  achievement: string;
}
```
- **Layout**: Horizontal row for dot container, vertical stack for content.

### `MetricCard` (`components/modules/MetricCard.tsx`)
```typescript
interface MetricCardProps {
  icon: 'activity' | 'zap' | 'shield' | 'users';
  value: string; // e.g., "-49%"
  label: string;
}
```

## 4. State Management & Animations
Animations will be driven by `framer-motion` (or Tamagui's built-in `@tamagui/animations-moti`/`@tamagui/animations-css` if simpler).
Based on design:
- `Motion.hover`: Spring (stiffness: 420, damping: 20)
- `Motion.focus`: Tween (duration: 0.18s, easeOut)
- `Motion.active`: Tween (duration: 0.12s, easeOut)

## 5. Next.js Routing
- `/`: Maps to `Home / Desktop` + `Home / Mobile`.
- `/projects`: Maps to `Projects / Desktop` + `Projects / Mobile`.
- `/projects/[slug]`: Maps to `Project Case / Desktop` + `Project Case / Mobile`.
- `/legal`: Maps to `Legal / Desktop` + `Legal / Mobile`.
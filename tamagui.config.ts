import { createTamagui, createTokens } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { createFont } from 'tamagui'

const interFont = createInterFont()
const jetBrainsFont = createFont({
  family: 'JetBrains Mono, monospace',
  size: { 1: 12, 2: 13, 3: 14, 4: 16, 5: 18, 6: 20, 7: 36, 8: 48, 9: 58 },
  lineHeight: { 1: 1.1, 2: 1.45, 3: 1.5, 4: 1.55, 5: 1.6 },
  weight: { 400: '400', 500: '500', 700: '700' },
  letterSpacing: { 1: 0, 2: 1, 3: 1.2 }
})

/* eslint-disable no-restricted-syntax */
const colorTokens = {
  bgBase: '#1A1630',
  bgSurface: '#221C3E',
  bgSurface2: '#2C2550',
  accentCyan: '#52FFF6',
  accentPink: '#FF4FD8',
  accentYellow: '#FFE86F',
  textPrimary: '#FFF9FF',
  textSecondary: '#D7CCFF',
  glowSoft: 'rgba(82, 255, 246, 0.4)',
  glowMedium: 'rgba(82, 255, 246, 0.66)',
  glowHard: 'rgba(255, 79, 216, 0.8)',
  glowPink: 'rgba(255, 79, 216, 0.66)',
}
/* eslint-enable no-restricted-syntax */

const tokens = createTokens({
  color: colorTokens,
  space: {
    2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 8: 48, 10: 64,
    true: 16,
  },
  size: {
    true: 16,
  },
  radius: {
    sm: 8, md: 12, lg: 16, round: 999,
    true: 12,
  },
  zIndex: { true: 1 }
})

export const config = createTamagui({
  fonts: {
    heading: jetBrainsFont,
    body: interFont,
  },
  tokens,
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
  themes: {
    light: {
      background: tokens.color.bgBase,
      color: tokens.color.textPrimary,
    },
    dark: {
      background: tokens.color.bgBase,
      color: tokens.color.textPrimary,
    }
  }
})

export type AppConfig = typeof config
declare module 'tamagui' {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface TamaguiCustomConfig extends AppConfig {}
  /* eslint-enable @typescript-eslint/no-empty-object-type */
}
export default config

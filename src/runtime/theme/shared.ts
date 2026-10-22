// Kept as literal strings so Tailwind's `@source "./theme"` scan generates them.
export const vfd = {
  primary: '[--vfd:var(--ui-primary)]',
  secondary: '[--vfd:var(--ui-secondary)]',
  success: '[--vfd:var(--ui-success)]',
  info: '[--vfd:var(--ui-info)]',
  warning: '[--vfd:var(--ui-warning)]',
  error: '[--vfd:var(--ui-error)]',
  neutral: '[--vfd:var(--ui-text-highlighted)]',
} as const

export type VfdColor = keyof typeof vfd

/** Readouts stay luminous behind dark glass in daylight too; neutral is white, not amber. */
export const litVfd = {
  primary: '[--vfd:var(--ui-color-primary-400)]',
  secondary: '[--vfd:var(--ui-color-secondary-400)]',
  success: '[--vfd:var(--ui-color-success-400)]',
  info: '[--vfd:var(--ui-color-info-400)]',
  warning: '[--vfd:var(--ui-color-warning-400)]',
  error: '[--vfd:var(--ui-color-error-400)]',
  neutral: '[--vfd:var(--ui-color-neutral-100)]',
} as const

export const colors = Object.keys(vfd) as VfdColor[]

/** Pigments for printed and moulded objects, fixed across colour modes like the physical thing. */
export const pigment = {
  primary: '[--pigment:var(--ui-color-primary-600)]',
  secondary: '[--pigment:var(--ui-color-secondary-600)]',
  success: '[--pigment:var(--ui-color-success-600)]',
  info: '[--pigment:var(--ui-color-info-600)]',
  warning: '[--pigment:var(--ui-color-warning-600)]',
  error: '[--pigment:var(--ui-color-error-600)]',
  neutral: '[--pigment:oklch(22%_0.01_220)]',
} as const

/** Label-maker tapes: dyed, clear, black and white, with the letters embossed in the pigment where the tape is plain. */
export const tape = {
  dyed: '[--tape:var(--pigment)] [--tape-ink:oklch(97%_0.005_90)]',
  clear: '[--tape:oklch(100%_0_0/0.07)] [--tape-ink:var(--pigment)]',
  black: '[--tape:oklch(17%_0.01_220)] [--tape-ink:color-mix(in_oklab,var(--pigment),white_40%)]',
  white: '[--tape:oklch(95%_0.006_90)] [--tape-ink:var(--pigment)] [--emboss:oklch(100%_0_0/0.9)]',
}

/** Uppercase hardware legend in the body face. */
export const legend = 'font-semibold uppercase tracking-[0.08em]'

/**
 * Compound variants applying a class map per colour.
 * Compound variants are appended to Nuxt UI's, whereas slot objects under
 * `variants.color` don't merge into colour variants that Nuxt UI defines as strings.
 */
export function perColor(slot: string, map: Record<VfdColor, string> = vfd) {
  return colors.map(color => ({ color, class: { [slot]: map[color] } }))
}

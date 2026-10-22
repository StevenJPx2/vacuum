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

export const label = 'font-mono uppercase tracking-[0.14em]'

/**
 * Compound variants setting `--vfd` on the given slot for each colour.
 * Compound variants are appended to Nuxt UI's, whereas slot objects under
 * `variants.color` don't merge into colour variants that Nuxt UI defines as strings.
 */
export function colorOn(slot: string) {
  return Object.entries(vfd).map(([color, cls]) => ({ color: color as VfdColor, class: { [slot]: cls } }))
}

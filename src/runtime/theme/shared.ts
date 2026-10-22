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

export const colors = Object.keys(vfd) as VfdColor[]

/** Thread colours for embroidered patches, fixed across colour modes like a physical object. */
export const thread = {
  primary: '[--vfd:var(--ui-color-primary-500)]',
  secondary: '[--vfd:var(--ui-color-secondary-500)]',
  success: '[--vfd:var(--ui-color-success-500)]',
  info: '[--vfd:var(--ui-color-info-500)]',
  warning: '[--vfd:var(--ui-color-warning-500)]',
  error: '[--vfd:var(--ui-color-error-500)]',
  neutral: '[--vfd:oklch(95%_0.008_85)]',
} as const

/** Patch fabrics: black twill, colour-dyed twill and cream twill. */
export const fabric = {
  black: '[--patch-fabric:oklch(16%_0.006_220)] [--patch-edge:oklch(22%_0.006_220)]',
  dyed: '[--patch-fabric:var(--vfd)] [--patch-edge:color-mix(in_oklab,var(--vfd)_72%,black)] [--patch-thread:oklch(15%_0.006_220)]',
  cream: '[--patch-fabric:oklch(94%_0.018_85)] [--patch-edge:var(--vfd)] [--patch-thread:color-mix(in_oklab,var(--vfd)_85%,black)]',
}

/** Black-fabric thread follows the colour; edge in the colour for `outline`. */
export const threadOnBlack = '[--patch-thread:var(--vfd)]'
export const edgeInColor = '[--patch-edge:var(--vfd)]'

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

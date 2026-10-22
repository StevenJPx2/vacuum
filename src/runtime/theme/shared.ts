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

/** Sets `--vfd` on the given slot for each colour variant. */
export function colorOn(slot: string) {
  return Object.fromEntries(
    Object.entries(vfd).map(([color, cls]) => [color, { [slot]: cls }]),
  ) as Record<VfdColor, Record<string, string>>
}

export const phosphors = ['amber', 'cyan', 'green', 'red'] as const
export type Phosphor = typeof phosphors[number]

export const glows = ['off', 'soft', 'strong'] as const
export type Glow = typeof glows[number]

export function phosphorColors(phosphor: Phosphor) {
  return {
    primary: `phosphor-${phosphor}`,
    secondary: phosphor === 'cyan' ? 'phosphor-amber' : 'phosphor-cyan',
    success: 'phosphor-green',
    info: 'phosphor-cyan',
    warning: 'phosphor-amber',
    error: 'phosphor-red',
    neutral: 'glass',
  }
}

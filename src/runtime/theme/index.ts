import { colorOn, label, vfd } from './shared'

export const button = {
  slots: {
    base: `${label} font-medium`,
  },
  variants: {
    color: vfd,
    variant: {
      solid: 'glow-box',
      outline: 'glow',
      soft: 'glow',
      subtle: 'glow',
      ghost: 'glow',
      link: 'glow',
    },
  },
}

export const badge = {
  slots: {
    base: label,
  },
  variants: {
    color: vfd,
    variant: {
      solid: 'glow-box',
      outline: 'glow',
      soft: 'glow',
      subtle: 'glow',
    },
  },
}

export const alert = {
  slots: {
    title: label,
    description: 'font-mono',
  },
  compoundVariants: [
    ...colorOn('root'),
    // Dimmed in dark mode so a lit block glows without glaring.
    { variant: 'solid', class: { root: 'glow-box dark:bg-[color-mix(in_oklab,var(--vfd)_68%,var(--ui-bg))]' } },
    { variant: ['outline', 'soft', 'subtle'], class: { root: 'glow' } },
  ],
}

export const card = {
  slots: {
    title: `${label} glow`,
    description: 'font-mono',
  },
  compoundVariants: [
    { variant: 'solid', class: { root: 'glow-box' } },
  ],
}

export const input = {
  slots: {
    base: 'font-mono glow',
  },
}

export const textarea = {
  slots: {
    base: 'font-mono glow',
  },
}

export const select = {
  slots: {
    base: 'font-mono glow',
    item: 'font-mono',
    label: label,
  },
}

export const selectMenu = {
  slots: {
    base: 'font-mono glow',
    item: 'font-mono',
    label: label,
  },
}

export const formField = {
  slots: {
    label: `${label} text-xs`,
    description: 'font-mono',
    help: 'font-mono',
    error: 'font-mono glow',
  },
}

export const checkbox = {
  slots: {
    label: 'font-mono',
  },
  compoundVariants: colorOn('base'),
}

export const radioGroup = {
  slots: {
    label: 'font-mono',
  },
}

const switchTheme = {
  slots: {
    base: 'rounded-none',
    thumb: 'rounded-none',
    label: 'font-mono',
  },
  compoundVariants: [
    ...colorOn('base'),
    { checked: true, class: { base: 'glow-box' } },
  ],
}

export { switchTheme as switch }

export const slider = {
  slots: {
    track: 'rounded-none',
    range: 'rounded-none glow-box',
    thumb: 'rounded-none',
  },
  compoundVariants: colorOn('range'),
}

export const progress = {
  slots: {
    base: 'rounded-none',
    indicator: 'rounded-none glow-box',
    status: 'font-mono',
  },
  compoundVariants: colorOn('indicator'),
}

export const tabs = {
  slots: {
    trigger: `${label} data-[state=active]:glow`,
    indicator: 'rounded-none glow-box',
  },
  compoundVariants: colorOn('indicator'),
}

export const table = {
  slots: {
    th: `${label} text-xs glow`,
    td: 'font-mono',
  },
}

export const modal = {
  slots: {
    content: 'ring ring-accented',
    title: `${label} glow`,
    description: 'font-mono',
  },
}

export const toast = {
  slots: {
    title: `${label} glow`,
    description: 'font-mono',
  },
}

export const tooltip = {
  slots: {
    content: 'font-mono uppercase tracking-wider',
  },
}

export const kbd = {
  base: 'font-mono',
}

export const accordion = {
  slots: {
    label: `${label} text-start`,
  },
}

export const separator = {
  slots: {
    label: label,
  },
}

export const navigationMenu = {
  slots: {
    link: label,
    label: label,
  },
}

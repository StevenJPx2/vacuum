import { colors, edgeInColor, fabric, legend, onBlackFabric, onLightFabric, perColor, thread, threadOnBlack, vfd } from './shared'

/* Materials */

/** A dark plastic key that keeps its colour through hover, press and disabled states. */
const keyBg = 'bg-(--vfd-key) hover:bg-(--vfd-key) active:bg-(--vfd-key) disabled:bg-(--vfd-key) aria-disabled:bg-(--vfd-key) dark:disabled:bg-(--vfd-key) dark:aria-disabled:bg-(--vfd-key)'

/** A display window field: lit phosphor text behind smoked glass. */
const field = 'window rounded-xs font-mono text-highlighted glow placeholder:text-dimmed caret-(--ui-primary)'
const glass = 'bg-(--vfd-window) hover:bg-(--vfd-window) focus:bg-(--vfd-window) has-focus:bg-(--vfd-window) disabled:bg-(--vfd-window) dark:disabled:bg-(--vfd-window)'

/** A raised chassis panel for overlays. */
const panel = 'chassis bg-(--vfd-chassis) rounded-sm ring-0'

/* Keys */

export const button = {
  slots: {
    base: legend,
  },
  variants: {
    color: vfd,
  },
  compoundVariants: [
    { variant: 'solid', class: 'keycap' },
    { variant: ['outline', 'soft', 'subtle'], class: `keycap ${keyBg}` },
    // Neutral legends are printed on the key, independent of the surface it sits on.
    { color: 'neutral', variant: ['outline', 'soft', 'subtle'], class: 'text-(--vfd-key-legend)' },
    // An illuminated key: a lit LED beside the legend.
    { variant: 'subtle', class: 'before:led before:led-on' },
    { variant: 'link', class: 'underline-offset-4 hover:underline' },
    { active: true, class: 'latched' },
  ],
}

export const kbd = {
  base: 'keycap bg-(--vfd-key) text-(--vfd-key-legend) font-mono font-semibold',
  compoundVariants: [
    { variant: ['outline', 'soft', 'subtle'], class: 'bg-(--vfd-key) text-(--vfd-key-legend)' },
  ],
}

export const avatar = {
  slots: {
    root: 'keycap',
    fallback: 'font-semibold',
  },
  compoundVariants: [
    { color: colors, class: { root: 'bg-(--vfd-key)' } },
  ],
}

/* Embroidered patches */

export const badge = {
  slots: {
    base: 'patch [--patch-radius:5px] font-bold uppercase tracking-[0.1em]',
    label: 'embroidered',
  },
  variants: {
    size: {
      xs: { base: '[--patch-edge-width:2px]' },
      sm: { base: '[--patch-edge-width:2px]' },
    },
  },
  compoundVariants: [
    ...perColor('base', thread),
    { variant: 'solid', class: { base: `${fabric.dyed} text-(--patch-thread)` } },
    { variant: 'outline', class: { base: `${fabric.black} ${threadOnBlack} ${edgeInColor} text-(--patch-thread)` } },
    { variant: 'soft', class: { base: `${fabric.black} ${threadOnBlack} text-(--patch-thread)` } },
    { variant: 'subtle', class: { base: `${fabric.cream} text-(--patch-thread)` } },
  ],
}

export const card = {
  slots: {
    root: 'patch [--patch-radius:10px] [--patch-edge-width:4px] [--vfd:var(--ui-color-primary-500)] text-(--ui-text) divide-dashed',
    title: 'embroidered font-bold uppercase tracking-[0.08em] text-base',
    description: 'text-muted',
  },
  compoundVariants: [
    { variant: 'outline', class: { root: `${fabric.black} ${threadOnBlack} ${onBlackFabric} ring-0 divide-(--ui-border)` } },
    { variant: 'solid', class: { root: `${fabric.dyed} ${onLightFabric} divide-(--ui-border)`, description: 'text-muted' } },
    { variant: 'soft', class: { root: `${fabric.cream} ${onLightFabric} divide-(--ui-border) outline-1 outline-dashed -outline-offset-8 outline-(--patch-thread)/45` } },
    { variant: 'subtle', class: { root: `${fabric.black} ${threadOnBlack} ${edgeInColor} ${onBlackFabric} ring-0 divide-(--ui-border) outline-1 outline-dashed -outline-offset-8 outline-(--patch-thread)/45` } },
  ],
}

/* Display windows */

export const alert = {
  slots: {
    root: 'window mesh rounded-sm',
    title: 'font-display font-black text-base uppercase tracking-[0.04em] glow',
    description: 'font-mono',
    icon: 'glow-svg',
  },
  compoundVariants: [
    ...perColor('root'),
    // A lit block, dimmed so it glows without glaring.
    { variant: 'solid', class: { root: 'bg-[color-mix(in_oklab,var(--vfd)_70%,var(--vfd-window))] text-inverted glow-box' } },
    // Inverted rows read as unlit dots on the lit block, so they stay crisp.
    { variant: 'solid', class: { root: 'after:hidden', title: '[text-shadow:none]' } },
    { variant: ['outline', 'soft', 'subtle'], class: { root: 'text-(--vfd) glow' } },
    { variant: ['soft', 'subtle'], class: { root: 'bg-[color-mix(in_oklab,var(--vfd)_9%,var(--vfd-window))]' } },
  ],
}

export const toast = {
  slots: {
    root: 'window mesh rounded-sm ring-0',
    title: 'font-display font-black text-base uppercase tracking-[0.04em] text-highlighted glow',
    description: 'font-mono',
    icon: 'glow-svg',
  },
  compoundVariants: perColor('root'),
}

export const tooltip = {
  slots: {
    content: 'window rounded-xs ring-0 font-mono uppercase tracking-wider glow',
  },
}

// A dot-matrix printout on continuous-feed paper.
export const table = {
  slots: {
    root: 'paper tractor-feed greenbar rounded-none',
    th: 'font-mono uppercase tracking-[0.12em] text-xs border-b border-dashed border-(--ui-border-accented)',
    td: 'font-mono text-default',
    tbody: 'divide-y-0',
  },
}

export const breadcrumb = {
  slots: {
    root: 'window inline-flex rounded-xs px-3 py-1.5',
    link: 'font-mono uppercase tracking-[0.08em] text-xs',
    separatorIcon: 'text-dimmed size-4',
  },
  compoundVariants: [
    { active: true, class: { link: 'glow' } },
  ],
}

/* Form fields as display windows */

const fieldTheme = {
  slots: {
    base: field,
  },
  compoundVariants: [
    { variant: ['soft', 'subtle', 'ghost'], class: { base: glass } },
  ],
}

export const input = fieldTheme
export const textarea = fieldTheme
export const inputNumber = fieldTheme

export const inputTags = {
  slots: {
    base: field,
    item: 'rounded-[2px] font-mono uppercase text-[10px]',
  },
  compoundVariants: [
    { variant: ['soft', 'subtle', 'ghost'], class: { base: glass } },
  ],
}

const selectTheme = {
  slots: {
    base: field,
    value: 'glow',
    content: panel,
    label: 'silkscreen text-[9px] text-muted',
    item: 'uppercase tracking-[0.06em]',
  },
  compoundVariants: [
    { variant: ['soft', 'subtle', 'ghost'], class: { base: glass } },
  ],
}

export const select = selectTheme
export const selectMenu = selectTheme

export const pinInput = {
  slots: {
    base: `${field} font-display font-black`,
  },
  compoundVariants: [
    { variant: ['soft', 'subtle', 'ghost'], class: { base: glass } },
    { size: 'xs', class: { base: 'text-base md:text-base' } },
    { size: 'sm', class: { base: 'text-lg md:text-lg' } },
    { size: 'md', class: { base: 'text-xl md:text-xl' } },
    { size: 'lg', class: { base: 'text-2xl md:text-2xl' } },
    { size: 'xl', class: { base: 'text-3xl md:text-3xl' } },
  ],
}

export const formField = {
  slots: {
    label: 'silkscreen text-[9px] text-muted',
    description: 'text-xs',
    help: 'text-xs',
    error: 'font-mono text-xs',
  },
}

/* Physical controls */

// A push key that lights up when checked.
export const checkbox = {
  slots: {
    base: 'keycap bg-(--vfd-key) ring-0 rounded-[2px]',
    indicator: 'glow-box',
    label: `${legend} text-xs`,
    description: 'text-xs',
  },
  compoundVariants: perColor('indicator'),
}

// Interlocking radio keys, each with an indicator LED.
export const radioGroup = {
  slots: {
    legend: 'silkscreen text-[9px] text-muted',
    base: 'keycap bg-(--vfd-key) ring-0 rounded-[2px] relative before:led before:absolute before:inset-0 before:m-auto',
    indicator: 'after:led after:led-on after:z-1',
    label: `${legend} text-xs`,
    description: 'text-xs',
  },
  compoundVariants: [
    ...perColor('base'),
    { color: colors, class: { indicator: 'bg-transparent' } },
    // The whole item is the key; its radio shrinks to the indicator LED.
    { variant: ['card', 'table'], class: { item: `keycap latch-on-checked ${keyBg} border-0`, base: 'bg-transparent shadow-none' } },
    { color: colors, variant: ['card', 'table'], class: { item: 'has-data-[state=checked]:bg-(--vfd-key) has-data-[state=checked]:border-transparent' } },
    { orientation: 'horizontal', variant: 'table', class: { fieldset: 'gap-1 space-x-0', item: 'rounded-[2px]' } },
    { orientation: 'vertical', variant: 'table', class: { fieldset: 'gap-1 space-y-0', item: 'rounded-[2px]' } },
  ],
}

// A slide switch: a knurled toggle riding in a recessed slot that backlights when on.
const switchTheme = {
  slots: {
    base: 'recess rounded-[3px] data-[state=unchecked]:bg-(--vfd-slot)',
    thumb: 'keycap knurled bg-(--vfd-key) rounded-[2px]',
    label: `${legend} text-xs`,
    description: 'text-xs',
  },
  compoundVariants: [
    ...perColor('base'),
    { color: colors, class: { base: 'data-[state=checked]:bg-[color-mix(in_oklab,var(--vfd)_55%,var(--vfd-slot))] data-[state=checked]:glow-box' } },
  ],
}

export { switchTheme as switch }

// A mixer fader: a wide knurled cap with a centre line, over a segmented LED trail and a printed scale.
export const slider = {
  slots: {
    track: 'recess bg-(--vfd-slot) rounded-none',
    range: 'rounded-none glow-box',
    thumb: 'keycap bg-(--vfd-key) rounded-[2px] ring-0 relative w-8 h-4',
  },
  compoundVariants: [
    ...perColor('range'),
    ...perColor('thumb'),
    { orientation: 'horizontal', class: { root: 'scale pb-2.5', range: 'segments', thumb: 'knurled needle' } },
    { orientation: 'vertical', class: { root: 'scale-y ps-2.5', range: 'segments-y', thumb: 'knurled-y needle-y' } },
  ],
}

// A segmented LED bar graph.
export const progress = {
  slots: {
    root: 'glow-svg',
    base: 'rounded-none bg-[color-mix(in_oklab,var(--vfd)_14%,transparent)]',
    indicator: 'rounded-none',
    status: 'font-mono',
  },
  compoundVariants: [
    ...perColor('root'),
    { orientation: 'horizontal', class: { base: 'segments' } },
    { orientation: 'vertical', class: { base: 'segments-y' } },
    { orientation: 'horizontal', size: 'sm', class: { base: 'h-2' } },
    { orientation: 'horizontal', size: 'md', class: { base: 'h-3' } },
    { orientation: 'horizontal', size: 'lg', class: { base: 'h-4' } },
    { orientation: 'horizontal', size: 'xl', class: { base: 'h-5' } },
  ],
}

// A source selector: latching keys in a recessed tray, each with an LED.
export const tabs = {
  slots: {
    trigger: legend,
  },
  compoundVariants: [
    ...perColor('trigger'),
    ...perColor('indicator'),
    {
      variant: 'pill',
      class: {
        list: 'recess bg-(--vfd-slot) rounded-[3px] gap-1',
        indicator: 'hidden',
        trigger: 'keycap bg-(--vfd-key) rounded-[2px] text-muted before:led data-[state=active]:before:led-on',
      },
    },
    { color: colors, variant: 'pill', class: { trigger: 'data-[state=active]:text-(--vfd)' } },
    // A tuner dial: stations on lit glass over a tick scale, with a red needle that slides to the active one.
    {
      variant: 'link',
      class: {
        list: 'window rounded-xs border-0 px-2 [--scale-step:8px] [--scale-height:6px]',
        indicator: '[--vfd:var(--ui-error)] bg-transparent',
        trigger: 'text-muted data-[state=active]:text-highlighted data-[state=active]:glow',
      },
    },
    { orientation: 'horizontal', variant: 'link', class: { list: 'scale pt-1 pb-3', indicator: 'needle top-0 bottom-0 h-auto' } },
    { orientation: 'vertical', variant: 'link', class: { list: 'scale-y ps-3 py-1', indicator: 'needle-y start-0 end-0 w-auto' } },
  ],
}

// File folders: staggered manila tabs; the open folder pulls forward from the stack.
export const accordion = {
  slots: {
    root: 'folder-stack manila pt-1',
    item: 'folder border-0',
    trigger: `folder-tab flex-none rounded-t-md rounded-b-none ${legend} text-xs px-4 py-2`,
    content: 'folder-face',
    body: 'px-4 pt-3 pb-1',
  },
}

export const navigationMenu = {
  slots: {
    link: `${legend} text-xs`,
    label: 'silkscreen text-[9px] text-muted',
  },
}

export const chip = {
  slots: {
    base: 'led-on ring-0',
  },
  compoundVariants: perColor('base'),
}

export const separator = {
  slots: {
    border: 'shadow-[0_1px_0_var(--vfd-highlight)]',
    label: 'silkscreen text-[9px] text-muted',
  },
}

/* Chassis panels */

export const modal = {
  slots: {
    overlay: 'bg-black/55',
    content: panel,
    title: 'silkscreen text-xs',
    description: 'text-xs',
  },
}

export const slideover = {
  slots: {
    overlay: 'bg-black/55',
    content: panel,
    title: 'silkscreen text-xs',
    description: 'text-xs',
  },
}

export const popover = {
  slots: {
    content: panel,
  },
}

export const dropdownMenu = {
  slots: {
    content: panel,
    label: 'silkscreen text-[9px] text-muted',
    item: 'uppercase tracking-[0.06em]',
  },
}

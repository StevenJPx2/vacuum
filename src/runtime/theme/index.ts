import { colors, legend, litVfd, perColor, pigment, tape, vfd } from './shared'

/* Materials */

/** A dark plastic key that keeps its colour through hover, press and disabled states. */
const keyBg = 'bg-(--vfd-key) hover:bg-(--vfd-key) active:bg-(--vfd-key) disabled:bg-(--vfd-key) aria-disabled:bg-(--vfd-key) dark:disabled:bg-(--vfd-key) dark:aria-disabled:bg-(--vfd-key)'

/** A text field's shared geometry and phosphor ink; its variant supplies the housing. */
const fieldBase = 'font-mono glow [--bezel:0.25rem] [--bezel-radius:0.5rem] rounded-(--bezel-radius) border-(length:--bezel) border-transparent'
const fieldInk = 'text-(--vfd) placeholder:text-[color-mix(in_oklab,var(--vfd)_60%,var(--vfd-window))] caret-(--vfd)'
/**
 * Housings, one per Nuxt UI variant: a moulded screen, a flush screen in a rubber gasket, a
 * screen in a steel bezel, or bare phosphor printed on the panel. All keep the same outer
 * geometry, so switching variants never shifts a form row.
 */
const fieldVariants = [
  ...perColor('root', litVfd),
  ...perColor('base', litVfd),
  // Upstream variant text utilities come after slots, so the selected phosphor wins here.
  { color: colors, class: { base: fieldInk } },
  { variant: 'outline', class: { base: 'screen' } },
  { variant: 'soft', class: { base: 'screen-flush' } },
  { variant: 'subtle', class: { base: 'screen-steel' } },
  { variant: 'ghost', class: { base: 'field-dashed field-daylight' } },
  { variant: 'none', class: { base: 'field-bare field-daylight' } },
  { variant: ['outline', 'soft', 'subtle'], class: { base: 'ring-0' } },
  // A lit ring is the focus indicator for every housing; no modern outline.
  { variant: ['outline', 'soft', 'subtle', 'ghost', 'none'], class: { base: 'focus-visible:outline-0 focus-visible:light-ring-on' } },
  { highlight: true, class: { base: 'light-ring-on' } },
]

/** A small VFD menu screen with crisp, inverted selection rows. */
const menuCard = 'screen [--bezel:0.25rem] [--bezel-radius:0.375rem] rounded-(--bezel-radius) ring-0 font-mono'
const menuItem = 'font-mono before:rounded-[1px] data-highlighted:not-data-disabled:text-(--vfd-window) data-highlighted:not-data-disabled:before:bg-(--vfd)'

/** A key seated in the faceplate with CLOSE silkscreened on it, not a floating close glyph. */
const closeKey = `keycap inset-key legend-word [&_.iconify]:hidden [&>svg]:hidden ${keyBg} rounded-[3px] h-8 px-3 justify-center text-(--vfd-key-legend) focus-visible:outline-2 focus-visible:outline-offset-4`

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

/* Label-maker tape */

// Tape colour and embossed letters replace Nuxt UI's fill, text and ring per variant.
const tapeOn = 'bg-(--tape) text-(--tape-ink) ring-0 rounded-[2px]'

export const badge = {
  slots: {
    base: 'label-tape rounded-[2px]',
  },
  compoundVariants: [
    ...perColor('base', pigment),
    { variant: 'solid', class: { base: `${tape.dyed} ${tapeOn}` } },
    { variant: 'outline', class: { base: `${tape.clear} ${tapeOn}` } },
    { variant: 'soft', class: { base: `${tape.black} ${tapeOn}` } },
    { variant: 'subtle', class: { base: `${tape.white} ${tapeOn}` } },
    // Neutral letters on clear or black tape emboss white to stay legible.
    { color: 'neutral', variant: ['outline', 'soft'], class: { base: '[--tape-ink:oklch(93%_0.005_90)]' } },
  ],
}

// A screen: display glass in a moulded frame, titled in dot-matrix.
export const card = {
  slots: {
    root: 'screen [--bezel-radius:0.875rem] rounded-(--bezel-radius) ring-0 text-default [--vfd:var(--ui-primary)]',
    title: 'font-display font-black text-lg uppercase tracking-[0.04em] text-highlighted glow',
    description: 'font-mono text-muted',
  },
  compoundVariants: [
    // Lit edge to edge; sparse dot-matrix dots wash out on the lit glass, so legends are solid.
    { variant: 'solid', class: { root: 'screen-lit', title: 'font-mono font-bold text-highlighted [text-shadow:none]', description: 'text-muted' } },
    // The mesh covers the readout only, never the keys in the body or footer.
    { variant: 'subtle', class: { header: 'mesh' } },
    // Bare glass without a frame.
    { variant: 'soft', class: { root: 'window rounded-sm' } },
  ],
}

/* Display windows */

export const alert = {
  slots: {
    root: 'window mesh rounded-sm',
    title: 'font-display font-black text-base uppercase tracking-[0.04em] glow',
    description: 'font-mono',
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

/* Form fields: each control is a different physical mechanism */

const fieldTheme = {
  slots: {
    base: fieldBase,
    leadingIcon: 'text-muted',
    trailingIcon: 'text-muted',
  },
  compoundVariants: fieldVariants,
}

export const input = fieldTheme
export const inputNumber = fieldTheme

// Notes print on a teletype sheet, not on glass: continuous-feed paper in ink.
export const textarea = {
  slots: {
    root: 'paper tractor-feed teletype rounded-none focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[color-mix(in_oklab,var(--ui-text)_30%,transparent)]',
    base: 'font-mono leading-6 resize-none bg-transparent text-(--ui-text) placeholder:text-(--ui-text-muted) caret-(--ui-text) ring-0 focus-visible:outline-none',
  },
  compoundVariants: [
    { variant: ['outline', 'soft', 'subtle', 'ghost', 'none'], class: { base: 'bg-transparent hover:bg-transparent focus:bg-transparent disabled:bg-transparent dark:disabled:bg-transparent' } },
  ],
}

// Tags are cut label tape fed from a dark label-maker well; new text is typed in the well.
export const inputTags = {
  slots: {
    base: 'recess [--bezel:0.25rem] [--bezel-radius:0.5rem] rounded-(--bezel-radius) border-(length:--bezel) border-transparent font-mono',
    item: `label-tape ${tape.white} rounded-[2px] font-mono text-[10px]`,
    itemDelete: 'text-(--tape-ink) hover:text-(--tape-ink) hover:bg-black/10',
    input: 'bg-transparent text-(--vfd-key-legend) placeholder:text-[color-mix(in_oklab,var(--vfd-key-legend)_45%,transparent)] caret-(--vfd) uppercase tracking-[0.12em] focus:outline-none',
  },
  compoundVariants: [
    ...perColor('base', litVfd),
    ...perColor('item', pigment),
    // Nuxt UI's variant fill and ring come after slot classes; put the well and the tape back on top.
    {
      color: colors,
      class: {
        base: 'bg-(--vfd-slot) hover:bg-(--vfd-slot) focus:bg-(--vfd-slot) has-focus:bg-(--vfd-slot) ring-0 has-focus-visible:outline-0 has-focus:light-ring-on',
        item: 'bg-(--tape) text-(--tape-ink) ring-0',
        itemDelete: 'text-(--tape-ink) hover:text-(--tape-ink) hover:bg-black/10',
      },
    },
    { highlight: true, class: { base: 'light-ring-on' } },
  ],
}

// A channel thumbwheel: a detented drum with a lit index window; its menu is still a VFD screen.
const selectTheme = {
  slots: {
    base: 'thumbwheel [--bezel:0.25rem] [--bezel-radius:0.5rem] rounded-(--bezel-radius) relative inline-flex items-center font-mono focus-visible:outline-0',
    value: 'glow text-(--vfd) font-semibold uppercase tracking-[0.12em]',
    placeholder: 'text-[color-mix(in_oklab,var(--vfd)_40%,var(--vfd-window))] uppercase tracking-[0.12em]',
    leadingIcon: 'text-muted',
    // The drum is its own affordance; no dropdown chevron.
    trailingIcon: 'hidden',
    content: menuCard,
    label: 'font-mono uppercase tracking-[0.12em] text-[10px] text-muted',
    item: menuItem,
    itemLeadingIcon: 'text-current group-data-highlighted:not-group-data-disabled:text-current',
    itemDescription: 'text-current opacity-70',
  },
  compoundVariants: [
    ...perColor('base', litVfd),
    ...perColor('value', litVfd),
    ...perColor('content', litVfd),
    // The wheel keeps its own dark finish through Nuxt UI's variant backgrounds.
    { variant: ['outline', 'soft', 'subtle', 'ghost', 'none'], class: { base: 'bg-(--vfd-slot) hover:bg-(--vfd-slot) focus:bg-(--vfd-slot) ring-0 focus-visible:light-ring-on' } },
    { highlight: true, class: { base: 'light-ring-on' } },
  ],
}

export const select = selectTheme
export const selectMenu = selectTheme

// A code entered on counter keys seated in a recessed tray.
export const pinInput = {
  slots: {
    root: 'recess rounded-[6px] p-1 inline-flex items-center gap-1.5',
    base: 'keycap font-mono font-semibold rounded-[3px] text-center ring-0 caret-(--vfd) focus-visible:outline-0',
    separator: 'text-(--vfd-ghost) flex items-center justify-center',
  },
  compoundVariants: [
    ...perColor('base', litVfd),
    { color: colors, class: { base: `${keyBg} focus:bg-(--vfd-key) text-(--vfd-key-legend) focus:text-(--vfd) ring-0 focus-visible:outline-0 focus-visible:light-ring-on` } },
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

// An illuminated push button: a tick printed on a tinted lens, in a housing ringed with light.
// The lamp lights the lens and the ring when checked; the printed tick reads dark against it.
export const checkbox = {
  slots: {
    base: 'keycap lens legend-check light-ring data-[state=checked]:light-ring-on rounded-[3px]',
    indicator: 'lens-lit',
    icon: 'text-[oklch(14%_0.01_220/0.85)]',
    label: `${legend} text-xs`,
    description: 'text-xs',
  },
  compoundVariants: [
    ...perColor('base'),
    { size: 'sm', class: { base: 'size-4' } },
    { size: 'md', class: { base: 'size-5', icon: 'size-4' } },
    { size: 'lg', class: { base: 'size-6', icon: 'size-4.5' } },
    { size: 'xl', class: { base: 'size-7', icon: 'size-5' } },
  ],
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

// A metal toggle: a chrome knob riding in a slot ringed by a light that comes on with it.
const switchTheme = {
  slots: {
    base: 'recess light-ring rounded-full data-[state=unchecked]:bg-(--vfd-slot)',
    thumb: 'metal rounded-full',
    label: `${legend} text-xs`,
    description: 'text-xs',
  },
  compoundVariants: [
    ...perColor('base'),
    { color: colors, class: { base: 'data-[state=checked]:bg-(--vfd-slot) data-[state=checked]:light-ring-on' } },
  ],
}

export { switchTheme as switch }

// A mixer fader: a wide knurled cap with a centre line, over a segmented LED trail and a printed scale.
export const slider = {
  slots: {
    track: 'recess bg-(--vfd-slot) rounded-none overflow-visible',
    range: 'rounded-none glow-svg',
    thumb: 'keycap bg-(--vfd-key) rounded-[2px] ring-0 relative w-8 h-4',
  },
  compoundVariants: [
    ...perColor('root'),
    ...perColor('thumb'),
    { color: colors, class: { range: 'bg-transparent' } },
    { orientation: 'horizontal', class: { root: 'scale pb-2.5', range: 'led-bar', thumb: 'dished needle' } },
    { orientation: 'vertical', class: { root: 'scale-y ps-2.5', range: 'led-bar-y', thumb: 'dished-y needle-y' } },
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
        // The LED is the lamp; a key's icon stays plain ink and only brightens when latched.
        trigger: 'keycap bg-(--vfd-key) rounded-[2px] text-muted before:led data-[state=active]:before:led-on',
        leadingIcon: 'text-muted group-data-[state=active]:text-highlighted',
      },
    },
    { color: colors, variant: 'pill', class: { trigger: 'data-[state=active]:text-(--vfd)' } },
    // A tuner dial: stations on lit glass above a tick scale, with a red pointer riding the scale under the active one.
    {
      variant: 'link',
      class: {
        list: 'window rounded-xs border-0 px-2 [--scale-step:8px] [--scale-height:8px]',
        indicator: '[--vfd:var(--ui-error)] bg-transparent',
        trigger: 'text-muted data-[state=active]:text-highlighted data-[state=active]:glow',
      },
    },
    { orientation: 'horizontal', variant: 'link', class: { list: 'scale pt-1 pb-3.5', indicator: 'needle top-auto bottom-0 h-3.5' } },
    { orientation: 'vertical', variant: 'link', class: { list: 'scale-y ps-3.5 py-1', indicator: 'needle-y start-0 end-auto w-3.5' } },
  ],
}

// File folders: staggered manila tabs; the open folder shows a paper sheet filed inside.
export const accordion = {
  slots: {
    root: 'folder-stack manila pt-1',
    item: 'folder border-0',
    trigger: `folder-tab flex-none rounded-t-md rounded-b-none ${legend} text-xs px-4 py-0`,
    // A folder tab carries only its label.
    trailingIcon: 'hidden',
    content: 'folder-face',
    // The details are a sheet of paper filed inside the folder.
    // The sheet is cut square; only the folder stock has a folded tab.
    body: 'paper rounded-none px-4 pt-3 pb-[calc(0.75rem+var(--folder-tab-height)-var(--folder-lip))] text-sm',
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

/* Overlays: hardware for tasks, paper for notes, VFD screens for menus */

// A rack-mount module: a faceplate with rack ears and screws.
export const modal = {
  slots: {
    overlay: 'bg-black/55',
    title: 'silkscreen text-xs',
    description: 'text-xs',
    close: `${closeKey} end-12`,
    wrapper: 'pe-24',
  },
  // A compound, so the faceplate merges after the `fullscreen` variant's `shadow-lg`.
  compoundVariants: [
    { fullscreen: [true, false], class: { content: 'rack bg-(--vfd-chassis) rounded-sm ring-0' } },
  ],
}

// A drawer pulled out of the chassis, with a metal leading edge and recessed finger pull.
export const slideover = {
  slots: {
    overlay: 'bg-black/55',
    content: 'drawer bg-(--vfd-chassis) rounded-none ring-0',
    title: 'silkscreen text-xs',
    description: 'text-xs',
    close: closeKey,
    wrapper: 'pe-20',
  },
  compoundVariants: [
    { side: 'right', class: { content: 'drawer-front-left' } },
    { side: 'left', class: { content: 'drawer-front-right', close: 'end-8' } },
    { side: 'bottom', class: { content: 'drawer-front-top', close: 'top-8' } },
    { side: 'top', class: { content: 'drawer-front-bottom' } },
  ],
}

// A note clipped to its trigger.
export const popover = {
  slots: {
    content: 'note bg-(--paper) rounded-[2px] ring-0',
  },
}

export const dropdownMenu = {
  slots: {
    content: `${menuCard} [--vfd:var(--ui-primary)]`,
    label: 'font-mono uppercase tracking-[0.12em] text-[10px] text-muted',
    item: 'font-mono before:rounded-[1px]',
    itemDescription: 'text-current opacity-70',
  },
  compoundVariants: [
    ...perColor('item'),
    { active: false, class: { item: 'text-(--vfd) data-highlighted:text-(--vfd-window) data-[state=open]:text-(--vfd-window) data-highlighted:before:bg-(--vfd) data-[state=open]:before:bg-(--vfd)', itemLeadingIcon: 'text-current group-data-highlighted:text-current group-data-[state=open]:text-current' } },
    { active: true, class: { item: 'text-(--vfd-window) before:bg-(--vfd)', itemLeadingIcon: 'text-current' } },
  ],
}

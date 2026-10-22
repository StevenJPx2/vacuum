# Vacuum

An 80s hardware UI kit for Nuxt, built on [Nuxt UI](https://ui.nuxt.com). Every component is a physical object: keys you press, lamps that light, fields behind smoked glass and stitched patches. It adds SVG display components for vacuum fluorescent readouts: segment digits, dot-matrix text, bar-graph meters and annunciator lamps.

- **Dark** is a black hi-fi chassis with silkscreened legends.
- **Daylight** is a brushed silver chassis with dark legends.
- **Display windows** are dark smoked glass with lit phosphor in both modes.

| Component | Material |
|---|---|
| Button, Kbd, Avatar, Pagination | Keycaps that travel when pressed; `subtle` keys carry an LED, `active` keys latch down |
| Checkbox, Radio group, Switch | Light-up push keys, interlocking radio keys with LEDs, a knurled slide switch that backlights |
| Slider, Progress | A mixer fader over a segmented LED trail and printed scale, and a segmented LED bar graph |
| Tabs | `pill`: latching source-selector keys in a recessed tray. `link`: a tuner dial with a sliding needle |
| Accordion | A stack of manila file folders; the open one pulls forward |
| Table | A printout on continuous-feed green-bar paper |
| Input, Select, Textarea, Pin input, Breadcrumb | Display windows with glowing phosphor text |
| Alert, Toast, Tooltip | Display windows with dot-matrix titles |
| Badge | Embroidered patches: twill fabric, merrowed edges, satin-stitch lettering |
| Card | Screens in a moulded frame; `solid` is lit edge to edge, `soft` is bare glass |
| Modal, Slideover, Popover, Dropdown | Raised chassis panels |

## Setup

```bash
bun add @fdcn/vacuum tailwindcss
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@fdcn/vacuum'],
  css: ['~/assets/css/main.css'],
  vacuum: {
    phosphor: 'amber', // 'amber' | 'cyan' | 'green' | 'red'
    glow: 'soft', // 'off' | 'soft' | 'strong'
    prefix: 'V',
    font: true, // download and self-host Ioskeley Mono
  },
})
```

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@nuxt/ui";
@import "@fdcn/vacuum";
```

```vue
<!-- app.vue -->
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
```

Vacuum installs `@nuxt/ui` for you and defaults colour mode to dark.

## Typefaces

| Role | Face |
|---|---|
| Body, legends, fields (`font-sans`, `font-mono`) | [Ioskeley Mono](https://github.com/ahatem/IoskeleyMono) (OFL-1.1) |
| Silkscreened labels (`font-label`) | Michroma |
| Dot-matrix titles (`font-display`) | Doto |

Ioskeley Mono isn't on a font provider, so at build time Vacuum downloads five weights from the pinned `v2.2.0` release and serves them from `/_vacuum/fonts`, where `@nuxt/fonts` self-hosts them. Set `font: false` to skip the download.

## Display components

```vue
<VSegmentDisplay value="12:45" size="xl" />
<VSegmentDisplay value="VACUUM" :segments="14" color="info" />
<VDotMatrix text="NOW PLAYING" />
<VMeter :value="72" :warning="0.7" :danger="0.9" />
<VAnnunciator label="Rec" color="error" active blink />
<VPanel title="Tuner" caption="98.7 MHz">…</VPanel>
```

Every display takes `color` (any Nuxt UI semantic colour) and `size`. Segment and dot-matrix displays also accept `ghost`, `blink` and `warmup`.

## Runtime switching

```ts
const { phosphor, glow } = useVacuum()
phosphor.value = 'cyan'
glow.value = 'strong'
```

## Utilities

Every component theme is a composition of these utilities; the showcase's Materials section shows each on its own.

| Class | Effect |
|---|---|
| `chassis` | Raised panel: black in dark mode, brushed silver in daylight |
| `keycap` | Plastic key that travels on press; colour comes from its background. Latches with `.latched`, `aria-pressed`, `aria-checked` or `data-state="on/active/checked"`; `latch-on-checked` latches when a control inside is checked |
| `knurled`, `knurled-y` | Moulded grip grooves at a keycap's centre |
| `dished`, `dished-y` | A concave keycap top |
| `window` | Smoked display glass; Nuxt UI text and colour tokens inside it read as lit phosphor |
| `screen`, `screen-lit` | Glass set in a moulded plastic frame on one element, corners concentric; `screen-lit` is lit edge to edge |
| `bezel` | Moulded plastic frame around any child, whose corners follow the frame's (`--bezel`, `--bezel-radius`) |
| `recess` | Recessed slot or groove |
| `paper`, `manila`, `ink` | Paper stock printed in ink; `ink` alone re-points text tokens to ink |
| `tractor-feed`, `greenbar` | Continuous-feed margins with holes and perforations; alternating green rows |
| `folder-stack`, `folder`, `folder-tab`, `folder-face` | Stacked file folders with staggered tabs stepping down in a staircase; the `data-state="open"` folder pulls forward, and `paper` inside its face is white sheet stock |
| `patch`, `embroidered` | Embroidered patch; set `--patch-fabric`, `--patch-edge`, `--patch-thread` |
| `silkscreen` | Printed chassis label |
| `led`, `led-on` | Indicator LED (`--led-size`), unlit and lit; works on `before:`/`after:` |
| `needle`, `needle-y` | Glowing index line across a positioned element's centre |
| `scale`, `scale-y` | Printed tick marks (`--scale-step`, `--scale-height`) |
| `segments`, `segments-y` | Cut an element into bar-graph segments |
| `glow`, `glow-box`, `glow-svg` | Phosphor glow on text, boxes and SVG |
| `ghost` | Unlit segment tint |
| `mesh` | Control-grid overlay |
| `animate-vfd-warmup`, `animate-vfd-flicker`, `animate-vfd-blink` | Tube animations; pair with `motion-safe:` |

Glow and LEDs follow the `--vfd` colour of the nearest themed component. Materials write Tailwind's `--tw-shadow`, so they compose with `ring-*` and `glow-box`, and replace `shadow-*` when classes merge.

## Customising

The theme is a preset in `app.config` (`ui.button`, `ui.card`, …), so your own `app/app.config.ts`, the `ui` prop and `class` override it as usual in Nuxt UI.

## Development

```bash
bun install
bun run dev        # playground with the showcase page
bun run lint
bun run test
bun run test:types
bun run prepack    # build dist
```

The 14-segment table and the 5×7 dot-matrix font come from Adafruit's [LED Backpack](https://github.com/adafruit/Adafruit_LED_Backpack) (MIT) and [GFX](https://github.com/adafruit/Adafruit-GFX-Library) (BSD-2-Clause) libraries.

## License

MIT

# Vacuum

An 80s hardware UI kit for Nuxt, built on [Nuxt UI](https://ui.nuxt.com). Every component is a physical object: keys you press, lamps that light, screens behind smoked glass, label tape and paper. It adds SVG display components for vacuum fluorescent readouts: segment digits, dot-matrix text, bar-graph meters and annunciator lamps.

- **Dark** is a black hi-fi chassis with silkscreened legends.
- **Daylight** is a brushed silver chassis with dark legends.
- **Display windows** are dark smoked glass with lit phosphor in both modes.

| Component | Material |
|---|---|
| Button, Kbd, Avatar, Pagination | Keycaps that travel when pressed; `subtle` keys carry an LED, `active` keys latch down |
| Checkbox | An illuminated push button: a tick printed on a tinted lens in a light-ringed housing; checking lights both |
| Radio group | Interlocking radio keys with indicator LEDs |
| Switch | A chrome toggle knob in a slot ringed by a light that comes on with it |
| Slider, Progress | A mixer fader over a segmented LED trail and printed scale, and a segmented LED bar graph |
| Tabs | `pill`: latching source-selector keys in a recessed tray. `link`: a tuner dial with a sliding needle |
| Accordion | A stack of manila file folders; the open one shows a paper sheet filed inside |
| Table | A printout on continuous-feed green-bar paper |
| Input, Select, Textarea, Pin input | Small screens in a thin moulded frame; `highlight` lights a ring around the frame |
| Breadcrumb | A display window |
| Alert, Toast, Tooltip | Display windows with dot-matrix titles |
| Badge | Label-maker tape with embossed letters: dyed (`solid`), clear (`outline`), black (`soft`), white (`subtle`) |
| Card | Screens in a moulded frame; `solid` is lit edge to edge, `soft` is bare glass |
| Modal | A rack-mount module with rack ears and screws |
| Slideover | A drawer pulled out on telescopic runners |
| Dropdown menu, Select menus | A printed menu card punched for a binder; the hovered line is highlighted |
| Popover | A paper note held by a paperclip |

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

## Icons

Nuxt UI's built-in icons (chevrons, close, check, loading, alerts…) are mapped to the [Pixel Icon Library](https://pixeliconlibrary.com) by HackerNoon, licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), which ships with the package as `@iconify-json/pixel`. Use any of its icons as `i-pixel-*`, for example `<UIcon name="i-pixel-cassette-tape" />`. The mapping lives in `src/runtime/icons.ts`; override any of it in your `app.config.ts` under `ui.icons`.

`@nuxt/icon` finds collections installed under your app's or workspace's `node_modules`, which covers bun and npm installs. With pnpm's strict layout, add `@iconify-json/pixel` to your app's dependencies too, or the icons load from the Iconify API at runtime.

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
| `paper`, `manila`, `ink` | Paper stock (`--paper`) printed in ink; `ink` alone re-points text tokens to ink and defines `--highlighter` |
| `tractor-feed`, `greenbar` | Continuous-feed margins with holes and perforations; alternating green rows |
| `folder-stack`, `folder`, `folder-tab`, `folder-face` | Stacked file folders with staggered tabs stepping down in a staircase; only tabs and open faces take clicks; the `data-state="open"` folder shows its face, and `paper` inside it is white sheet stock |
| `rack` | Rack-mount faceplate with ears and screws (`--rack-ear`) |
| `rails`, `rails-y` | Telescopic drawer runners top and bottom, or on the sides (`--rail`) |
| `label-tape`, `embossed` | Label-maker tape (`--tape`, `--tape-ink`) and raised lettering |
| `metal` | Polished metal for knobs and levers |
| `light-ring`, `light-ring-on` | An illuminated ring around a control's housing, dim and lit |
| `lens`, `lens-lit` | A tinted lens over a lamp, unlit and glowing; `lens` composes with `keycap` |
| `legend-check` | A tick printed on a key, always present like a real legend (`--legend-ink`) |
| `punched` | Binder punch holes down a sheet's left margin |
| `note` | Paper held by a paperclip, set down slightly askew |
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

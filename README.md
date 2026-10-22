# Vacuum

A vacuum fluorescent display UI kit for Nuxt. Vacuum themes every [Nuxt UI](https://ui.nuxt.com) component with glowing phosphor colours, square edges and a control-grid mesh, and adds SVG display components: segment readouts, dot-matrix text, bar-graph meters and annunciator lamps.

- **Dark** is a lit tube: near-black glass, text glowing in the primary phosphor, unlit segments faintly visible.
- **Daylight** is the same display switched off under ambient light: grey glass with deep phosphor tones and no glow.

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

| Class | Effect |
|---|---|
| `glow` | Phosphor text glow |
| `glow-box` | Phosphor box glow |
| `glow-svg` | Phosphor glow for SVG shapes |
| `ghost` | Unlit segment tint |
| `mesh` | Control-grid overlay |
| `animate-vfd-warmup`, `animate-vfd-flicker`, `animate-vfd-blink` | Tube animations; pair with `motion-safe:` |

Glow follows the `--vfd` colour of the nearest themed component and falls back to the current text colour.

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

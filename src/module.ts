import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'pathe'
import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule, updateAppConfig, useLogger } from '@nuxt/kit'
import { name, version } from '../package.json'
import { icons } from './runtime/icons'
import * as theme from './runtime/theme'
import { phosphorColors } from './runtime/utils/phosphor'
import type { Glow, Phosphor } from './runtime/utils/phosphor'

export type { Glow, Phosphor }

const IOSKELEY_RELEASE = 'https://raw.githubusercontent.com/ahatem/IoskeleyMono/v2.2.0/site/fonts'

/** Release file → cached name. The name carries the weight and style that @nuxt/fonts' local provider reads. */
const IOSKELEY_FILES = {
  Regular: 'ioskeley-mono-regular',
  Italic: 'ioskeley-mono-italic',
  Medium: 'ioskeley-mono-medium',
  SemiBold: 'ioskeley-mono-semi-bold',
  Bold: 'ioskeley-mono-bold',
}

export interface ModuleOptions {
  /** Phosphor colour used as `primary`. */
  phosphor: Phosphor
  /** Glow intensity of lit elements. */
  glow: Glow
  /** Prefix of the display components (`VSegmentDisplay`, `VMeter`, …). */
  prefix: string
  /** Download and self-host Ioskeley Mono, the kit's typeface. */
  font: boolean
}

const logger = useLogger('vacuum')

async function cacheIoskeley(dir: string) {
  await mkdir(dir, { recursive: true })
  await Promise.all(Object.entries(IOSKELEY_FILES).map(async ([file, cached]) => {
    const target = join(dir, `${cached}.woff2`)
    if (existsSync(target)) return
    const response = await fetch(`${IOSKELEY_RELEASE}/IoskeleyMono-${file}.woff2`)
    if (!response.ok) throw new Error(`${response.status} for IoskeleyMono-${file}.woff2`)
    await writeFile(target, new Uint8Array(await response.arrayBuffer()))
  }))
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'vacuum',
  },
  defaults: {
    phosphor: 'amber',
    glow: 'soft',
    prefix: 'V',
    font: true,
  },
  moduleDependencies: {
    '@nuxt/ui': {
      version: '>=4.12.0',
      defaults: {
        // Keycaps and switches carry their own transitions.
        theme: { transitions: false },
      },
    },
    '@nuxt/fonts': {
      optional: true,
      defaults: {
        families: [
          { name: 'Ioskeley Mono', provider: 'local', weights: [400, 500, 600, 700], styles: ['normal', 'italic'] },
        ],
      },
    },
    '@nuxtjs/color-mode': {
      optional: true,
      defaults: {
        preference: 'dark',
        fallback: 'dark',
      },
    },
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    if (options.font) {
      // Ioskeley Mono isn't on a font provider. Cache the release files and serve them as public
      // assets, where @nuxt/fonts' local provider picks them up and self-hosts each weight.
      const dir = join(nuxt.options.rootDir, 'node_modules/.cache/vacuum/fonts')
      try {
        await cacheIoskeley(dir)
        nuxt.options.nitro.publicAssets ||= []
        nuxt.options.nitro.publicAssets.push({ dir, baseURL: '/_vacuum/fonts', maxAge: 60 * 60 * 24 * 365 })
      }
      catch (error) {
        logger.warn('Could not download Ioskeley Mono; falling back to the system monospace font.', error)
      }
    }

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: resolve('./runtime/types/app.config.d.ts') })
    })

    updateAppConfig({
      ui: {
        colors: phosphorColors(options.phosphor),
        icons,
        // Materials draw their own shadow stack, so they replace Nuxt UI's `shadow-*` when merged.
        tv: {
          twMergeConfig: {
            extend: {
              classGroups: {
                'shadow': ['keycap', 'window', 'screen', 'screen-lit', 'bezel', 'chassis', 'rack', 'rails', 'rails-y', 'recess', 'paper', 'note', 'metal', 'label-tape'],
                'ring-w': ['light-ring', 'light-ring-on'],
              },
            },
          },
        },
        ...theme,
      },
      vacuum: {
        phosphor: options.phosphor,
        glow: options.glow,
      },
    })

    addPlugin(resolve('./runtime/plugin'))
    addImportsDir(resolve('./runtime/composables'))
    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix,
    })
  },
})

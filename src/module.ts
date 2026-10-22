import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule, updateAppConfig } from '@nuxt/kit'
import { name, version } from '../package.json'
import * as theme from './runtime/theme'
import { phosphorColors } from './runtime/utils/phosphor'
import type { Glow, Phosphor } from './runtime/utils/phosphor'

export type { Glow, Phosphor }

export interface ModuleOptions {
  /** Phosphor colour used as `primary`. */
  phosphor: Phosphor
  /** Glow intensity of lit elements in dark mode. */
  glow: Glow
  /** Prefix of the display components (`VSegmentDisplay`, `VMeter`, …). */
  prefix: string
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
  },
  moduleDependencies: {
    '@nuxt/ui': {
      version: '>=4.12.0',
    },
    '@nuxtjs/color-mode': {
      optional: true,
      defaults: {
        preference: 'dark',
        fallback: 'dark',
      },
    },
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: resolve('./runtime/types/app.config.d.ts') })
    })

    updateAppConfig({
      ui: {
        colors: phosphorColors(options.phosphor),
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

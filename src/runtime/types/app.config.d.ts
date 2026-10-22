import type { Glow, Phosphor } from '../utils/phosphor'

declare module '@nuxt/schema' {
  interface AppConfigInput {
    vacuum?: {
      phosphor?: Phosphor
      glow?: Glow
    }
  }
  interface CustomAppConfig {
    vacuum: {
      phosphor: Phosphor
      glow: Glow
    }
  }
}

export {}

import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { phosphorColors } from '../utils/phosphor'
import type { Glow, Phosphor } from '../utils/phosphor'

export function useVacuum() {
  const appConfig = useAppConfig()

  const phosphor = computed<Phosphor>({
    get: () => appConfig.vacuum.phosphor,
    set: (value) => {
      appConfig.vacuum.phosphor = value
      Object.assign(appConfig.ui.colors, phosphorColors(value))
    },
  })

  const glow = computed<Glow>({
    get: () => appConfig.vacuum.glow,
    set: (value) => {
      appConfig.vacuum.glow = value
    },
  })

  return { phosphor, glow }
}

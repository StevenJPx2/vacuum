import { computed } from 'vue'
import { defineNuxtPlugin, useAppConfig, useHead } from '#imports'

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()

  useHead({
    htmlAttrs: {
      'data-vacuum-glow': computed(() => appConfig.vacuum.glow),
    },
  })
})

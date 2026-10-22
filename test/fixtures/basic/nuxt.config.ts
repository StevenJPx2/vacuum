import Vacuum from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    Vacuum,
  ],
  vacuum: {
    phosphor: 'cyan',
    glow: 'strong',
  },
})

import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('maps the phosphor option to Nuxt UI colours', async () => {
    const html = await $fetch<string>('/')
    expect(html).toContain('--ui-color-primary-500: var(--color-phosphor-cyan-500')
    expect(html).toContain('--ui-color-neutral-500: var(--color-glass-500')
  })

  it('sets the glow attribute on <html>', async () => {
    const html = await $fetch<string>('/')
    expect(html).toMatch(/<html[^>]*data-vacuum-glow="strong"/)
  })

  it('registers prefixed display components', async () => {
    const html = await $fetch<string>('/')
    expect(html).toContain('aria-label="12:34"')
    expect(html).toContain('aria-label="HI"')
  })

  it('applies the theme preset to Nuxt UI components', async () => {
    const html = await $fetch<string>('/')
    expect(html).toMatch(/<button[^>]*class="[^"]*uppercase[^"]*keycap/)
  })

  it('lets materials replace Nuxt UI shadows when classes merge', async () => {
    const html = await $fetch<string>('/')
    const thumb = html.match(/data-slot="thumb"[^>]*class="([^"]*)"|class="([^"]*)"[^>]*data-slot="thumb"/)
    const classes = thumb?.[1] ?? thumb?.[2] ?? ''
    expect(classes).toContain('keycap')
    expect(classes).not.toMatch(/\bshadow-lg\b/)
  })

  it('applies slot-level colour and variant overrides', async () => {
    const html = await $fetch<string>('/')
    expect(html).toMatch(/data-slot="root"[^>]*class="[^"]*\[--vfd:var\(--ui-error\)\][^"]*glow-box/)
  })
})

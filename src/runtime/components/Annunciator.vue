<script setup lang="ts">
import { vfd } from '../theme/shared'
import type { VfdColor } from '../theme/shared'

withDefaults(defineProps<{
  label: string
  /** Whether the lamp is lit. */
  active?: boolean
  color?: VfdColor
  /** `solid` lights the whole lens; `outline` lights the legend and frame. */
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  blink?: boolean
}>(), {
  color: 'primary',
  variant: 'outline',
  size: 'md',
})

const sizes = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-xs px-2 py-1',
  lg: 'text-sm px-3 py-1.5',
}
</script>

<template>
  <span
    role="status"
    :aria-label="`${label}: ${active ? 'on' : 'off'}`"
    :class="[
      'window inline-flex items-center justify-center rounded-xs font-mono uppercase tracking-[0.18em] select-none',
      vfd[color],
      sizes[size],
      active
        ? (variant === 'solid'
          ? 'bg-(--vfd) text-inverted glow-box'
          : 'text-(--vfd) glow ring ring-inset ring-(--vfd)/60')
        : 'ghost',
      active && blink && 'motion-safe:animate-vfd-blink',
    ]"
  >
    {{ label }}
  </span>
</template>

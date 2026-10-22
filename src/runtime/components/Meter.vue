<script setup lang="ts">
import { computed } from 'vue'
import { vfd } from '../theme/shared'
import type { VfdColor } from '../theme/shared'

const props = withDefaults(defineProps<{
  value: number
  min?: number
  max?: number
  /** Number of bars in the graph. */
  bars?: number
  color?: VfdColor
  /** Fraction (0–1) from which bars light in `warning`. */
  warning?: number
  /** Fraction (0–1) from which bars light in `error`. */
  danger?: number
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  ghost?: boolean
  label?: string
}>(), {
  min: 0,
  max: 100,
  bars: 24,
  color: 'primary',
  orientation: 'horizontal',
  size: 'md',
  ghost: true,
})

const sizes = {
  horizontal: { sm: 'h-3', md: 'h-5', lg: 'h-8' },
  vertical: { sm: 'w-3', md: 'w-5', lg: 'w-8' },
}

const level = computed(() => {
  const span = props.max - props.min
  const fraction = span > 0 ? (props.value - props.min) / span : 0
  return Math.min(1, Math.max(0, fraction))
})

const items = computed(() => Array.from({ length: props.bars }, (_, index) => {
  const position = (index + 1) / props.bars
  let color: VfdColor = props.color
  if (props.danger !== undefined && position > props.danger) color = 'error'
  else if (props.warning !== undefined && position > props.warning) color = 'warning'
  return { lit: position <= level.value + 1e-9, color }
}))
</script>

<template>
  <div
    role="meter"
    :aria-valuenow="value"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-label="label"
    :class="[
      'inline-flex gap-[2px]',
      orientation === 'horizontal' ? 'flex-row w-full' : 'flex-col-reverse h-full',
      sizes[orientation][size],
    ]"
  >
    <span
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'flex-1 skew-x-[-8deg]',
        vfd[item.color],
        item.lit ? 'bg-(--vfd) glow-box' : ghost && 'ghost bg-current',
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { vfd } from '../theme/shared'
import type { VfdColor } from '../theme/shared'
import { dotGlyph } from '../utils/glyphs'

const props = withDefaults(defineProps<{
  text: string
  /** Minimum number of character cells. */
  length?: number
  color?: VfdColor
  size?: 'sm' | 'md' | 'lg' | 'xl'
  ghost?: boolean
  /** Dot shape: round pixels or square grid cells. */
  dot?: 'round' | 'square'
  blink?: boolean
  warmup?: boolean
}>(), {
  color: 'primary',
  size: 'md',
  ghost: true,
  dot: 'round',
})

const ROWS = 8
const ADVANCE = 6

const sizes = {
  sm: 'h-4',
  md: 'h-6',
  lg: 'h-10',
  xl: 'h-16',
}

const dots = computed(() => {
  const chars = [...props.text.padEnd(props.length ?? 0, ' ')]
  const lit: [number, number][] = []
  const unlit: [number, number][] = []
  chars.forEach((char, index) => {
    dotGlyph(char).forEach((column, x) => {
      column.forEach((on, y) => {
        const point: [number, number] = [index * ADVANCE + x, y]
        if (on) lit.push(point)
        else unlit.push(point)
      })
    })
  })
  return { lit, unlit, width: chars.length * ADVANCE - 1 }
})
</script>

<template>
  <svg
    role="img"
    :aria-label="text"
    :viewBox="`0 0 ${dots.width} ${ROWS}`"
    :class="[
      'inline-block w-auto shrink-0 text-(--vfd) overflow-visible',
      vfd[color],
      sizes[size],
      blink && 'motion-safe:animate-vfd-blink',
      warmup && 'motion-safe:animate-vfd-warmup',
    ]"
  >
    <g
      v-if="ghost"
      class="ghost"
      aria-hidden="true"
    >
      <template v-if="dot === 'round'">
        <circle
          v-for="([x, y]) in dots.unlit"
          :key="`${x}:${y}`"
          :cx="x + 0.5"
          :cy="y + 0.5"
          r="0.38"
        />
      </template>
      <template v-else>
        <rect
          v-for="([x, y]) in dots.unlit"
          :key="`${x}:${y}`"
          :x="x + 0.1"
          :y="y + 0.1"
          width="0.8"
          height="0.8"
        />
      </template>
    </g>
    <g class="fill-current glow-svg">
      <template v-if="dot === 'round'">
        <circle
          v-for="([x, y]) in dots.lit"
          :key="`${x}:${y}`"
          :cx="x + 0.5"
          :cy="y + 0.5"
          r="0.42"
        />
      </template>
      <template v-else>
        <rect
          v-for="([x, y]) in dots.lit"
          :key="`${x}:${y}`"
          :x="x + 0.08"
          :y="y + 0.08"
          width="0.84"
          height="0.84"
        />
      </template>
    </g>
  </svg>
</template>

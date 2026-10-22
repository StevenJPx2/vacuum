<script setup lang="ts">
import { computed, useId } from 'vue'
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
const COLUMNS = 5
/** Unlit dots sit a touch smaller than lit ones, so the lit grid reads as brighter. */
const GHOST_RADIUS = 0.38
const LIT_RADIUS = 0.42

const sizes = {
  sm: 'h-4',
  md: 'h-6',
  lg: 'h-10',
  xl: 'h-16',
}

const ghostId = `vacuum-matrix-${useId()}`

const dots = computed(() => {
  const chars = [...props.text.padEnd(props.length ?? 0, ' ')]
  const lit: [number, number][] = []
  chars.forEach((char, index) => {
    dotGlyph(char).forEach((column, x) => {
      column.forEach((on, y) => {
        if (on) lit.push([index * ADVANCE + x, y])
      })
    })
  })
  return { lit, width: chars.length * ADVANCE - 1 }
})

/**
 * One path for every lit dot instead of one element per dot: a long display can carry
 * hundreds of dots, and creating that many nodes makes the browser recalculate style
 * for the whole subtree each time the display mounts or re-renders.
 */
const litPath = computed(() => {
  if (props.dot === 'square') {
    return dots.value.lit.map(([x, y]) => `M${x + 0.08} ${y + 0.08}h0.84v0.84h-0.84z`).join('')
  }
  return dots.value.lit.map(([x, y]) => {
    const cx = x + 0.5
    const top = y + 0.5 - LIT_RADIUS
    return `M${cx} ${top}a${LIT_RADIUS} ${LIT_RADIUS} 0 1 1 0 ${LIT_RADIUS * 2}a${LIT_RADIUS} ${LIT_RADIUS} 0 1 1 0 ${-LIT_RADIUS * 2}`
  }).join('')
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
    <defs
      v-if="ghost"
      class="ghost"
    >
      <!-- A tile of five dot cells, so the gaps between characters stay dark. -->
      <pattern
        :id="ghostId"
        :width="ADVANCE"
        height="1"
        patternUnits="userSpaceOnUse"
      >
        <template v-if="dot === 'round'">
          <circle
            v-for="column in COLUMNS"
            :key="column"
            :cx="column - 0.5"
            cy="0.5"
            :r="GHOST_RADIUS"
            fill="currentColor"
          />
        </template>
        <template v-else>
          <rect
            v-for="column in COLUMNS"
            :key="column"
            :x="column - 0.9"
            y="0.1"
            width="0.8"
            height="0.8"
            fill="currentColor"
          />
        </template>
      </pattern>
    </defs>
    <rect
      v-if="ghost"
      :width="dots.width"
      :height="ROWS"
      :fill="`url(#${ghostId})`"
    />
    <path
      class="fill-current glow-svg"
      :d="litPath"
    />
  </svg>
</template>

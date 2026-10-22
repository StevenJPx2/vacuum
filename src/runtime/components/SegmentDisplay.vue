<script setup lang="ts">
import { computed } from 'vue'
import { vfd } from '../theme/shared'
import type { VfdColor } from '../theme/shared'
import { COLON, DECIMAL_POINT, DIGIT, SEGMENT_POLYGONS, toCells } from '../utils/glyphs'
import type { Segments } from '../utils/glyphs'

const props = withDefaults(defineProps<{
  value: string | number
  /** Minimum number of digit cells; shorter values are padded with unlit cells. */
  length?: number
  segments?: Segments
  color?: VfdColor
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Show unlit segments faintly, as on a real tube. */
  ghost?: boolean
  /** Lean the digits forward like most VFD and LED readouts. */
  skew?: boolean
  /** Pad on the left (numbers) or the right (text). */
  align?: 'left' | 'right'
  blink?: boolean
  warmup?: boolean
}>(), {
  segments: 7,
  color: 'primary',
  size: 'md',
  ghost: true,
  skew: true,
  align: 'right',
})

const sizes = {
  sm: 'h-6',
  md: 'h-10',
  lg: 'h-16',
  xl: 'h-24',
}

const cells = computed(() => {
  const text = String(props.value)
  const cells = toCells(text, props.segments)
  const digits = cells.filter(cell => cell.kind === 'char').length
  const padding = Array.from({ length: Math.max(0, (props.length ?? 0) - digits) }, () => ({ kind: 'char' as const, bits: 0, dp: false }))
  return props.align === 'right' ? [...padding, ...cells] : [...cells, ...padding]
})

const layout = computed(() => {
  let x = 0
  return cells.value.map((cell) => {
    const offset = x
    x += cell.kind === 'colon' ? COLON.advance : DIGIT.advance
    return { cell, offset }
  })
})

const skewPad = computed(() => props.skew ? Math.tan(8 * Math.PI / 180) * DIGIT.height : 0)
const width = computed(() => layout.value.reduce((sum, { cell }) => sum + (cell.kind === 'colon' ? COLON.advance : DIGIT.advance), 0) + skewPad.value)
const polygons = computed(() => SEGMENT_POLYGONS[props.segments])

function lit(bits: number, index: number) {
  return Boolean(bits & (1 << index))
}
</script>

<template>
  <svg
    role="img"
    :aria-label="String(value)"
    :viewBox="`0 0 ${width} ${DIGIT.height}`"
    :class="[
      'inline-block w-auto shrink-0 text-(--vfd) overflow-visible',
      vfd[color],
      sizes[size],
      blink && 'motion-safe:animate-vfd-blink',
      warmup && 'motion-safe:animate-vfd-warmup',
    ]"
  >
    <g :transform="skew ? `translate(${skewPad} 0) skewX(-8)` : undefined">
      <g
        v-for="({ cell, offset }, index) in layout"
        :key="index"
        :transform="`translate(${offset} 0)`"
      >
        <template v-if="cell.kind === 'colon'">
          <circle
            v-for="(dot, dotIndex) in COLON.dots"
            :key="dotIndex"
            v-bind="dot"
            class="fill-current glow-svg"
          />
        </template>
        <template v-else>
          <template
            v-for="(points, segment) in polygons"
            :key="segment"
          >
            <polygon
              v-if="lit(cell.bits, segment)"
              :points="points"
              class="fill-current glow-svg"
            />
            <polygon
              v-else-if="ghost"
              :points="points"
              class="ghost"
              aria-hidden="true"
            />
          </template>
          <circle
            v-if="cell.dp || ghost"
            v-bind="DECIMAL_POINT"
            :class="cell.dp ? 'fill-current glow-svg' : 'ghost'"
          />
        </template>
      </g>
    </g>
  </svg>
</template>

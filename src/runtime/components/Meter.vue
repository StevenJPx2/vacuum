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

const inks: Record<VfdColor, string> = {
  primary: 'var(--ui-primary)',
  secondary: 'var(--ui-secondary)',
  success: 'var(--ui-success)',
  info: 'var(--ui-info)',
  warning: 'var(--ui-warning)',
  error: 'var(--ui-error)',
  neutral: 'var(--ui-text-highlighted)',
}

const clamp = (fraction: number) => Math.min(1, Math.max(0, fraction))
const barCount = computed(() => Math.max(1, Math.round(props.bars)))

/** Bars light whole, as they did when each one was its own element. */
const snap = (fraction: number) => Math.floor(clamp(fraction) * barCount.value + 1e-9) / barCount.value

const level = computed(() => {
  const span = props.max - props.min
  const fraction = span > 0 ? (props.value - props.min) / span : 0
  return clamp(fraction)
})

const lit = computed(() => snap(level.value))

/** The segment at the top of the lit range supplies the glow. */
const glowColor = computed<VfdColor>(() => {
  if (props.danger !== undefined && lit.value > props.danger) return 'error'
  if (props.warning !== undefined && lit.value > props.warning) return 'warning'
  return props.color
})

/**
 * Colour zones as one gradient across the full track. The lit range is then clipped
 * out of it, so segment tiles stay aligned with the ghost track at every level.
 */
const ink = computed(() => {
  const stops: string[] = []
  const warning = props.warning !== undefined ? snap(props.warning) * 100 : undefined
  const danger = props.danger !== undefined ? snap(props.danger) * 100 : undefined
  const angle = props.orientation === 'horizontal' ? '90deg' : '0deg'
  let from = 0
  let color = inks[props.color]
  if (warning !== undefined && (danger === undefined || warning <= danger)) {
    stops.push(`${color} ${from}% ${warning}%`)
    from = warning
    color = 'var(--ui-warning)'
  }
  if (danger !== undefined) {
    stops.push(`${color} ${from}% ${danger}%`)
    from = danger
    color = 'var(--ui-error)'
  }
  stops.push(`${color} ${from}% 100%`)
  return `linear-gradient(${angle}, ${stops.join(', ')})`
})

const litStyle = computed(() => {
  const visible = lit.value * 100
  return props.orientation === 'horizontal'
    ? { clipPath: `inset(0 ${100 - visible}% 0 0)`, backgroundImage: ink.value }
    : { clipPath: `inset(${100 - visible}% 0 0 0)`, backgroundImage: ink.value }
})
</script>

<template>
  <div
    role="meter"
    :aria-valuenow="value"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-label="label"
    :style="{ '--bars': barCount }"
    :class="[
      'relative inline-flex skew-x-[-8deg]',
      orientation === 'horizontal' ? 'flex-row w-full' : 'flex-col-reverse h-full',
      sizes[orientation][size],
    ]"
  >
    <span
      v-if="ghost"
      class="ghost absolute inset-0"
      :class="orientation === 'horizontal' ? 'meter-ghost' : 'meter-ghost-y'"
      aria-hidden="true"
    />
    <!--
      The glow sits on a wrapper: its filter runs after the child's mask and clip, so the
      drop-shadow follows each lit segment instead of forming one rectangle behind them.
    -->
    <span
      class="meter-lume absolute inset-0"
      :class="vfd[glowColor]"
      aria-hidden="true"
    >
      <span
        class="meter-ink absolute inset-0"
        :class="orientation === 'horizontal' ? 'meter-ink-x' : 'meter-ink-y'"
        :style="litStyle"
      />
    </span>
  </div>
</template>

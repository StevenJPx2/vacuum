<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  /** Small label in the top-right corner, such as a unit or channel. */
  caption?: string
  /** Overlay the control grid mesh. */
  mesh?: boolean
  /** Fade the panel in like a tube warming up. */
  warmup?: boolean
}>(), {
  mesh: true,
})
</script>

<template>
  <section
    :class="[
      'relative bg-default ring ring-default p-4 sm:p-5',
      'dark:shadow-[inset_0_0_32px_rgb(0_0_0/0.45)]',
      mesh && 'mesh',
      warmup && 'motion-safe:animate-vfd-warmup',
    ]"
  >
    <header
      v-if="title || caption || $slots.header"
      class="mb-3 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted"
    >
      <slot name="header">
        <span class="glow">{{ title }}</span>
        <span v-if="caption">{{ caption }}</span>
      </slot>
    </header>
    <slot />
  </section>
</template>

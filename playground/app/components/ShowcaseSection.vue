<script setup lang="ts">
defineProps<{
  id: string
  title: string
  description?: string
}>()
</script>

<template>
  <section
    :id="id"
    class="scroll-mt-24 space-y-6"
  >
    <header class="flex flex-wrap items-baseline justify-between gap-2 border-b border-default pb-3">
      <h2 class="font-mono text-sm uppercase tracking-[0.3em] text-highlighted glow">
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="font-mono text-xs text-muted"
      >
        {{ description }}
      </p>
    </header>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="grid gap-3 sm:grid-cols-[8rem_1fr] sm:items-center">
    <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-dimmed">{{ label }}</span>
    <div class="flex flex-wrap items-center gap-3">
      <slot />
    </div>
  </div>
</template>

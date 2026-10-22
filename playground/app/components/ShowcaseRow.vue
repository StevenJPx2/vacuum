<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="grid gap-3 sm:grid-cols-[8rem_1fr] sm:items-center">
    <span class="silkscreen text-[9px] text-muted">{{ label }}</span>
    <div class="flex flex-wrap items-center gap-3">
      <slot />
    </div>
  </div>
</template>

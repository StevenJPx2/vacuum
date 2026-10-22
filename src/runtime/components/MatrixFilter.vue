<script setup lang="ts">
import { matrixFilterSvg } from '../utils/matrixFilter'
</script>

<template>
  <div class="pointer-events-none absolute size-0 overflow-hidden">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="matrixFilterSvg" />
  </div>
</template>

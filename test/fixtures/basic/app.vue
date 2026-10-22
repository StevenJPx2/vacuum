<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <UApp>
    <VSegmentDisplay value="12:34" />
    <VDotMatrix text="HI" />
    <UButton label="Engage" />
    <USwitch label="Power" />
    <UAlert
      title="Pattern blue"
      color="error"
    />
    <output data-icon-close>{{ appConfig.ui.icons.close }}</output>
  </UApp>
</template>

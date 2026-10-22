<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <UApp>
    <VSegmentDisplay value="12:34" />
    <VDotMatrix text="HI" />
    <VMeter :value="55" />
    <UButton label="Engage" />
    <USwitch label="Power" />
    <UAlert
      title="Pattern blue"
      color="error"
    />
    <output data-icon-close>{{ appConfig.ui.icons.close }}</output>
  </UApp>
</template>

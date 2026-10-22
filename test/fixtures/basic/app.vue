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
    <UInput placeholder="Callsign" />
    <UInput
      variant="soft"
      placeholder="Soft"
    />
    <UInput
      variant="subtle"
      placeholder="Subtle"
    />
    <UInput
      variant="ghost"
      placeholder="Ghost"
    />
    <UInput
      variant="none"
      placeholder="None"
    />
    <UTextarea model-value="Pattern blue" />
    <USelect
      :items="[{ label: 'Channel 1', value: 'ch-1' }]"
      model-value="ch-1"
    />
    <UInputTags :model-value="['MAGI']" />
    <UPinInput :length="4" />
    <UAlert
      title="Pattern blue"
      color="error"
    />
    <output data-icon-close>{{ appConfig.ui.icons.close }}</output>
  </UApp>
</template>

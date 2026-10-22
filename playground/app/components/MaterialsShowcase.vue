<script setup lang="ts">
const surfaces = [
  { name: 'chassis', class: 'chassis rounded-sm' },
  { name: 'screen', class: 'screen mesh' },
  { name: 'bezel > window', class: 'bezel', inner: 'window mesh size-full' },
  { name: 'recess', class: 'recess rounded-[3px]' },
  { name: 'paper', class: 'paper' },
  { name: 'paper manila', class: 'paper manila rounded-sm' },
  { name: 'patch', class: 'patch [--patch-fabric:oklch(16%_0.006_220)] [--patch-edge:var(--ui-color-primary-500)] [--patch-thread:var(--ui-color-primary-500)]', label: 'Stitched' },
]

const folders = ['Personnel', 'Budget', 'Pattern blue', 'Archive']
const openFolder = ref(1)

function toggle(index: number) {
  openFolder.value = openFolder.value === index ? -1 : index
}
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-2 gap-6 md:grid-cols-4 xl:grid-cols-7">
      <figure
        v-for="surface in surfaces"
        :key="surface.name"
        class="space-y-2"
      >
        <div :class="['flex h-20 items-center justify-center', surface.class]">
          <div
            v-if="surface.inner"
            :class="surface.inner"
          />
          <span
            v-else-if="surface.label"
            class="embroidered font-bold uppercase tracking-[0.1em]"
          >{{ surface.label }}</span>
        </div>
        <figcaption class="font-mono text-xs text-muted">
          {{ surface.name }}
        </figcaption>
      </figure>
    </div>

    <ShowcaseRow label="keycap">
      <button
        type="button"
        class="keycap rounded-[2px] bg-(--vfd-key) px-4 py-2 text-xs text-(--vfd-key-legend)"
      >
        Press
      </button>
      <button
        type="button"
        class="keycap latched rounded-[2px] bg-(--vfd-key) px-4 py-2 text-xs text-(--vfd-key-legend)"
      >
        Latched
      </button>
      <span
        class="keycap knurled dished h-5 w-6 rounded-[2px] bg-(--vfd-key)"
        title="knurled dished"
      />
      <span
        class="keycap dished needle relative h-4 w-8 rounded-[2px] bg-(--vfd-key)"
        title="dished needle"
      />
      <span
        class="keycap dished-y needle-y relative h-8 w-4 rounded-[2px] bg-(--vfd-key)"
        title="dished-y needle-y"
      />
    </ShowcaseRow>

    <ShowcaseRow label="led · silkscreen">
      <span class="led" />
      <span class="led led-on" />
      <span class="led led-on [--vfd:var(--ui-error)] [--led-size:0.5rem]" />
      <span class="silkscreen text-[9px] text-muted">Power · Input · Tape</span>
    </ShowcaseRow>

    <ShowcaseRow label="scale · needle">
      <div class="window scale relative h-12 w-80 rounded-xs [--scale-step:8px] [--scale-height:8px]">
        <span class="needle absolute bottom-0 left-2/3 h-3.5 w-px [--vfd:var(--ui-error)]" />
      </div>
      <div class="window w-80 rounded-xs p-2">
        <div class="segments glow-box h-3 w-full bg-(--ui-primary)" />
      </div>
    </ShowcaseRow>

    <ShowcaseRow label="tractor-feed · greenbar">
      <ul class="paper tractor-feed greenbar w-full max-w-md font-mono text-xs">
        <li
          v-for="line in ['RUN 0042  OK', 'RUN 0043  OK', 'RUN 0044  FAULT', 'RUN 0045  OK']"
          :key="line"
          class="px-2 py-1"
        >
          {{ line }}
        </li>
      </ul>
    </ShowcaseRow>

    <ShowcaseRow label="folder-stack">
      <div class="folder-stack manila w-full max-w-xl pt-1">
        <div
          v-for="(folder, index) in folders"
          :key="folder"
          :class="['folder', openFolder === index && 'open']"
        >
          <button
            type="button"
            class="folder-tab px-4 text-xs font-semibold uppercase tracking-[0.08em]"
            @click="toggle(index)"
          >
            {{ folder }}
          </button>
          <div
            v-if="openFolder === index"
            class="folder-face px-3 pt-2"
          >
            <p class="paper rounded-[2px] px-4 py-3 text-sm">
              Contents of {{ folder.toLowerCase() }}.
            </p>
          </div>
        </div>
      </div>
    </ShowcaseRow>
  </div>
</template>

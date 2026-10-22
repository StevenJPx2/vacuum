<script setup lang="ts">
import type { TableColumn, TabsItem } from '@nuxt/ui'
import alertTheme from '#build/ui/alert'
import badgeTheme from '#build/ui/badge'
import buttonTheme from '#build/ui/button'
import cardTheme from '#build/ui/card'
import inputTheme from '#build/ui/input'
import tabsTheme from '#build/ui/tabs'

const colors = Object.keys(buttonTheme.variants.color) as (keyof typeof buttonTheme.variants.color)[]
const buttonVariants = Object.keys(buttonTheme.variants.variant) as (keyof typeof buttonTheme.variants.variant)[]
const sizes = Object.keys(buttonTheme.variants.size) as (keyof typeof buttonTheme.variants.size)[]
const badgeVariants = Object.keys(badgeTheme.variants.variant) as (keyof typeof badgeTheme.variants.variant)[]
const alertVariants = Object.keys(alertTheme.variants.variant) as (keyof typeof alertTheme.variants.variant)[]
const cardVariants = Object.keys(cardTheme.variants.variant) as (keyof typeof cardTheme.variants.variant)[]
const inputVariants = Object.keys(inputTheme.variants.variant) as (keyof typeof inputTheme.variants.variant)[]
const tabsVariants = Object.keys(tabsTheme.variants.variant) as (keyof typeof tabsTheme.variants.variant)[]

const phosphorOptions = ['amber', 'cyan', 'green', 'red'] as const
const glowOptions = ['off', 'soft', 'strong'] as const
const { phosphor, glow } = useVacuum()

const sections = [
  { id: 'materials', label: 'Materials' },
  { id: 'displays', label: 'Displays' },
  { id: 'palette', label: 'Palette' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'badges', label: 'Badges' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'cards', label: 'Cards' },
  { id: 'forms', label: 'Forms' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'data', label: 'Data' },
  { id: 'overlays', label: 'Overlays' },
]

/* Live readouts */
const now = ref<Date>()
const level = ref(62)
const bars = ref(Array.from({ length: 12 }, () => 40))
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  now.value = new Date()
  timer = setInterval(() => {
    now.value = new Date()
    level.value = Math.round(45 + Math.random() * 50)
    bars.value = bars.value.map(value => Math.max(5, Math.min(100, value + (Math.random() - 0.5) * 45)))
  }, 500)
})
onBeforeUnmount(() => clearInterval(timer))

const pad = (n: number) => String(n).padStart(2, '0')
// Rendered only after mount so SSR and hydration agree.
const clock = computed(() => now.value
  ? `${pad(now.value.getHours())}:${pad(now.value.getMinutes())}:${pad(now.value.getSeconds())}`
  : '--:--:--')

/* Warm-up replay */
const bootKey = ref(0)

/* Annunciators */
const lamps = reactive([
  { label: 'Play', color: 'primary' as const, active: true },
  { label: 'Rec', color: 'error' as const, active: false, blink: true },
  { label: 'Stereo', color: 'info' as const, active: true },
  { label: 'Dolby', color: 'secondary' as const, active: false },
  { label: 'Tuned', color: 'success' as const, active: true },
  { label: 'Over', color: 'warning' as const, active: false },
])

/* Forms */
const form = reactive({
  callsign: 'NERV-01',
  notes: 'Pattern blue confirmed.',
  channel: 'ch-2',
  armed: true,
  sync: false,
  mode: 'auto',
  gain: 40,
  tags: ['MAGI', 'EVA'],
})
const channels = [
  { label: 'Channel 1', value: 'ch-1' },
  { label: 'Channel 2', value: 'ch-2' },
  { label: 'Channel 3', value: 'ch-3' },
]
const modes = [
  { label: 'Auto', value: 'auto' },
  { label: 'Manual', value: 'manual' },
  { label: 'Standby', value: 'standby' },
]

/* Navigation */
const tabItems: TabsItem[] = [
  { label: 'Tuner', icon: 'i-pixel-rss', content: 'FM 98.7 MHz — signal strong.' },
  { label: 'Tape', icon: 'i-pixel-cassette-tape', content: 'Side A — 12:40 remaining.' },
  { label: 'Aux', icon: 'i-pixel-headphones', content: 'No input detected.' },
]
const breadcrumb = [
  { label: 'System', icon: 'i-pixel-robot' },
  { label: 'Audio' },
  { label: 'Equaliser' },
]
const accordionItems = [
  { label: 'Cathode', content: 'Thin tungsten filaments emit electrons when heated.' },
  { label: 'Grid', content: 'A fine mesh accelerates and gates the electron flow.' },
  { label: 'Anode', content: 'Phosphor-coated segments glow when struck by electrons.' },
]
const page = ref(3)

/* Data */
type Unit = { id: string, name: string, status: 'active' | 'standby' | 'fault', sync: number }
const units: Unit[] = [
  { id: '00', name: 'Prototype', status: 'standby', sync: 41.3 },
  { id: '01', name: 'Test type', status: 'active', sync: 72.8 },
  { id: '02', name: 'Production', status: 'active', sync: 58.1 },
  { id: '03', name: 'Mass production', status: 'fault', sync: 0 },
]
const statusColor = { active: 'success', standby: 'warning', fault: 'error' } as const
const UBadge = resolveComponent('UBadge')
const columns: TableColumn<Unit>[] = [
  { accessorKey: 'id', header: 'Unit' },
  { accessorKey: 'name', header: 'Designation' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(UBadge, { color: statusColor[row.original.status], variant: 'subtle', label: row.original.status }),
  },
  { accessorKey: 'sync', header: 'Sync %', cell: ({ row }) => row.original.sync.toFixed(1) },
]

/* Overlays */
const toast = useToast()
function notify(color: typeof colors[number]) {
  toast.add({ title: `${color} signal`, description: 'Transmission received on all channels.', color, icon: 'i-pixel-wifi' })
}

const palette = ['phosphor-amber', 'phosphor-cyan', 'phosphor-green', 'phosphor-red', 'glass']
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
</script>

<template>
  <div class="min-h-screen">
    <header class="chassis sticky top-0 z-50">
      <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <div class="flex items-center gap-3">
          <div class="window rounded-xs px-2 py-1.5">
            <VDotMatrix
              :key="bootKey"
              text="VACUUM"
              size="sm"
              warmup
            />
          </div>
          <span class="silkscreen text-[9px] text-muted">UI kit</span>
        </div>

        <nav class="hidden flex-1 flex-wrap gap-x-4 gap-y-1 lg:flex">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="silkscreen text-[9px] text-muted hover:text-highlighted"
          >{{ section.label }}</a>
        </nav>

        <div class="ms-auto flex flex-wrap items-center gap-2">
          <UFieldGroup size="xs">
            <UButton
              v-for="option in phosphorOptions"
              :key="option"
              :label="option"
              :variant="phosphor === option ? 'solid' : 'outline'"
              color="neutral"
              @click="phosphor = option"
            />
          </UFieldGroup>
          <UFieldGroup size="xs">
            <UButton
              v-for="option in glowOptions"
              :key="option"
              :label="`Glow ${option}`"
              :variant="glow === option ? 'solid' : 'outline'"
              color="neutral"
              @click="glow = option"
            />
          </UFieldGroup>
          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            icon="i-pixel-bolt"
            aria-label="Replay warm-up"
            @click="bootKey++"
          />
          <UColorModeButton size="xs" />
        </div>
      </div>
    </header>

    <main
      :key="bootKey"
      class="mx-auto max-w-7xl space-y-20 px-4 py-12 sm:px-6 motion-safe:animate-vfd-warmup"
    >
      <!-- Hero -->
      <VPanel
        title="Main display"
        caption="CH-01 · 98.7 MHz"
      >
        <div class="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div class="space-y-4">
            <VSegmentDisplay
              :value="clock"
              size="xl"
            />
            <div class="flex flex-wrap items-center gap-2">
              <VAnnunciator
                v-for="lamp in lamps.slice(0, 4)"
                :key="lamp.label"
                v-bind="lamp"
                size="sm"
              />
            </div>
          </div>
          <div class="min-w-0 space-y-4">
            <VDotMatrix
              text="NOW PLAYING: DECISIVE BATTLE"
              size="md"
              class="max-w-full"
            />
            <VMeter
              :value="level"
              :warning="0.7"
              :danger="0.9"
              label="Left channel"
            />
            <VMeter
              :value="level - 8"
              :warning="0.7"
              :danger="0.9"
              label="Right channel"
            />
          </div>
        </div>
      </VPanel>

      <!-- Materials -->
      <ShowcaseSection
        id="materials"
        title="Materials"
        description="The utilities every component is built from"
      >
        <MaterialsShowcase />
      </ShowcaseSection>

      <!-- Displays -->
      <ShowcaseSection
        id="displays"
        title="Displays"
        description="SVG segment, dot-matrix, bar-graph and lamp components"
      >
        <div class="grid gap-6 lg:grid-cols-2">
          <VPanel
            title="Segment display"
            caption="7 / 14 segments"
          >
            <div class="space-y-4">
              <ShowcaseRow label="7-seg colours">
                <VSegmentDisplay
                  v-for="color in colors"
                  :key="color"
                  :value="(color.length * 1.1).toFixed(1)"
                  :color="color"
                  :length="3"
                  size="sm"
                />
              </ShowcaseRow>
              <ShowcaseRow label="14-seg text">
                <VSegmentDisplay
                  value="VACUUM FL"
                  :segments="14"
                  align="left"
                  size="md"
                />
              </ShowcaseRow>
              <ShowcaseRow label="Sizes">
                <VSegmentDisplay
                  v-for="size in (['sm', 'md', 'lg'] as const)"
                  :key="size"
                  value="88.8"
                  :size="size"
                />
              </ShowcaseRow>
              <ShowcaseRow label="No ghost">
                <VSegmentDisplay
                  value="-12.5"
                  :ghost="false"
                />
              </ShowcaseRow>
              <ShowcaseRow label="Upright">
                <VSegmentDisplay
                  value="1984"
                  :skew="false"
                />
              </ShowcaseRow>
              <ShowcaseRow label="Blink">
                <VSegmentDisplay
                  value="12:00"
                  color="error"
                  blink
                />
              </ShowcaseRow>
            </div>
          </VPanel>

          <VPanel
            title="Dot matrix"
            caption="5 × 7"
          >
            <div class="space-y-4">
              <ShowcaseRow
                v-for="color in colors"
                :key="color"
                :label="color"
              >
                <VDotMatrix
                  :text="color.toUpperCase()"
                  :color="color"
                  :length="10"
                  size="sm"
                />
              </ShowcaseRow>
              <ShowcaseRow label="Square dots">
                <VDotMatrix
                  text="Grid 0x3F"
                  dot="square"
                  size="sm"
                />
              </ShowcaseRow>
              <ShowcaseRow label="Large">
                <VDotMatrix
                  text="EVA-01"
                  size="lg"
                />
              </ShowcaseRow>
            </div>
          </VPanel>

          <!-- Prototype: the matrix filter beside the component it imitates. -->
          <VPanel
            title="Matrix filter"
            caption="prototype"
            class="lg:col-span-2"
          >
            <div class="space-y-4">
              <ShowcaseRow label="Component · 3px">
                <VDotMatrix
                  text="PATTERN BLUE"
                  size="md"
                />
              </ShowcaseRow>
              <ShowcaseRow label="Filter · 3px · 28px">
                <span class="matrix font-mono text-[28px] leading-none font-medium uppercase text-highlighted">Pattern blue</span>
              </ShowcaseRow>
              <ShowcaseRow label="Filter · 2px · 18px">
                <span class="matrix matrix-sm font-mono text-lg leading-none font-medium uppercase text-highlighted">Pattern blue</span>
              </ShowcaseRow>
              <ShowcaseRow label="Filter · 4px · 40px">
                <span class="matrix matrix-lg font-mono text-[40px] leading-none font-medium uppercase text-highlighted">EVA-01</span>
              </ShowcaseRow>
              <ShowcaseRow label="Filter · icons">
                <UIcon
                  name="i-pixel-cassette-tape"
                  class="matrix matrix-sm size-10 text-highlighted"
                />
                <UIcon
                  name="i-pixel-rss"
                  class="matrix matrix-sm size-10 text-highlighted"
                />
              </ShowcaseRow>
              <ShowcaseRow label="In components">
                <UAlert
                  title="Pattern blue"
                  description="Filtered title, plain description."
                  variant="subtle"
                  class="max-w-sm"
                  :ui="{ title: 'matrix matrix-sm font-mono text-xl font-medium' }"
                />
                <USelect
                  v-model="form.channel"
                  :items="channels"
                  class="w-56"
                  :ui="{ value: 'matrix matrix-sm text-lg' }"
                />
              </ShowcaseRow>
            </div>
          </VPanel>

          <VPanel
            title="Meters"
            caption="bar graph"
          >
            <div class="space-y-4">
              <ShowcaseRow
                v-for="color in colors"
                :key="color"
                :label="color"
              >
                <VMeter
                  :value="30 + colors.indexOf(color) * 10"
                  :color="color"
                  size="sm"
                  class="max-w-sm"
                />
              </ShowcaseRow>
              <ShowcaseRow label="Thresholds">
                <VMeter
                  :value="level"
                  :warning="0.6"
                  :danger="0.85"
                  class="max-w-sm"
                />
              </ShowcaseRow>
              <ShowcaseRow label="Vertical">
                <div class="flex h-28 items-end gap-1.5">
                  <VMeter
                    v-for="(value, index) in bars"
                    :key="index"
                    :value="value"
                    :bars="14"
                    :warning="0.7"
                    :danger="0.9"
                    orientation="vertical"
                    size="sm"
                  />
                </div>
              </ShowcaseRow>
            </div>
          </VPanel>

          <VPanel
            title="Annunciators"
            caption="click to toggle"
          >
            <div class="space-y-4">
              <ShowcaseRow label="Outline">
                <button
                  v-for="lamp in lamps"
                  :key="lamp.label"
                  type="button"
                  @click="lamp.active = !lamp.active"
                >
                  <VAnnunciator v-bind="lamp" />
                </button>
              </ShowcaseRow>
              <ShowcaseRow label="Solid">
                <button
                  v-for="lamp in lamps"
                  :key="lamp.label"
                  type="button"
                  @click="lamp.active = !lamp.active"
                >
                  <VAnnunciator
                    v-bind="lamp"
                    variant="solid"
                  />
                </button>
              </ShowcaseRow>
              <ShowcaseRow label="Sizes">
                <VAnnunciator
                  v-for="size in (['sm', 'md', 'lg'] as const)"
                  :key="size"
                  :label="size"
                  :size="size"
                  active
                />
              </ShowcaseRow>
            </div>
          </VPanel>
        </div>
      </ShowcaseSection>

      <!-- Palette -->
      <ShowcaseSection
        id="palette"
        title="Palette"
        description="Phosphor palettes and smoked glass neutral"
      >
        <div class="space-y-3">
          <div
            v-for="name in palette"
            :key="name"
            class="grid grid-cols-[8rem_repeat(11,1fr)] items-center gap-1"
          >
            <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-dimmed">{{ name }}</span>
            <div
              v-for="shade in shades"
              :key="shade"
              class="h-10 ring ring-inset ring-default"
              :style="{ background: `var(--color-${name}-${shade})` }"
              :title="`${name}-${shade}`"
            />
          </div>
          <div class="grid grid-cols-[8rem_repeat(11,1fr)] gap-1 font-mono text-[10px] text-dimmed">
            <span />
            <span
              v-for="shade in shades"
              :key="shade"
              class="text-center"
            >{{ shade }}</span>
          </div>
        </div>
        <div class="flex flex-wrap gap-6 font-mono text-sm">
          <span
            v-for="tone in ['dimmed', 'muted', 'toned', 'default', 'highlighted']"
            :key="tone"
            :class="`text-${tone}`"
          >text-{{ tone }}</span>
        </div>
      </ShowcaseSection>

      <!-- Buttons -->
      <ShowcaseSection
        id="buttons"
        title="Buttons"
        :description="`${buttonVariants.length} variants × ${colors.length} colours`"
      >
        <ShowcaseRow
          v-for="variant in buttonVariants"
          :key="variant"
          :label="variant"
        >
          <UButton
            v-for="color in colors"
            :key="color"
            :label="color"
            :color="color"
            :variant="variant"
          />
        </ShowcaseRow>
        <ShowcaseRow label="Sizes">
          <UButton
            v-for="size in sizes"
            :key="size"
            :label="size"
            :size="size"
            icon="i-pixel-bolt"
          />
        </ShowcaseRow>
        <ShowcaseRow label="States">
          <UButton
            label="Loading"
            loading
          />
          <UButton
            label="Disabled"
            disabled
          />
          <UButton
            icon="i-pixel-bolt"
            aria-label="Power"
            square
          />
          <UButton
            label="Trailing"
            trailing-icon="i-pixel-arrow-right"
            variant="outline"
          />
          <UButton
            label="Block"
            block
            variant="subtle"
            class="max-w-xs"
          />
        </ShowcaseRow>
      </ShowcaseSection>

      <!-- Badges -->
      <ShowcaseSection
        id="badges"
        title="Badges"
        :description="`${badgeVariants.length} variants × ${colors.length} colours`"
      >
        <ShowcaseRow
          v-for="variant in badgeVariants"
          :key="variant"
          :label="variant"
        >
          <UBadge
            v-for="color in colors"
            :key="color"
            :label="color"
            :color="color"
            :variant="variant"
          />
        </ShowcaseRow>
        <ShowcaseRow label="Sizes">
          <UBadge
            v-for="size in sizes"
            :key="size"
            :label="size"
            :size="size"
          />
        </ShowcaseRow>
      </ShowcaseSection>

      <!-- Alerts -->
      <ShowcaseSection
        id="alerts"
        title="Alerts"
        :description="`${alertVariants.length} variants × ${colors.length} colours`"
      >
        <div
          v-for="variant in alertVariants"
          :key="variant"
          class="space-y-2"
        >
          <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-dimmed">{{ variant }}</span>
          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <UAlert
              v-for="color in colors"
              :key="color"
              :title="`${color} alert`"
              description="Pattern detected in sector 7."
              icon="i-pixel-exclamation-triangle"
              :color="color"
              :variant="variant"
            />
          </div>
        </div>
      </ShowcaseSection>

      <!-- Cards -->
      <ShowcaseSection
        id="cards"
        title="Cards"
        :description="`${cardVariants.length} variants`"
      >
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <UCard
            v-for="variant in cardVariants"
            :key="variant"
            :variant="variant"
            :title="`${variant} unit`"
            description="No. R-05590 · Tokyo-3"
          >
            <p class="text-sm">
              Synchronisation ratio holding steady across all pilots.
            </p>
            <template #footer>
              <div class="flex items-center justify-between gap-2">
                <UButton
                  label="Engage"
                  size="xs"
                  :variant="variant === 'solid' ? 'outline' : 'solid'"
                  :color="variant === 'solid' ? 'neutral' : 'primary'"
                />
                <UBadge
                  label="Deployed"
                  size="sm"
                  :variant="variant === 'solid' ? 'soft' : 'subtle'"
                  :color="variant === 'solid' ? 'neutral' : 'error'"
                />
              </div>
            </template>
          </UCard>
        </div>
      </ShowcaseSection>

      <!-- Forms -->
      <ShowcaseSection
        id="forms"
        title="Forms"
        description="Screens, paper, tape, a thumbwheel and counter keys"
      >
        <ShowcaseRow
          v-for="variant in inputVariants"
          :key="variant"
          :label="`Input ${variant}`"
        >
          <UInput
            v-model="form.callsign"
            :variant="variant"
            icon="i-pixel-rss"
            placeholder="Callsign"
          />
          <UInput
            :variant="variant"
            placeholder="Disabled"
            disabled
          />
        </ShowcaseRow>
        <ShowcaseRow label="Input colours">
          <UInput
            v-for="color in colors"
            :key="color"
            :color="color"
            :placeholder="color"
            highlight
            class="w-36"
          />
        </ShowcaseRow>
        <div class="grid gap-6 md:grid-cols-2">
          <UFormField
            label="Notes"
            description="Logged to MAGI."
          >
            <UTextarea
              v-model="form.notes"
              class="w-full"
            />
          </UFormField>
          <div class="space-y-4">
            <UFormField label="Channel">
              <USelect
                v-model="form.channel"
                :items="channels"
                class="w-full"
              />
            </UFormField>
            <UFormField label="Tags">
              <UInputTags
                v-model="form.tags"
                class="w-full"
              />
            </UFormField>
            <UFormField
              label="Callsign"
              error="Signal lost"
            >
              <UInput
                model-value="???"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>
        <ShowcaseRow label="Checkbox">
          <UCheckbox
            v-for="color in colors"
            :key="color"
            :label="color"
            :color="color"
            :default-value="true"
          />
        </ShowcaseRow>
        <ShowcaseRow label="Switch">
          <USwitch
            v-for="color in colors"
            :key="color"
            :label="color"
            :color="color"
            :default-value="true"
          />
          <USwitch
            v-model="form.sync"
            label="Off"
          />
        </ShowcaseRow>
        <ShowcaseRow label="Radio group">
          <URadioGroup
            v-model="form.mode"
            :items="modes"
            orientation="horizontal"
          />
          <URadioGroup
            v-model="form.mode"
            :items="modes"
            orientation="horizontal"
            variant="table"
          />
        </ShowcaseRow>
        <ShowcaseRow label="Slider">
          <div class="grid w-full max-w-xl gap-4">
            <USlider
              v-for="color in colors"
              :key="color"
              :color="color"
              :default-value="20 + colors.indexOf(color) * 10"
            />
          </div>
        </ShowcaseRow>
        <ShowcaseRow label="Progress">
          <div class="grid w-full max-w-xl gap-4">
            <UProgress
              v-for="color in colors"
              :key="color"
              :color="color"
              :model-value="15 + colors.indexOf(color) * 12"
            />
            <UProgress animation="carousel" />
          </div>
        </ShowcaseRow>
        <ShowcaseRow label="Access code">
          <UPinInput :length="4" />
        </ShowcaseRow>
      </ShowcaseSection>

      <!-- Navigation -->
      <ShowcaseSection
        id="navigation"
        title="Navigation"
        description="Tabs, breadcrumb, accordion and pagination"
      >
        <div class="grid gap-6 md:grid-cols-2">
          <UTabs
            v-for="variant in tabsVariants"
            :key="variant"
            :items="tabItems"
            :variant="variant"
            class="w-full"
          >
            <template #content="{ item }">
              <p class="p-3 font-mono text-sm">
                {{ item.content }}
              </p>
            </template>
          </UTabs>
        </div>
        <UBreadcrumb :items="breadcrumb" />
        <UAccordion :items="accordionItems" />
        <div class="flex flex-wrap items-center gap-6">
          <UPagination
            v-model:page="page"
            :total="120"
          />
          <div class="flex items-center gap-1">
            <UKbd value="meta" />
            <UKbd value="K" />
          </div>
        </div>
        <USeparator label="End of transmission" />
      </ShowcaseSection>

      <!-- Data -->
      <ShowcaseSection
        id="data"
        title="Data"
        description="Table and avatars"
      >
        <UTable
          :data="units"
          :columns="columns"
          class="ring ring-default"
        />
        <div class="flex items-center gap-4">
          <UAvatarGroup>
            <UAvatar
              v-for="unit in units"
              :key="unit.id"
              :text="unit.id"
            />
          </UAvatarGroup>
          <UChip
            color="error"
            inset
          >
            <UAvatar
              icon="i-pixel-robot"
              alt="MAGI"
            />
          </UChip>
        </div>
      </ShowcaseSection>

      <!-- Overlays -->
      <ShowcaseSection
        id="overlays"
        title="Overlays"
        description="Modal, slideover, popover, tooltip and toasts"
      >
        <div class="flex flex-wrap items-center gap-3">
          <UModal
            title="Confirm launch"
            description="All personnel clear the cage."
          >
            <UButton label="Open modal" />
            <template #body>
              <VPanel
                title="T-minus"
                class="space-y-4"
              >
                <VSegmentDisplay
                  value="00:05"
                  size="lg"
                />
                <VMeter :value="80" />
              </VPanel>
            </template>
            <template #footer="{ close }">
              <UButton
                label="Abort"
                color="neutral"
                variant="outline"
                @click="close"
              />
              <UButton
                label="Launch"
                color="error"
                @click="close"
              />
            </template>
          </UModal>
          <USlideover
            title="Diagnostics"
            description="Live channel levels"
          >
            <UButton
              label="Open slideover"
              variant="outline"
            />
            <template #body>
              <VPanel
                title="Channels"
                caption="12 ch"
                class="space-y-3"
              >
                <VMeter
                  v-for="(value, index) in bars"
                  :key="index"
                  :value="value"
                  size="sm"
                />
              </VPanel>
            </template>
          </USlideover>
          <UPopover>
            <UButton
              label="Popover"
              variant="subtle"
            />
            <template #content>
              <div class="w-56 space-y-1 px-4 pt-4 pb-3 font-mono text-sm">
                <p class="text-highlighted">
                  Standby
                </p>
                <p class="text-muted">
                  Hold until pattern blue is confirmed by MAGI.
                </p>
              </div>
            </template>
          </UPopover>
          <UTooltip text="Tooltip text">
            <UButton
              label="Tooltip"
              variant="ghost"
            />
          </UTooltip>
          <UDropdownMenu
            :items="[[{ label: 'Diagnostics', icon: 'i-pixel-chart-line' }, { label: 'Calibrate', icon: 'i-pixel-cog' }], [{ label: 'Shut down', icon: 'i-pixel-bolt', color: 'error' }]]"
          >
            <UButton
              label="Menu"
              variant="soft"
            />
          </UDropdownMenu>
        </div>
        <ShowcaseRow label="Toasts">
          <UButton
            v-for="color in colors"
            :key="color"
            :label="color"
            :color="color"
            variant="outline"
            size="xs"
            @click="notify(color)"
          />
        </ShowcaseRow>
      </ShowcaseSection>
    </main>

    <footer class="border-t border-default py-6 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-dimmed">
      @fdcn/vacuum · built on Nuxt UI
    </footer>
  </div>
</template>

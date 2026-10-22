<script setup lang="ts">
/**
 * SVG filters that redraw any element as a lit dot-matrix display: the element's own pixels are
 * sampled at the centre of every grid cell, each lit cell becomes a round dot in the ink colour,
 * and every other cell keeps a faint unlit dot. One filter per dot pitch, in CSS pixels.
 */
const pitches = [2, 3, 4]

function filter(pitch: number) {
  const centre = pitch / 2
  const dot = pitch * 0.42
  return {
    id: `vacuum-matrix-${pitch}`,
    pitch,
    seed: centre - 0.5,
    // Thin strokes still reach a cell centre, without filling in counters.
    ink: pitch * 0.1,
    // Each sample spreads over its whole cell before the dot mask cuts it round.
    spread: centre,
    // A 1px seed grown and softened into a round dot, then cut hard.
    grow: Math.max(dot - 0.5, 0.25),
    soften: pitch * 0.15,
    // Bloom drawn from the lit dots alone, so the unlit grid never glows.
    bloom: pitch * 0.9,
  }
}

const filters = pitches.map(filter)
</script>

<template>
  <svg
    aria-hidden="true"
    width="0"
    height="0"
    class="pointer-events-none absolute size-0 overflow-hidden"
  >
    <defs>
      <filter
        v-for="f in filters"
        :id="f.id"
        :key="f.id"
        x="0"
        y="0"
        width="100%"
        height="100%"
        primitiveUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feMorphology
          in="SourceGraphic"
          operator="dilate"
          :radius="f.ink"
          result="ink"
        />
        <feFlood
          :x="f.seed"
          :y="f.seed"
          width="1"
          height="1"
          flood-color="#fff"
          result="seed"
        />
        <feComposite
          in="seed"
          in2="seed"
          operator="over"
          x="0"
          y="0"
          :width="f.pitch"
          :height="f.pitch"
          result="cell"
        />
        <feTile
          in="cell"
          result="seeds"
        />
        <feMorphology
          in="seeds"
          operator="dilate"
          :radius="f.grow"
          result="squares"
        />
        <feGaussianBlur
          in="squares"
          :stdDeviation="f.soften"
          result="soft"
        />
        <feComponentTransfer
          in="soft"
          result="dots"
        >
          <feFuncA
            type="discrete"
            tableValues="0 1"
          />
        </feComponentTransfer>
        <feComposite
          in="ink"
          in2="seeds"
          operator="in"
          result="samples"
        />
        <feMorphology
          in="samples"
          operator="dilate"
          :radius="f.spread"
          result="cells"
        />
        <feComposite
          in="cells"
          in2="dots"
          operator="in"
          result="lit"
        />
        <feComponentTransfer
          in="lit"
          result="lit-hard"
        >
          <feFuncA
            type="discrete"
            tableValues="0 1"
          />
        </feComponentTransfer>
        <feColorMatrix
          in="dots"
          type="matrix"
          values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0"
          result="ghost"
        />
        <feGaussianBlur
          in="lit-hard"
          :stdDeviation="f.bloom"
          result="bloom-soft"
        />
        <feComponentTransfer
          in="bloom-soft"
          result="bloom"
        >
          <feFuncA
            type="linear"
            slope="0.8"
          />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="ghost" />
          <feMergeNode in="bloom" />
          <feMergeNode in="lit-hard" />
        </feMerge>
      </filter>
    </defs>
  </svg>
</template>

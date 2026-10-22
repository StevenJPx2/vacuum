/**
 * The hidden SVG filter definitions that `matrix-icon` and `matrix` icons draw through, shared
 * by the runtime plugin (server-side) and the playground's `<VMatrixFilter>` component.
 */
export const matrixFilterSvg = `<svg aria-hidden="true" width="0" height="0" class="pointer-events-none absolute size-0 overflow-hidden">
  <defs>
    <filter id="vacuum-matrix-icon-1x" x="0" y="0" width="100%" height="100%" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood x="0.5" y="0.5" width="1" height="1" flood-color="#fff" result="seed" />
      <feComposite in="seed" in2="seed" operator="over" x="0" y="0" width="2" height="2" result="cell" />
      <feTile in="cell" result="seeds" />
      <feMorphology in="seeds" operator="dilate" radius="0.3" result="squares" />
      <feGaussianBlur in="squares" stdDeviation="0.12" result="soft" />
      <feComponentTransfer in="soft" result="dots"><feFuncA type="discrete" tableValues="0 1" /></feComponentTransfer>
      <feComposite in="SourceGraphic" in2="dots" operator="in" result="lit" />
      <feComponentTransfer in="lit" result="lit-hard"><feFuncA type="discrete" tableValues="0 1" /></feComponentTransfer>
      <feColorMatrix in="dots" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" result="ghost" />
      <feGaussianBlur in="lit-hard" stdDeviation="1.8" result="bloom-soft" />
      <feComponentTransfer in="bloom-soft" result="bloom"><feFuncA type="linear" slope="0.6" /></feComponentTransfer>
      <feMerge><feMergeNode in="ghost" /><feMergeNode in="bloom" /><feMergeNode in="lit-hard" /></feMerge>
    </filter>
    <filter id="vacuum-matrix-icon-2x" x="0" y="0" width="100%" height="100%" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood x="0.25" y="0.25" width="0.5" height="0.5" flood-color="#fff" result="seed" />
      <feComposite in="seed" in2="seed" operator="over" x="0" y="0" width="1" height="1" result="cell" />
      <feTile in="cell" result="seeds" />
      <feMorphology in="seeds" operator="dilate" radius="0.21" result="squares" />
      <feGaussianBlur in="squares" stdDeviation="0.06" result="soft" />
      <feComponentTransfer in="soft" result="dots"><feFuncA type="discrete" tableValues="0 1" /></feComponentTransfer>
      <feComposite in="SourceGraphic" in2="dots" operator="in" result="lit" />
      <feComponentTransfer in="lit" result="lit-hard"><feFuncA type="discrete" tableValues="0 1" /></feComponentTransfer>
      <feColorMatrix in="dots" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" result="ghost" />
      <feGaussianBlur in="lit-hard" stdDeviation="0.9" result="bloom-soft" />
      <feComponentTransfer in="bloom-soft" result="bloom"><feFuncA type="linear" slope="0.6" /></feComponentTransfer>
      <feMerge><feMergeNode in="ghost" /><feMergeNode in="bloom" /><feMergeNode in="lit-hard" /></feMerge>
    </filter>
    <filter id="vacuum-matrix-icon-3x" x="0" y="0" width="100%" height="100%" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood x="0.333" y="0.333" width="0.667" height="0.667" flood-color="#fff" result="seed" />
      <feComposite in="seed" in2="seed" operator="over" x="0" y="0" width="1.333" height="1.333" result="cell" />
      <feTile in="cell" result="seeds" />
      <feMorphology in="seeds" operator="dilate" radius="0.28" result="squares" />
      <feGaussianBlur in="squares" stdDeviation="0.08" result="soft" />
      <feComponentTransfer in="soft" result="dots"><feFuncA type="discrete" tableValues="0 1" /></feComponentTransfer>
      <feComposite in="SourceGraphic" in2="dots" operator="in" result="lit" />
      <feComponentTransfer in="lit" result="lit-hard"><feFuncA type="discrete" tableValues="0 1" /></feComponentTransfer>
      <feColorMatrix in="dots" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" result="ghost" />
      <feGaussianBlur in="lit-hard" stdDeviation="1.2" result="bloom-soft" />
      <feComponentTransfer in="bloom-soft" result="bloom"><feFuncA type="linear" slope="0.6" /></feComponentTransfer>
      <feMerge><feMergeNode in="ghost" /><feMergeNode in="bloom" /><feMergeNode in="lit-hard" /></feMerge>
    </filter>
  </defs>
</svg>`

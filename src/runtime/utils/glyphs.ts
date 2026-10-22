/*
 * 14-segment table and 5x7 dot-matrix font from Adafruit Industries
 * (Adafruit_LED_Backpack, MIT; Adafruit-GFX-Library glcdfont.c, BSD-2-Clause).
 * Copyright (c) 2012 Adafruit Industries. All rights reserved.
 */

export type Segments = 7 | 14

export interface Cell {
  kind: 'char' | 'colon'
  bits: number
  dp: boolean
}

/** 7-segment bit order: a b c d e f g. */
const SEVEN: Record<string, number> = {
  ' ': 0,
  '0': 0b0111111,
  '1': 0b0000110,
  '2': 0b1011011,
  '3': 0b1001111,
  '4': 0b1100110,
  '5': 0b1101101,
  '6': 0b1111101,
  '7': 0b0000111,
  '8': 0b1111111,
  '9': 0b1101111,
  'A': 0b1110111,
  'B': 0b1111100,
  'C': 0b0111001,
  'D': 0b1011110,
  'E': 0b1111001,
  'F': 0b1110001,
  'G': 0b0111101,
  'H': 0b1110110,
  'I': 0b0000110,
  'J': 0b0011110,
  'L': 0b0111000,
  'N': 0b1010100,
  'O': 0b1011100,
  'P': 0b1110011,
  'Q': 0b1100111,
  'R': 0b1010000,
  'S': 0b1101101,
  'T': 0b1111000,
  'U': 0b0111110,
  'Y': 0b1101110,
  '-': 0b1000000,
  '_': 0b0001000,
  '=': 0b1001000,
  '°': 0b1100011,
}

/** 14-segment table for ASCII 32–126. Bit order: A B C D E F G1 G2 H J K L M N DP. */
const FOURTEEN = [
  0b0000000000000000, 0b0000000000000110, 0b0000001000100000, 0b0001001011001110,
  0b0001001011101101, 0b0000110000100100, 0b0010001101011101, 0b0000010000000000,
  0b0010010000000000, 0b0000100100000000, 0b0011111111000000, 0b0001001011000000,
  0b0000100000000000, 0b0000000011000000, 0b0100000000000000, 0b0000110000000000,
  0b0000110000111111, 0b0000000000000110, 0b0000000011011011, 0b0000000010001111,
  0b0000000011100110, 0b0010000001101001, 0b0000000011111101, 0b0000000000000111,
  0b0000000011111111, 0b0000000011101111, 0b0001001000000000, 0b0000101000000000,
  0b0010010000000000, 0b0000000011001000, 0b0000100100000000, 0b0001000010000011,
  0b0000001010111011, 0b0000000011110111, 0b0001001010001111, 0b0000000000111001,
  0b0001001000001111, 0b0000000011111001, 0b0000000001110001, 0b0000000010111101,
  0b0000000011110110, 0b0001001000001001, 0b0000000000011110, 0b0010010001110000,
  0b0000000000111000, 0b0000010100110110, 0b0010000100110110, 0b0000000000111111,
  0b0000000011110011, 0b0010000000111111, 0b0010000011110011, 0b0000000011101101,
  0b0001001000000001, 0b0000000000111110, 0b0000110000110000, 0b0010100000110110,
  0b0010110100000000, 0b0001010100000000, 0b0000110000001001, 0b0000000000111001,
  0b0010000100000000, 0b0000000000001111, 0b0000110000000011, 0b0000000000001000,
  0b0000000100000000, 0b0001000001011000, 0b0010000001111000, 0b0000000011011000,
  0b0000100010001110, 0b0000100001011000, 0b0000000001110001, 0b0000010010001110,
  0b0001000001110000, 0b0001000000000000, 0b0000000000001110, 0b0011011000000000,
  0b0000000000110000, 0b0001000011010100, 0b0001000001010000, 0b0000000011011100,
  0b0000000101110000, 0b0000010010000110, 0b0000000001010000, 0b0010000010001000,
  0b0000000001111000, 0b0000000000011100, 0b0010000000000100, 0b0010100000010100,
  0b0010100011000000, 0b0010000000001100, 0b0000100001001000, 0b0000100101001001,
  0b0001001000000000, 0b0010010010001001, 0b0000010100100000,
]

/** 5x7 font for ASCII 32–126, five column bytes per glyph, bit 0 at the top. */
const FONT_5X7 = [
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x5F, 0x00, 0x00, 0x00, 0x07, 0x00, 0x07, 0x00, 0x14, 0x7F, 0x14, 0x7F, 0x14,
  0x24, 0x2A, 0x7F, 0x2A, 0x12, 0x23, 0x13, 0x08, 0x64, 0x62, 0x36, 0x49, 0x56, 0x20, 0x50, 0x00, 0x08, 0x07, 0x03, 0x00,
  0x00, 0x1C, 0x22, 0x41, 0x00, 0x00, 0x41, 0x22, 0x1C, 0x00, 0x2A, 0x1C, 0x7F, 0x1C, 0x2A, 0x08, 0x08, 0x3E, 0x08, 0x08,
  0x00, 0x80, 0x70, 0x30, 0x00, 0x08, 0x08, 0x08, 0x08, 0x08, 0x00, 0x00, 0x60, 0x60, 0x00, 0x20, 0x10, 0x08, 0x04, 0x02,
  0x3E, 0x51, 0x49, 0x45, 0x3E, 0x00, 0x42, 0x7F, 0x40, 0x00, 0x72, 0x49, 0x49, 0x49, 0x46, 0x21, 0x41, 0x49, 0x4D, 0x33,
  0x18, 0x14, 0x12, 0x7F, 0x10, 0x27, 0x45, 0x45, 0x45, 0x39, 0x3C, 0x4A, 0x49, 0x49, 0x31, 0x41, 0x21, 0x11, 0x09, 0x07,
  0x36, 0x49, 0x49, 0x49, 0x36, 0x46, 0x49, 0x49, 0x29, 0x1E, 0x00, 0x00, 0x14, 0x00, 0x00, 0x00, 0x40, 0x34, 0x00, 0x00,
  0x00, 0x08, 0x14, 0x22, 0x41, 0x14, 0x14, 0x14, 0x14, 0x14, 0x00, 0x41, 0x22, 0x14, 0x08, 0x02, 0x01, 0x59, 0x09, 0x06,
  0x3E, 0x41, 0x5D, 0x59, 0x4E, 0x7C, 0x12, 0x11, 0x12, 0x7C, 0x7F, 0x49, 0x49, 0x49, 0x36, 0x3E, 0x41, 0x41, 0x41, 0x22,
  0x7F, 0x41, 0x41, 0x41, 0x3E, 0x7F, 0x49, 0x49, 0x49, 0x41, 0x7F, 0x09, 0x09, 0x09, 0x01, 0x3E, 0x41, 0x41, 0x51, 0x73,
  0x7F, 0x08, 0x08, 0x08, 0x7F, 0x00, 0x41, 0x7F, 0x41, 0x00, 0x20, 0x40, 0x41, 0x3F, 0x01, 0x7F, 0x08, 0x14, 0x22, 0x41,
  0x7F, 0x40, 0x40, 0x40, 0x40, 0x7F, 0x02, 0x1C, 0x02, 0x7F, 0x7F, 0x04, 0x08, 0x10, 0x7F, 0x3E, 0x41, 0x41, 0x41, 0x3E,
  0x7F, 0x09, 0x09, 0x09, 0x06, 0x3E, 0x41, 0x51, 0x21, 0x5E, 0x7F, 0x09, 0x19, 0x29, 0x46, 0x26, 0x49, 0x49, 0x49, 0x32,
  0x03, 0x01, 0x7F, 0x01, 0x03, 0x3F, 0x40, 0x40, 0x40, 0x3F, 0x1F, 0x20, 0x40, 0x20, 0x1F, 0x3F, 0x40, 0x38, 0x40, 0x3F,
  0x63, 0x14, 0x08, 0x14, 0x63, 0x03, 0x04, 0x78, 0x04, 0x03, 0x61, 0x59, 0x49, 0x4D, 0x43, 0x00, 0x7F, 0x41, 0x41, 0x41,
  0x02, 0x04, 0x08, 0x10, 0x20, 0x00, 0x41, 0x41, 0x41, 0x7F, 0x04, 0x02, 0x01, 0x02, 0x04, 0x40, 0x40, 0x40, 0x40, 0x40,
  0x00, 0x03, 0x07, 0x08, 0x00, 0x20, 0x54, 0x54, 0x78, 0x40, 0x7F, 0x28, 0x44, 0x44, 0x38, 0x38, 0x44, 0x44, 0x44, 0x28,
  0x38, 0x44, 0x44, 0x28, 0x7F, 0x38, 0x54, 0x54, 0x54, 0x18, 0x00, 0x08, 0x7E, 0x09, 0x02, 0x18, 0xA4, 0xA4, 0x9C, 0x78,
  0x7F, 0x08, 0x04, 0x04, 0x78, 0x00, 0x44, 0x7D, 0x40, 0x00, 0x20, 0x40, 0x40, 0x3D, 0x00, 0x7F, 0x10, 0x28, 0x44, 0x00,
  0x00, 0x41, 0x7F, 0x40, 0x00, 0x7C, 0x04, 0x78, 0x04, 0x78, 0x7C, 0x08, 0x04, 0x04, 0x78, 0x38, 0x44, 0x44, 0x44, 0x38,
  0xFC, 0x18, 0x24, 0x24, 0x18, 0x18, 0x24, 0x24, 0x18, 0xFC, 0x7C, 0x08, 0x04, 0x04, 0x08, 0x48, 0x54, 0x54, 0x54, 0x24,
  0x04, 0x04, 0x3F, 0x44, 0x24, 0x3C, 0x40, 0x40, 0x20, 0x7C, 0x1C, 0x20, 0x40, 0x20, 0x1C, 0x3C, 0x40, 0x30, 0x40, 0x3C,
  0x44, 0x28, 0x10, 0x28, 0x44, 0x4C, 0x90, 0x90, 0x90, 0x7C, 0x44, 0x64, 0x54, 0x4C, 0x44, 0x00, 0x08, 0x36, 0x41, 0x00,
  0x00, 0x00, 0x77, 0x00, 0x00, 0x00, 0x41, 0x36, 0x08, 0x00, 0x02, 0x01, 0x02, 0x04, 0x02,
]

const DP_14 = 1 << 14

function charBits(char: string, segments: Segments) {
  if (segments === 7) {
    return SEVEN[char.toUpperCase()] ?? 0
  }
  const code = char.charCodeAt(0)
  return code >= 32 && code <= 126 ? FOURTEEN[code - 32]! & ~DP_14 : 0
}

/** Splits text into display cells; `.` lights the previous cell's decimal point and `:` gets its own colon cell. */
export function toCells(text: string, segments: Segments): Cell[] {
  const cells: Cell[] = []
  for (const char of text) {
    const previous = cells.at(-1)
    if (char === '.' || char === ',') {
      if (previous?.kind === 'char' && !previous.dp) {
        previous.dp = true
      }
      else {
        cells.push({ kind: 'char', bits: 0, dp: true })
      }
    }
    else if (char === ':') {
      cells.push({ kind: 'colon', bits: 1, dp: false })
    }
    else {
      cells.push({ kind: 'char', bits: charBits(char, segments), dp: false })
    }
  }
  return cells
}

/** Lit dots of a 5x7 glyph as `[column, row]` pairs (rows 0–7 include descenders). */
export function dotGlyph(char: string): boolean[][] {
  const code = char.charCodeAt(0)
  const index = code >= 32 && code <= 126 ? code - 32 : 0
  return Array.from({ length: 5 }, (_, column) => {
    const byte = FONT_5X7[index * 5 + column]!
    return Array.from({ length: 8 }, (_, row) => Boolean(byte & (1 << row)))
  })
}

/* Segment geometry for one digit cell. */

export const DIGIT = { width: 48, height: 88, thickness: 8, gap: 1.2, advance: 64 }

type Point = [number, number]

function polygon(points: Point[]) {
  return points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
}

function horizontal(x1: number, x2: number, y: number) {
  const { thickness: t, gap: g } = DIGIT
  const h = t / 2
  return polygon([[x1 + g, y], [x1 + g + h, y - h], [x2 - g - h, y - h], [x2 - g, y], [x2 - g - h, y + h], [x1 + g + h, y + h]])
}

function vertical(x: number, y1: number, y2: number) {
  const { thickness: t, gap: g } = DIGIT
  const h = t / 2
  return polygon([[x, y1 + g], [x + h, y1 + g + h], [x + h, y2 - g - h], [x, y2 - g], [x - h, y2 - g - h], [x - h, y1 + g + h]])
}

function diagonal(from: Point, to: Point) {
  const width = DIGIT.thickness * 0.8
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const length = Math.hypot(dx, dy)
  const nx = (-dy / length) * (width / 2)
  const ny = (dx / length) * (width / 2)
  return polygon([
    [from[0] + nx, from[1] + ny],
    [to[0] + nx, to[1] + ny],
    [to[0] - nx, to[1] - ny],
    [from[0] - nx, from[1] - ny],
  ])
}

function buildSegments() {
  const { width: w, height: h, thickness: t } = DIGIT
  const left = t / 2
  const right = w - t / 2
  const top = t / 2
  const middle = h / 2
  const bottom = h - t / 2
  const center = w / 2
  const inset = t * 0.95

  const a = horizontal(left, right, top)
  const b = vertical(right, top, middle)
  const c = vertical(right, middle, bottom)
  const d = horizontal(left, right, bottom)
  const e = vertical(left, middle, bottom)
  const f = vertical(left, top, middle)

  return {
    7: [a, b, c, d, e, f, horizontal(left, right, middle)],
    14: [
      a, b, c, d, e, f,
      horizontal(left, center, middle),
      horizontal(center, right, middle),
      diagonal([left + inset, top + inset], [center - inset * 0.8, middle - inset]),
      vertical(center, top, middle),
      diagonal([right - inset, top + inset], [center + inset * 0.8, middle - inset]),
      diagonal([center - inset * 0.8, middle + inset], [left + inset, bottom - inset]),
      vertical(center, middle, bottom),
      diagonal([center + inset * 0.8, middle + inset], [right - inset, bottom - inset]),
    ],
  } satisfies Record<Segments, string[]>
}

export const SEGMENT_POLYGONS = buildSegments()

export const DECIMAL_POINT = { cx: DIGIT.width + 8, cy: DIGIT.height - DIGIT.thickness / 2, r: DIGIT.thickness * 0.6 }

export const COLON = {
  advance: 20,
  dots: [
    { cx: 8, cy: DIGIT.height * 0.3, r: DIGIT.thickness * 0.6 },
    { cx: 8, cy: DIGIT.height * 0.7, r: DIGIT.thickness * 0.6 },
  ],
}

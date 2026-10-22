/**
 * Builds Vacuum Matrix, a font drawn from the same 5×7 glyph table as `VDotMatrix`: every lit
 * cell is a round dot on an 8-row em, and each character advances six cells. Run after changing
 * the glyph table: `bun scripts/matrix-font.ts`.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import opentype from 'opentype.js'
import { dotGlyph } from '../src/runtime/utils/glyphs'

const ROWS = 8
const COLUMNS = 5
const ADVANCE = 6
const UNIT = 128
const EM = UNIT * ROWS
/** The baseline sits under row 6; row 7 holds descenders. */
const ASCENDER = UNIT * 7
const DESCENDER = -UNIT
/** Same lit radius as `VDotMatrix`, in cells. */
const RADIUS = 0.42 * UNIT
/** Control-point distance that makes four cubic curves into a circle. */
const KAPPA = 0.5523

const out = resolve(import.meta.dirname, '../src/runtime/fonts/vacuum-matrix.otf')

function dot(path: opentype.Path, column: number, row: number) {
  const cx = (column + 0.5) * UNIT
  const cy = ASCENDER - (row + 0.5) * UNIT
  const r = RADIUS
  const k = r * KAPPA
  path.moveTo(cx, cy + r)
  path.curveTo(cx + k, cy + r, cx + r, cy + k, cx + r, cy)
  path.curveTo(cx + r, cy - k, cx + k, cy - r, cx, cy - r)
  path.curveTo(cx - k, cy - r, cx - r, cy - k, cx - r, cy)
  path.curveTo(cx - r, cy + k, cx - k, cy + r, cx, cy + r)
  path.close()
}

const glyphs = [
  new opentype.Glyph({ name: '.notdef', advanceWidth: ADVANCE * UNIT, path: new opentype.Path() }),
]

for (let code = 32; code <= 126; code++) {
  const char = String.fromCharCode(code)
  const path = new opentype.Path()
  dotGlyph(char).forEach((cells, column) => {
    if (column >= COLUMNS) return
    cells.forEach((on, row) => {
      if (on && row < ROWS) dot(path, column, row)
    })
  })
  glyphs.push(new opentype.Glyph({
    name: code === 32 ? 'space' : `uni${code.toString(16).toUpperCase().padStart(4, '0')}`,
    unicode: code,
    advanceWidth: ADVANCE * UNIT,
    path,
  }))
}

const font = new opentype.Font({
  familyName: 'Vacuum Matrix',
  styleName: 'Regular',
  unitsPerEm: EM,
  ascender: ASCENDER,
  descender: DESCENDER,
  glyphs,
})

await mkdir(dirname(out), { recursive: true })
await writeFile(out, new Uint8Array(font.toArrayBuffer()))
console.log(`${out} (${glyphs.length} glyphs)`)

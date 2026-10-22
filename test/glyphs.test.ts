import { describe, expect, it } from 'vitest'
import { dotGlyph, SEGMENT_POLYGONS, toCells } from '../src/runtime/utils/glyphs'

describe('toCells', () => {
  it('maps digits to 7-segment bits', () => {
    expect(toCells('18', 7).map(cell => cell.bits)).toEqual([0b0000110, 0b1111111])
  })

  it('attaches decimal points to the previous digit', () => {
    expect(toCells('1.5', 7)).toEqual([
      { kind: 'char', bits: 0b0000110, dp: true },
      { kind: 'char', bits: 0b1101101, dp: false },
    ])
  })

  it('gives a leading decimal point its own cell', () => {
    expect(toCells('.5', 7)[0]).toEqual({ kind: 'char', bits: 0, dp: true })
  })

  it('renders colons as separate cells', () => {
    expect(toCells('12:30', 7).map(cell => cell.kind)).toEqual(['char', 'char', 'colon', 'char', 'char'])
  })

  it('uses the 14-segment table for letters', () => {
    // T = A + J + M
    expect(toCells('T', 14)[0]!.bits).toBe(0b0001001000000001)
  })

  it('leaves unknown 7-segment characters blank', () => {
    expect(toCells('W', 7)[0]!.bits).toBe(0)
  })
})

describe('dotGlyph', () => {
  it('returns a 5 × 8 grid', () => {
    const glyph = dotGlyph('A')
    expect(glyph).toHaveLength(5)
    expect(glyph.every(column => column.length === 8)).toBe(true)
  })

  it('draws the letter A', () => {
    // 0x7C, 0x12, 0x11, 0x12, 0x7C
    // Apex at the top, crossbar on row 4
    expect(dotGlyph('A')[2]!.map(Number)).toEqual([1, 0, 0, 0, 1, 0, 0, 0])
    expect(dotGlyph('A')[0]!.map(Number)).toEqual([0, 0, 1, 1, 1, 1, 1, 0])
  })

  it('treats a space as blank', () => {
    expect(dotGlyph(' ').flat().some(Boolean)).toBe(false)
  })
})

describe('SEGMENT_POLYGONS', () => {
  it('has one polygon per segment', () => {
    expect(SEGMENT_POLYGONS[7]).toHaveLength(7)
    expect(SEGMENT_POLYGONS[14]).toHaveLength(14)
  })
})

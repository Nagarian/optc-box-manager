import { Potentials, UnitPirateFestStyles } from 'models/units'
import { DBUnit } from './units'

describe('Database compliance ', () => {
  const db = DBUnit.getAllUnits()

  it('Kung-fu Luffy should be at ID 3333', () => {
    const selectedUnit = db.find(unit => unit.name === 'Monkey D. Luffy, Kung Fu Training')

    expect(selectedUnit).toBeDefined()
    expect(selectedUnit!.id).toEqual(3333)
  })

  it('Potentials should respect thus defined', () => {
    const potentials = [...(new Set(db
      .flatMap(unit => unit.detail.potential)
      .filter(Boolean)
      .map(p => p!.Name),
    ))].sort()

    expect(potentials).toEqual([...Potentials].sort())
  })

  it('PirateFestStyle should respect thus defined', () => {
    const pfStyles = [...(new Set(db
      .map(unit => unit.pirateFest.class)
      .filter(Boolean),
    ))].sort()

    expect(pfStyles).toEqual([...UnitPirateFestStyles].sort())
  })
})

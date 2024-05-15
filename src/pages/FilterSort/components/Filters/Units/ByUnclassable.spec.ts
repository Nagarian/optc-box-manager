import { ExtendedUnit } from 'models/units'
import { ByUnclassableFilter } from './ByUnclassable'

describe('ByUnclassable', () => {
  it('should return global unit', () => {
    const filter = ByUnclassableFilter({ exclude: { japanOnly: true } })

    expect(
      filter({
        flags: { gloOnly: 1 },
      } as ExtendedUnit),
    ).toBe(true)
  })

  it('should return evolved unit', () => {
    const filter = ByUnclassableFilter({ evolvedOnly: true })

    expect(
      filter({
        evolution: { evolution: 42, evolvers: ['skullSTR', 43, 44, 45, 46] },
      } as ExtendedUnit),
    ).toBe(true)
  })

  it('should fail when one condition is not meet', () => {
    const filter = ByUnclassableFilter({
      exclude: { japanOnly: true },
      evolvedOnly: true,
    })

    expect(
      filter({
        flags: { japOnly: 1 },
      } as ExtendedUnit),
    ).toBe(false)
  })
})

import { ExtendedUnit } from 'models/units'
import { ByUnclassableFilter } from './ByUnclassable'

describe('ByUnclassable', () => {
  it('should return global unit', () => {
    const filter = ByUnclassableFilter({ globalOnly: true })

    expect(
      filter({
        flags: { global: 1 },
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
    const filter = ByUnclassableFilter({ globalOnly: true, evolvedOnly: true })

    expect(
      filter({
        flags: {},
      } as ExtendedUnit),
    ).toBe(false)
  })
})

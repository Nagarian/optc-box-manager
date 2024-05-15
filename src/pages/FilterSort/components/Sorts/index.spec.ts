import { unitsMock } from 'mocks/UnitMock'
import { ExtendedUnit } from 'models/units'
import { byId } from './Units/ByCommon'
import { byRarity } from './Units/ByRarity'
import byType from './Units/ByType'

describe('UnitSort', () => {
  describe('Sorts functions', () => {
    it('should order by unit id', () => {
      expect(
        unitsMock()
          .sort(byId)
          .map(u => u.id),
      ).toStrictEqual([1, 2, 3, 4])
    })

    it('should order by rarity', () => {
      expect(
        unitsMock()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
          .sort(byRarity({ truncated: false }) as any)
          .map(u => u.stars),
      ).toStrictEqual([5, 6, 6, '6+'])
    })

    it('should order by type', () => {
      expect(
        unitsMock()
          .sort(byType)
          .map(u => u.type),
      ).toStrictEqual(['STR', 'STR', 'DEX', 'QCK'])
    })

    it('should order by type, put dual unit first', () => {
      expect(
        unitsMock()
          .concat({
            id: 8,
            type: ['QCK', 'INT'],
            stars: '6+',
            name: 'Zoro/Mihawk',
          } as ExtendedUnit)
          .sort(byType)
          .map(u => u.type),
      ).toStrictEqual([['QCK', 'INT'], 'STR', 'STR', 'DEX', 'QCK'])
    })
  })
})

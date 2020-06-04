import { ExtendedUnit } from 'models/units'
import { byId } from './Units/ByCommon'
import byRarity from './Units/ByRarity'
import byType from './Units/ByType'

const unitsMock = () => [
  {
    id: 3,
    type: 'STR',
    stars: 5,
    name: 'Luffy',
  } as ExtendedUnit,
  {
    id: 2,
    type: 'DEX',
    stars: 6,
    name: 'Zoro',
  } as ExtendedUnit,
  {
    id: 1,
    type: 'STR',
    stars: 6,
    name: 'Ace',
  } as ExtendedUnit,
  {
    id: 4,
    type: 'QCK',
    stars: '6+',
    name: 'Sanji',
  } as ExtendedUnit,
]

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
          .sort(byRarity)
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

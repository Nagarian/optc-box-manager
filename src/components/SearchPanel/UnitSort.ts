import { ExtendedUnit, UnitStar, UnitType } from 'models/units'

type UnitSort = (unit1: ExtendedUnit, unit2: ExtendedUnit) => number

const ParseStar = (star: UnitStar): number => {
  switch (star) {
    case '4+':
      return 4.5
    case '5+':
      return 5.5
    case '6+':
      return 6.6
    default:
      return star as number
  }
}

const _ParseType = (type: UnitType): number => {
  switch (type) {
    case 'STR':
      return 1
    case 'DEX':
      return 2
    case 'QCK':
      return 3
    case 'PSY':
      return 4
    case 'INT':
      return 5
    default:
      return 6
  }
}

const ParseType = (type: UnitType | [UnitType, UnitType]): number => {
  return Array.isArray(type)
    ? 0 // dual unit
    : _ParseType(type as UnitType)
}

type SortsFunc = {
  [name: string]: UnitSort
  byId: UnitSort
  byIdReverse: UnitSort
  byRarity: UnitSort
  byType: UnitSort
}

export const Sorts: SortsFunc = {
  byId: (unit1, unit2) => unit1.id - unit2.id,
  byIdReverse: (unit1, unit2) => unit2.id - unit1.id,
  byRarity: (unit1, unit2) => ParseStar(unit2.stars) - ParseStar(unit1.stars),
  byType: (unit1, unit2) => ParseType(unit1.type) - ParseType(unit2.type),
}

type SortCriteria = 'Default' | 'Rarity' | 'Type' | 'Id' | 'IdReverse'

function SortCriteriaToFunc (sortCriteria: SortCriteria): UnitSort[] {
  switch (sortCriteria) {
    case 'Rarity':
      return [Sorts.byRarity]
    case 'Type':
      return [Sorts.byType]
    case 'Id':
      return [Sorts.byId]
    case 'IdReverse':
      return [Sorts.byIdReverse]
    case 'Default':
    default:
      return [Sorts.byType, Sorts.byRarity, Sorts.byId]
  }
}

export function useUnitSort (...sortCriteria: SortCriteria[]) {
  const sorts = sortCriteria.flatMap(SortCriteriaToFunc)
  return {
    sorts: <UnitSort>(unit1: ExtendedUnit, unit2: ExtendedUnit) => {
      for (const sort of sorts) {
        const result = sort(unit1, unit2)
        if (result !== 0) return result
      }

      return 0
    },
  }
}

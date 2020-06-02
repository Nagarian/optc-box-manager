import { UnitSort } from 'models/search'
import { ExtendedUnit, UnitType } from 'models/units'

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
  byType: UnitSort
  byFamily: UnitSort
}

export const Sorts: SortsFunc = {
  byId: (unit1, unit2) => unit1.id - unit2.id,
  byIdReverse: (unit1, unit2) => unit2.id - unit1.id,
  byType: (unit1, unit2) => ParseType(unit1.type) - ParseType(unit2.type),
  byFamily: (unit1, unit2) => unit1.family.id - unit2.family.id,
}

type SortCriteria = 'Default' | 'Type' | 'Id' | 'IdReverse' | 'Family'

function SortCriteriaToFunc (sortCriteria: SortCriteria): UnitSort[] {
  switch (sortCriteria) {
    case 'Type':
      return [Sorts.byType]
    case 'Id':
      return [Sorts.byId]
    case 'IdReverse':
      return [Sorts.byIdReverse]
    case 'Family':
      return [Sorts.byFamily]
    case 'Default':
    default:
      return [Sorts.byType, Sorts.byFamily, Sorts.byId]
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

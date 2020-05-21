import { ExtendedUnit, UnitStar, UnitType } from 'models/units'
import { useEffect, useState } from 'react'

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
    ? _ParseType(type[0] as UnitType)
    : _ParseType(type as UnitType) + 5
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

export function useUnitSort () {
  const [sorts, setSorts] = useState<UnitSort[]>([])

  useEffect(() => {
    setSorts([Sorts.byType, Sorts.byRarity, Sorts.byId])
  }, [])

  return {
    sorts: <UnitSort>(unit1: ExtendedUnit, unit2: ExtendedUnit) => {
      for (const sort of sorts) {
        const result = sort(unit1, unit2)
        if (result !== 0) return result
      }

      return 0
    },
    arr: sorts,
  }
}

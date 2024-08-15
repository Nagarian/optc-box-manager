import { UnitType } from 'models/units'
import { UnitSort } from '..'

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
    : _ParseType(type)
}

const byType: UnitSort = (unit1, unit2) =>
  ParseType(unit1.type) - ParseType(unit2.type)

export default byType

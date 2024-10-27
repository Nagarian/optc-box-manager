import { UnitPirateFestStyle } from 'models/units'
import { UnitSort } from '..'

const ParseFestStyle = (type: UnitPirateFestStyle | undefined): number => {
  switch (type) {
    case 'ATK':
      return 1
    case 'DEF':
      return 2
    case 'RCV':
      return 3
    case 'DBF':
      return 4
    case 'SPT':
      return 5
    default:
      return 6
  }
}

export const byFestStyle: UnitSort = (unit1, unit2) =>
  ParseFestStyle(unit1.pirateFest.class) -
  ParseFestStyle(unit2.pirateFest.class)

import { UnitSort } from 'models/search'
import { UnitPirateFestStyle } from 'models/units'

const ParseFestStyle = (type: UnitPirateFestStyle | undefined): number => {
  switch (type) {
    case 'Attacker':
      return 1
    case 'Defender':
      return 2
    case 'Healer':
      return 3
    case 'Obstructer':
      return 4
    case 'Supporter':
      return 5
    default:
      return 6
  }
}

const byFestStyle: UnitSort = (unit1, unit2) =>
  ParseFestStyle(unit1.pirateFest.class) - ParseFestStyle(unit2.pirateFest.class)

export default byFestStyle

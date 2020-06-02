import { UnitSort } from 'models/search'
import { UnitStar } from 'models/units'

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

const byRarity: UnitSort = (unit1, unit2) =>
  ParseStar(unit2.stars) - ParseStar(unit1.stars)

export default byRarity

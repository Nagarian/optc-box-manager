import { UnitFilter, UnitFilterCriteria } from 'models/search'
import { ByClassCriteria, ByClassFilter } from './ByClass'
import { ByPotentialCriteria, ByPotentialFilter } from './ByPotential'
import { ByRarityCriteria, ByRarityFilter } from './ByRarity'
import { ByRcvFinderCriteria, ByRcvFinderFilter } from './ByRcvFinder'
import { BySupportCriteria, BySupportFilter } from './BySupport'
import { ByTypeCriteria, ByTypeFilter } from './ByType'
import { ByUnclassableCriteria, ByUnclassableFilter } from './ByUnclassable'

export type SearchFilterUnits = {
  // [key: string]: UnitFilterCriteria
  byRarity?: ByRarityCriteria
  bySupport?: BySupportCriteria
  byPotential?: ByPotentialCriteria
  byClass?: ByClassCriteria
  byType?: ByTypeCriteria
  byUnclassable?: ByUnclassableCriteria
  byRcvFinder?: ByRcvFinderCriteria
}

export function UnitFilterBuilder (
  key: string,
  criteria: UnitFilterCriteria,
): UnitFilter {
  switch (key) {
    case 'byRarity':
      return ByRarityFilter(criteria as ByRarityCriteria)
    case 'bySupport':
      return BySupportFilter(criteria as BySupportCriteria)
    case 'byPotential':
      return ByPotentialFilter(criteria as ByPotentialCriteria)
    case 'byClass':
      return ByClassFilter(criteria as ByClassCriteria)
    case 'byType':
      return ByTypeFilter(criteria as ByTypeCriteria)
    case 'byUnclassable':
      return ByUnclassableFilter(criteria as ByUnclassableCriteria)
    case 'byRcvFinder':
      return ByRcvFinderFilter(criteria as ByRcvFinderCriteria)
    default:
      throw new Error(`Invalid filter " ${key} "`)
  }
}

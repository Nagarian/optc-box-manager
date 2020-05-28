import { UnitFilter, UnitFilterCriteria } from 'models/search'
import { ByRarityCriteria, ByRarityFilter } from './ByRarity'

export function UnitFilterBuilder (
  key: string,
  criteria: UnitFilterCriteria,
): UnitFilter {
  switch (key) {
    case 'byRarity':
      return ByRarityFilter(criteria as ByRarityCriteria)

    default:
      throw new Error(`Invalid filter " ${key} "`)
  }
}

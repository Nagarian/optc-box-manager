import { UnitFilter, UnitFilterCriteria } from 'models/search'
import { ByRarityCriteria, ByRarityFilter } from './ByRarity'
import { BySupportCriteria, BySupportFilter } from './BySupport'

export type SearchFilterUnits = {
  // [key: string]: UnitFilterCriteria
  byRarity?: ByRarityCriteria
  bySupport?: BySupportCriteria
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
    default:
      throw new Error(`Invalid filter " ${key} "`)
  }
}

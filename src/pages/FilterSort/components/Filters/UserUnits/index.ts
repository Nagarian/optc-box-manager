import { UnitFilter, UserUnitFilterCriteria } from 'models/search'
import { ByCottonCandyCriteria, ByCottonCandyFilter } from './ByCottonCandy'
import { ByUserPotentialCriteria, ByUserPotentialFilter } from './ByUserPotential'

export type SearchFilterUserUnitsKeys = 'byUserPotential' | 'byCottonCandy'

export type SearchFilterUserUnits = {
  [key in SearchFilterUserUnitsKeys]?: UserUnitFilterCriteria
}

export function UserUnitFilterBuilder (
  key: SearchFilterUserUnitsKeys,
  criteria: UserUnitFilterCriteria,
): UnitFilter {
  switch (key) {
    case 'byUserPotential':
      return ByUserPotentialFilter(criteria as ByUserPotentialCriteria)
    case 'byCottonCandy':
      return ByCottonCandyFilter(criteria as ByCottonCandyCriteria)
    default:
      throw new Error(`Invalid filter " ${key} "`)
  }
}

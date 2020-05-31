import { UnitFilter, UserUnitFilterCriteria } from 'models/search'
import { ByCottonCandyCriteria, ByCottonCandyFilter } from './ByCottonCandy'
import { ByUserPotentialCriteria, ByUserPotentialFilter } from './ByUserPotential'
import { ByUserSupportCriteria, ByUserSupportFilter } from './ByUserSupport'

export type SearchFilterUserUnitsKeys = 'byUserPotential' | 'byCottonCandy' | 'byUserSupport'

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
    case 'byUserSupport':
      return ByUserSupportFilter(criteria as ByUserSupportCriteria)
    default:
      throw new Error(`Invalid filter " ${key} "`)
  }
}

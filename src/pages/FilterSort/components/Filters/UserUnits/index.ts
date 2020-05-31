import { UnitFilter, UserUnitFilterCriteria } from 'models/search'
import { ByUserPotentialCriteria, ByUserPotentialFilter } from './ByUserPotential'

export type SearchFilterUserUnitsKeys = 'byUserPotential'

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
    default:
      throw new Error(`Invalid filter " ${key} "`)
  }
}

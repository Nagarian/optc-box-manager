import { UserUnitFilter, UserUnitFilterCriteria } from 'models/search'
import { ByUserCottonCandyCriteria, ByUserCottonCandyFilter } from './ByUserCottonCandy'
import { ByUserPotentialCriteria, ByUserPotentialFilter } from './ByUserPotential'
import { ByUserSpecialCriteria, ByUserSpecialFilter } from './ByUserSpecial'
import { ByUserSupportCriteria, ByUserSupportFilter } from './ByUserSupport'

export type SearchFilterUserUnitsKeys =
  | 'byUserPotential'
  | 'byUserCottonCandy'
  | 'byUserSupport'
  | 'byUserSpecial'

export type SearchFilterUserUnits = {
  [key in SearchFilterUserUnitsKeys]?: UserUnitFilterCriteria
}

export function UserUnitFilterBuilder (
  key: SearchFilterUserUnitsKeys,
  criteria: UserUnitFilterCriteria,
): UserUnitFilter {
  switch (key) {
    case 'byUserPotential':
      return ByUserPotentialFilter(criteria as ByUserPotentialCriteria)
    case 'byUserCottonCandy':
      return ByUserCottonCandyFilter(criteria as ByUserCottonCandyCriteria)
    case 'byUserSupport':
      return ByUserSupportFilter(criteria as ByUserSupportCriteria)
    case 'byUserSpecial':
      return ByUserSpecialFilter(criteria as ByUserSpecialCriteria)
    default:
      throw new Error(`Invalid filter " ${key} "`)
  }
}

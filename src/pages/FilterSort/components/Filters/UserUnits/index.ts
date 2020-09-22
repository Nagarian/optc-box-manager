import { SearchFilterCriteria, SearchFilterCriteriaInputProps, UserUnitFilter } from 'models/search'
import { FunctionComponent } from 'react'
import { ByUserCottonCandyFilter, ByUserCottonCandyInput } from './ByUserCottonCandy'
import { ByUserPotentialFilter, ByUserPotentialInput } from './ByUserPotential'
import { ByUserSpecialFilter, ByUserSpecialInput } from './ByUserSpecial'
import { ByUserSupportFilter, ByUserSupportInput } from './ByUserSupport'
import { ByUserLimitBreakFilter, ByUserLimitBreakInput } from './ByUserLimitBreak'
import { UserSettingEnhanced } from 'hooks/useUserSettings'

export const SearchFilterUserUnitsKeys = [
  'byUserSpecial',
  'byUserCottonCandy',
  'byUserSupport',
  'byUserLimitBreak',
  'byUserPotential',
] as const

export type SearchFilterUserUnitsType = typeof SearchFilterUserUnitsKeys[number]

export type SearchFilterUserUnits = {
  [key in SearchFilterUserUnitsType]?: SearchFilterCriteria
}

type Builder = (criteria: SearchFilterCriteria, userSetting: UserSettingEnhanced) => UserUnitFilter
export const UserUnitFilterBuilder: {
  [key in SearchFilterUserUnitsType]: {
    title: string
    builder: Builder
    input: FunctionComponent<
      SearchFilterCriteriaInputProps<SearchFilterCriteria>
    >
  }
} = {
  byUserPotential: {
    title: 'Potential ability',
    builder: ByUserPotentialFilter,
    input: ByUserPotentialInput,
  },
  byUserCottonCandy: {
    title: 'Cotton Candy',
    builder: ByUserCottonCandyFilter,
    input: ByUserCottonCandyInput,
  },
  byUserSupport: {
    title: 'Support',
    builder: ByUserSupportFilter,
    input: ByUserSupportInput,
  },
  byUserSpecial: {
    title: 'Special',
    builder: ByUserSpecialFilter,
    input: ByUserSpecialInput,
  },
  byUserLimitBreak: {
    title: 'Limit Break',
    builder: ByUserLimitBreakFilter,
    input: ByUserLimitBreakInput,
  },
}

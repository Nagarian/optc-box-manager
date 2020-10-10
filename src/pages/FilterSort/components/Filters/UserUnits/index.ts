import { UserSettingEnhanced } from 'hooks/useUserSettings'
import {
  SearchFilterCriteria,
  SearchFilterCriteriaInputProps,
  UserUnitFilter,
} from 'models/search'
import { FunctionComponent } from 'react'
import {
  ByUserCottonCandyFilter,
  ByUserCottonCandyInput,
} from './ByUserCottonCandy'
import {
  ByUserLimitBreakFilter,
  ByUserLimitBreakInput,
} from './ByUserLimitBreak'
import {
  ByUserPirateFestFilter,
  ByUserPirateFestInput,
} from './ByUserPirateFest'
import { ByUserPotentialFilter, ByUserPotentialInput } from './ByUserPotential'
import {
  ByUserPowerSocketFilter,
  ByUserPowerSocketInput,
} from './ByUserPowerSocket'
import { ByUserSpecialFilter, ByUserSpecialInput } from './ByUserSpecial'
import { ByUserSupportFilter, ByUserSupportInput } from './ByUserSupport'

export const SearchFilterUserUnitsKeys = [
  'byUserSpecial',
  'byUserCottonCandy',
  'byUserSupport',
  'byUserPirateFest',
  'byUserLimitBreak',
  'byUserPotential',
  'byUserPowerSocket',
] as const

export type SearchFilterUserUnitsType = typeof SearchFilterUserUnitsKeys[number]

export type SearchFilterUserUnits = {
  [key in SearchFilterUserUnitsType]?: SearchFilterCriteria
}

type Builder = (
  criteria: SearchFilterCriteria,
  userSetting: UserSettingEnhanced,
) => UserUnitFilter
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
  byUserPirateFest: {
    title: 'Pirate Rumble',
    builder: ByUserPirateFestFilter,
    input: ByUserPirateFestInput,
  },
  byUserPowerSocket: {
    title: 'Power Sockets',
    builder: ByUserPowerSocketFilter,
    input: ByUserPowerSocketInput,
  },
}

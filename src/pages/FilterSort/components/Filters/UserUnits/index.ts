import { UserSettingEnhanced } from 'hooks/useUserSettings'
import { SearchFilterCriteriaInputProps, UserUnitFilter } from 'models/search'
import { FunctionComponent } from 'react'
import {
  ByUserCottonCandyFilter,
  ByUserCottonCandyInput,
} from './ByUserCottonCandy'
import { ByUserInkFilter, ByUserInkInput } from './ByUserInk'
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
  'byUserInk',
  'byUserPowerSocket',
] as const

export type SearchFilterUserUnitsType = typeof SearchFilterUserUnitsKeys[number]

type Builder<T = unknown | undefined> = (
  criteria: T,
  userSetting: UserSettingEnhanced,
) => UserUnitFilter

type UserUnitFilterBuilderType<T> = {
  title: string
  builder: Builder<T>
  input: FunctionComponent<SearchFilterCriteriaInputProps<T>>
}

export const UserUnitFilterBuilder: {
  [key in SearchFilterUserUnitsType]: UserUnitFilterBuilderType<any>
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
  byUserInk: {
    title: 'Ink Effects',
    builder: ByUserInkFilter,
    input: ByUserInkInput,
  },
}

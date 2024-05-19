import { UserSettingEnhanced } from 'hooks/useUserSettings'
import { SearchFilterCriteriaInputProps, UserUnitFilter } from 'models/search'
import { FunctionComponent } from 'react'
import { ByUserCoopFilter, ByUserCoopInput } from './ByUserCoop'
import {
  ByUserCottonCandyFilter,
  ByUserCottonCandyInput,
} from './ByUserCottonCandy'
import { ByUserInkFilter, ByUserInkInput } from './ByUserInk'
import { ByUserLevelFilter, ByUserLevelInput } from './ByUserLevel'
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
  'byUserLevel',
  'byUserSpecial',
  'byUserCottonCandy',
  'byUserSupport',
  'byUserPirateFest',
  'byUserLimitBreak',
  'byUserPotential',
  'byUserInk',
  'byUserPowerSocket',
  'byUserCoop',
] as const

export type SearchFilterUserUnitsType =
  (typeof SearchFilterUserUnitsKeys)[number]

type Builder<T = unknown> = (
  criteria: T,
  userSetting: UserSettingEnhanced,
) => UserUnitFilter

type UserUnitFilterBuilderType<T> = {
  title: string
  builder: Builder<T>
  input: FunctionComponent<SearchFilterCriteriaInputProps<T>>
}

export const UserUnitFilterBuilder: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  byUserLevel: {
    title: 'Level',
    builder: ByUserLevelFilter,
    input: ByUserLevelInput,
  },
  byUserCoop: {
    title: 'Coop',
    builder: ByUserCoopFilter,
    input: ByUserCoopInput,
  },
}

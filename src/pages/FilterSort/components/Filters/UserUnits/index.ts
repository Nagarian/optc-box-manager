import { UserSettingEnhanced } from 'hooks/useUserSettings'
import { SearchFilterCriteriaInputProps, UserUnitFilter } from 'models/search'
import { FunctionComponent } from 'react'
import {
  ByUserCoopCriteria,
  ByUserCoopFilter,
  ByUserCoopInput,
} from './ByUserCoop'
import {
  ByUserCottonCandyCriteria,
  ByUserCottonCandyFilter,
  ByUserCottonCandyInput,
} from './ByUserCottonCandy'
import { ByUserInkCriteria, ByUserInkFilter, ByUserInkInput } from './ByUserInk'
import {
  ByUserLevelCriteria,
  ByUserLevelFilter,
  ByUserLevelInput,
} from './ByUserLevel'
import {
  ByUserLimitBreakCriteria,
  ByUserLimitBreakFilter,
  ByUserLimitBreakInput,
} from './ByUserLimitBreak'
import {
  ByUserPirateFestCriteria,
  ByUserPirateFestFilter,
  ByUserPirateFestInput,
} from './ByUserPirateFest'
import {
  ByUserPotentialCriteria,
  ByUserPotentialFilter,
  ByUserPotentialInput,
} from './ByUserPotential'
import {
  ByUserPowerSocketCriteria,
  ByUserPowerSocketFilter,
  ByUserPowerSocketInput,
} from './ByUserPowerSocket'
import {
  ByUserSpecialCriteria,
  ByUserSpecialFilter,
  ByUserSpecialInput,
} from './ByUserSpecial'
import {
  ByUserSupportCriteria,
  ByUserSupportFilter,
  ByUserSupportInput,
} from './ByUserSupport'

type SearchFilterUserUnitAll = {
  byUserLevel: ByUserLevelCriteria
  byUserSpecial: ByUserSpecialCriteria
  byUserCottonCandy: ByUserCottonCandyCriteria
  byUserSupport: ByUserSupportCriteria
  byUserPirateFest: ByUserPirateFestCriteria
  byUserLimitBreak: ByUserLimitBreakCriteria
  byUserPotential: ByUserPotentialCriteria
  byUserInk: ByUserInkCriteria
  byUserPowerSocket: ByUserPowerSocketCriteria
  byUserCoop: ByUserCoopCriteria
}

export type SearchFilterUserUnitsType = keyof SearchFilterUserUnitAll

export type SearchFilterUserUnits = Partial<SearchFilterUserUnitAll>

export const UserUnitFilterBuilder: {
  [key in SearchFilterUserUnitsType]: {
    key: key
    title: string
    builder: (
      criteria: SearchFilterUserUnitAll[key],
      userSetting: UserSettingEnhanced,
    ) => UserUnitFilter
    input: FunctionComponent<
      SearchFilterCriteriaInputProps<SearchFilterUserUnitAll[key]>
    >
  }
} = {
  byUserLevel: {
    key: 'byUserLevel',
    title: 'Level',
    builder: ByUserLevelFilter,
    input: ByUserLevelInput,
  },
  byUserSpecial: {
    key: 'byUserSpecial',
    title: 'Special',
    builder: ByUserSpecialFilter,
    input: ByUserSpecialInput,
  },
  byUserCottonCandy: {
    key: 'byUserCottonCandy',
    title: 'Cotton Candy',
    builder: ByUserCottonCandyFilter,
    input: ByUserCottonCandyInput,
  },
  byUserSupport: {
    key: 'byUserSupport',
    title: 'Support',
    builder: ByUserSupportFilter,
    input: ByUserSupportInput,
  },
  byUserPirateFest: {
    key: 'byUserPirateFest',
    title: 'Pirate Rumble',
    builder: ByUserPirateFestFilter,
    input: ByUserPirateFestInput,
  },
  byUserLimitBreak: {
    key: 'byUserLimitBreak',
    title: 'Limit Break',
    builder: ByUserLimitBreakFilter,
    input: ByUserLimitBreakInput,
  },
  byUserPotential: {
    key: 'byUserPotential',
    title: 'Potential ability',
    builder: ByUserPotentialFilter,
    input: ByUserPotentialInput,
  },
  byUserInk: {
    key: 'byUserInk',
    title: 'Ink Effects',
    builder: ByUserInkFilter,
    input: ByUserInkInput,
  },
  byUserPowerSocket: {
    key: 'byUserPowerSocket',
    title: 'Power Sockets',
    builder: ByUserPowerSocketFilter,
    input: ByUserPowerSocketInput,
  },
  byUserCoop: {
    key: 'byUserCoop',
    title: 'Coop',
    builder: ByUserCoopFilter,
    input: ByUserCoopInput,
  },
}

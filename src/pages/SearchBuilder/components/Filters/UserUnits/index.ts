import { UserSettingEnhanced } from 'hooks/useUserSettings'
import { SearchFilterCriteriaInputProps, UserUnitFilter } from 'models/search'
import { FunctionComponent } from 'react'
import { SearchRecapItemCriteriaProps } from '../../BoxDisplayers/SearchRecap/SearchRecapItem'
import {
  ByUserCoopBoxDisplayer,
  ByUserCoopCriteria,
  ByUserCoopFilter,
  ByUserCoopInput,
} from './ByUserCoop'
import {
  ByUserCottonCandyBoxDisplayer,
  ByUserCottonCandyCriteria,
  ByUserCottonCandyFilter,
  ByUserCottonCandyInput,
} from './ByUserCottonCandy'
import {
  ByUserInkBoxDisplayer,
  ByUserInkCriteria,
  ByUserInkFilter,
  ByUserInkInput,
} from './ByUserInk'
import {
  ByUserLevelBoxDisplayer,
  ByUserLevelCriteria,
  ByUserLevelFilter,
  ByUserLevelInput,
} from './ByUserLevel'
import {
  ByUserLimitBreakBoxDisplayer,
  ByUserLimitBreakCriteria,
  ByUserLimitBreakFilter,
  ByUserLimitBreakInput,
} from './ByUserLimitBreak'
import {
  ByUserPirateFestBoxDisplayer,
  ByUserPirateFestCriteria,
  ByUserPirateFestFilter,
  ByUserPirateFestInput,
} from './ByUserPirateFest'
import {
  ByUserPotentialBoxDisplayer,
  ByUserPotentialCriteria,
  ByUserPotentialFilter,
  ByUserPotentialInput,
} from './ByUserPotential'
import {
  ByUserPowerSocketBoxDisplayer,
  ByUserPowerSocketCriteria,
  ByUserPowerSocketFilter,
  ByUserPowerSocketInput,
} from './ByUserPowerSocket'
import {
  ByUserSpecialBoxDisplayer,
  ByUserSpecialCriteria,
  ByUserSpecialFilter,
  ByUserSpecialInput,
} from './ByUserSpecial'
import {
  ByUserSupportBoxDisplayer,
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
    boxDisplayer: FunctionComponent<
      SearchRecapItemCriteriaProps<SearchFilterUserUnitAll[key]>
    >
  }
} = {
  byUserLevel: {
    key: 'byUserLevel',
    title: 'Level',
    builder: ByUserLevelFilter,
    input: ByUserLevelInput,
    boxDisplayer: ByUserLevelBoxDisplayer,
  },
  byUserSpecial: {
    key: 'byUserSpecial',
    title: 'Special',
    builder: ByUserSpecialFilter,
    input: ByUserSpecialInput,
    boxDisplayer: ByUserSpecialBoxDisplayer,
  },
  byUserCottonCandy: {
    key: 'byUserCottonCandy',
    title: 'Cotton Candy',
    builder: ByUserCottonCandyFilter,
    input: ByUserCottonCandyInput,
    boxDisplayer: ByUserCottonCandyBoxDisplayer,
  },
  byUserSupport: {
    key: 'byUserSupport',
    title: 'Support',
    builder: ByUserSupportFilter,
    input: ByUserSupportInput,
    boxDisplayer: ByUserSupportBoxDisplayer,
  },
  byUserPirateFest: {
    key: 'byUserPirateFest',
    title: 'Pirate Rumble',
    builder: ByUserPirateFestFilter,
    input: ByUserPirateFestInput,
    boxDisplayer: ByUserPirateFestBoxDisplayer,
  },
  byUserLimitBreak: {
    key: 'byUserLimitBreak',
    title: 'Limit Break',
    builder: ByUserLimitBreakFilter,
    input: ByUserLimitBreakInput,
    boxDisplayer: ByUserLimitBreakBoxDisplayer,
  },
  byUserPotential: {
    key: 'byUserPotential',
    title: 'Potential ability',
    builder: ByUserPotentialFilter,
    input: ByUserPotentialInput,
    boxDisplayer: ByUserPotentialBoxDisplayer,
  },
  byUserInk: {
    key: 'byUserInk',
    title: 'Ink Effects',
    builder: ByUserInkFilter,
    input: ByUserInkInput,
    boxDisplayer: ByUserInkBoxDisplayer,
  },
  byUserPowerSocket: {
    key: 'byUserPowerSocket',
    title: 'Power Sockets',
    builder: ByUserPowerSocketFilter,
    input: ByUserPowerSocketInput,
    boxDisplayer: ByUserPowerSocketBoxDisplayer,
  },
  byUserCoop: {
    key: 'byUserCoop',
    title: 'Coop',
    builder: ByUserCoopFilter,
    input: ByUserCoopInput,
    boxDisplayer: ByUserCoopBoxDisplayer,
  },
}

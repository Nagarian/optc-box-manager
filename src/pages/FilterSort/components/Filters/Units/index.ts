import { SearchFilterCriteriaInputProps, UnitFilter } from 'models/search'
import { FunctionComponent } from 'react'
import { SearchRecapItemCriteriaProps } from '../../BoxDisplayers/SearchRecap/SearchRecapItem'
import {
  ByClassBoxDisplayer,
  ByClassCriteria,
  ByClassFilter,
  ByClassInput,
} from './ByClass'
import {
  ByDropBoxDisplayer,
  ByDropCriteria,
  ByDropFilter,
  ByDropInput,
} from './ByDrop'
import {
  ByLimitBreakBoxDisplayer,
  ByLimitBreakCriteria,
  ByLimitBreakFilter,
  ByLimitBreakInput,
} from './ByLimitBreak'
import {
  ByPirateFestBoxDisplayer,
  ByPirateFestStyleCriteria,
  ByPirateFestStyleFilter,
  ByPirateFestStyleInput,
} from './ByPirateFestStyle'
import {
  ByPotentialBoxDisplayer,
  ByPotentialCriteria,
  ByPotentialFilter,
  ByPotentialInput,
} from './ByPotential'
import {
  ByRarityBoxDisplayer,
  ByRarityCriteria,
  ByRarityFilter,
  ByRarityInput,
} from './ByRarity'
import {
  ByRcvFinderBoxDisplayer,
  ByRcvFinderCriteria,
  ByRcvFinderFilter,
  ByRcvFinderInput,
} from './ByRcvFinder'
import {
  BySearchBoxCriteria,
  BySearchBoxDisplayer,
  BySearchBoxFilter,
  BySearchBoxInput,
} from './BySearchBox'
import {
  BySupportBoxDisplayer,
  BySupportCriteria,
  BySupportFilter,
  BySupportInput,
} from './BySupport'
import {
  ByTypeBoxDisplayer,
  ByTypeCriteria,
  ByTypeFilter,
  ByTypeInput,
} from './ByType'
import {
  ByUnclassableBoxDisplayer,
  ByUnclassableCriteria,
  ByUnclassableFilter,
  ByUnclassableInput,
} from './ByUnclassable'

type SearchFilterUnitAll = {
  byUnclassable: ByUnclassableCriteria
  byType: ByTypeCriteria
  byClass: ByClassCriteria
  byPirateFest: ByPirateFestStyleCriteria
  byRarity: ByRarityCriteria
  bySupport: BySupportCriteria
  byLimitBreak: ByLimitBreakCriteria
  byPotential: ByPotentialCriteria
  byRcvFinder: ByRcvFinderCriteria
  bySearchBox: BySearchBoxCriteria
  byDrop: ByDropCriteria
}

export type SearchFilterUnitsType = keyof SearchFilterUnitAll

export type SearchFilterUnits = Partial<SearchFilterUnitAll>

export const UnitFilterBuilder: {
  [key in SearchFilterUnitsType]: {
    title: string
    key: key
    builder: (criteria: SearchFilterUnitAll[key]) => UnitFilter
    input: FunctionComponent<
      SearchFilterCriteriaInputProps<SearchFilterUnitAll[key]>
    >
    boxDisplayer: FunctionComponent<
      SearchRecapItemCriteriaProps<SearchFilterUnitAll[key]>
    >
  }
} = {
  byUnclassable: {
    key: 'byUnclassable',
    title: 'Common',
    builder: ByUnclassableFilter,
    input: ByUnclassableInput,
    boxDisplayer: ByUnclassableBoxDisplayer,
  },
  byType: {
    key: 'byType',
    title: 'Type',
    builder: ByTypeFilter,
    input: ByTypeInput,
    boxDisplayer: ByTypeBoxDisplayer,
  },
  byClass: {
    key: 'byClass',
    title: 'Class',
    builder: ByClassFilter,
    input: ByClassInput,
    boxDisplayer: ByClassBoxDisplayer,
  },
  byPirateFest: {
    key: 'byPirateFest',
    title: 'Pirate Rumble Style',
    builder: ByPirateFestStyleFilter,
    input: ByPirateFestStyleInput,
    boxDisplayer: ByPirateFestBoxDisplayer,
  },
  byRarity: {
    key: 'byRarity',
    title: 'Rarity',
    builder: ByRarityFilter,
    input: ByRarityInput,
    boxDisplayer: ByRarityBoxDisplayer,
  },
  bySupport: {
    key: 'bySupport',
    title: 'Support',
    builder: BySupportFilter,
    input: BySupportInput,
    boxDisplayer: BySupportBoxDisplayer,
  },
  byLimitBreak: {
    key: 'byLimitBreak',
    title: 'Limit Break',
    builder: ByLimitBreakFilter,
    input: ByLimitBreakInput,
    boxDisplayer: ByLimitBreakBoxDisplayer,
  },
  byPotential: {
    key: 'byPotential',
    title: 'Potential ability',
    builder: ByPotentialFilter,
    input: ByPotentialInput,
    boxDisplayer: ByPotentialBoxDisplayer,
  },
  byRcvFinder: {
    key: 'byRcvFinder',
    title: 'RCV Finder',
    builder: ByRcvFinderFilter,
    input: ByRcvFinderInput,
    boxDisplayer: ByRcvFinderBoxDisplayer,
  },
  bySearchBox: {
    key: 'bySearchBox',
    title: 'Search',
    builder: BySearchBoxFilter,
    input: BySearchBoxInput,
    boxDisplayer: BySearchBoxDisplayer,
  },
  byDrop: {
    key: 'byDrop',
    title: 'Drop Island',
    builder: ByDropFilter,
    input: ByDropInput,
    boxDisplayer: ByDropBoxDisplayer,
  },
}

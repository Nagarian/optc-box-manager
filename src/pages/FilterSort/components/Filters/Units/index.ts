import { SearchFilterCriteriaInputProps, UnitFilter } from 'models/search'
import { FunctionComponent } from 'react'
import { ByClassCriteria, ByClassFilter, ByClassInput } from './ByClass'
import { ByDropCriteria, ByDropFilter, ByDropInput } from './ByDrop'
import {
  ByLimitBreakCriteria,
  ByLimitBreakFilter,
  ByLimitBreakInput,
} from './ByLimitBreak'
import {
  ByPirateFestStyleCriteria,
  ByPirateFestStyleFilter,
  ByPirateFestStyleInput,
} from './ByPirateFestStyle'
import {
  ByPotentialCriteria,
  ByPotentialFilter,
  ByPotentialInput,
} from './ByPotential'
import { ByRarityCriteria, ByRarityFilter, ByRarityInput } from './ByRarity'
import {
  ByRcvFinderCriteria,
  ByRcvFinderFilter,
  ByRcvFinderInput,
} from './ByRcvFinder'
import {
  BySearchBoxCriteria,
  BySearchBoxFilter,
  BySearchBoxInput,
} from './BySearchBox'
import { BySupportCriteria, BySupportFilter, BySupportInput } from './BySupport'
import { ByTypeCriteria, ByTypeFilter, ByTypeInput } from './ByType'
import {
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
  }
} = {
  byUnclassable: {
    key: 'byUnclassable',
    title: 'Common',
    builder: ByUnclassableFilter,
    input: ByUnclassableInput,
  },
  byType: {
    key: 'byType',
    title: 'Type',
    builder: ByTypeFilter,
    input: ByTypeInput,
  },
  byClass: {
    key: 'byClass',
    title: 'Class',
    builder: ByClassFilter,
    input: ByClassInput,
  },
  byPirateFest: {
    key: 'byPirateFest',
    title: 'Pirate Rumble Style',
    builder: ByPirateFestStyleFilter,
    input: ByPirateFestStyleInput,
  },
  byRarity: {
    key: 'byRarity',
    title: 'Rarity',
    builder: ByRarityFilter,
    input: ByRarityInput,
  },
  bySupport: {
    key: 'bySupport',
    title: 'Support',
    builder: BySupportFilter,
    input: BySupportInput,
  },
  byLimitBreak: {
    key: 'byLimitBreak',
    title: 'Limit Break',
    builder: ByLimitBreakFilter,
    input: ByLimitBreakInput,
  },
  byPotential: {
    key: 'byPotential',
    title: 'Potential ability',
    builder: ByPotentialFilter,
    input: ByPotentialInput,
  },
  byRcvFinder: {
    key: 'byRcvFinder',
    title: 'RCV Finder',
    builder: ByRcvFinderFilter,
    input: ByRcvFinderInput,
  },
  bySearchBox: {
    key: 'bySearchBox',
    title: 'Search',
    builder: BySearchBoxFilter,
    input: BySearchBoxInput,
  },
  byDrop: {
    key: 'byDrop',
    title: 'Drop Island',
    builder: ByDropFilter,
    input: ByDropInput,
  },
}

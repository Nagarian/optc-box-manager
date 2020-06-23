import { SearchFilterCriteria, SearchFilterCriteriaInputProps, UnitFilter } from 'models/search'
import { FunctionComponent } from 'react'
import { ByClassFilter, ByClassInput } from './ByClass'
import { ByDropFilter, ByDropInput } from './ByDrop'
import { ByPotentialFilter, ByPotentialInput } from './ByPotential'
import { ByRarityFilter, ByRarityInput } from './ByRarity'
import { ByRcvFinderFilter, ByRcvFinderInput } from './ByRcvFinder'
import { BySearchBoxFilter, BySearchBoxInput } from './BySearchBox'
import { BySupportFilter, BySupportInput } from './BySupport'
import { ByTypeFilter, ByTypeInput } from './ByType'
import { ByUnclassableFilter, ByUnclassableInput } from './ByUnclassable'
import { ByLimitBreakFilter, ByLimitBreakInput } from './ByLimitBreak'

export const SearchFilterUnitsKeys = [
  'byUnclassable',
  'byType',
  'byClass',
  'byRarity',
  'bySupport',
  'byLimitBreak',
  'byPotential',
  'byRcvFinder',
  'bySearchBox',
  'byDrop',
] as const

export type SearchFilterUnitsType = typeof SearchFilterUnitsKeys[number]

export type SearchFilterUnits = {
  [key in SearchFilterUnitsType]?: SearchFilterCriteria
}

type Builder = (criteria: SearchFilterCriteria) => UnitFilter
export const UnitFilterBuilder: {
  [key in SearchFilterUnitsType]: {
    title: string
    builder: Builder
    input: FunctionComponent<
      SearchFilterCriteriaInputProps<SearchFilterCriteria>
    >
  }
} = {
  byRarity: {
    title: 'Rarity',
    builder: ByRarityFilter,
    input: ByRarityInput,
  },
  bySupport: {
    title: 'Support',
    builder: BySupportFilter,
    input: BySupportInput,
  },
  byPotential: {
    title: 'Potential ability',
    builder: ByPotentialFilter,
    input: ByPotentialInput,
  },
  byClass: {
    title: 'Class',
    builder: ByClassFilter,
    input: ByClassInput,
  },
  byType: {
    title: 'Type',
    builder: ByTypeFilter,
    input: ByTypeInput,
  },
  byUnclassable: {
    title: 'Common',
    builder: ByUnclassableFilter,
    input: ByUnclassableInput,
  },
  byRcvFinder: {
    title: 'RCV Finder',
    builder: ByRcvFinderFilter,
    input: ByRcvFinderInput,
  },
  bySearchBox: {
    title: 'Search',
    builder: BySearchBoxFilter,
    input: BySearchBoxInput,
  },
  byDrop: {
    title: 'Drop Island',
    builder: ByDropFilter,
    input: ByDropInput,
  },
  byLimitBreak: {
    title: 'Limit Break',
    builder: ByLimitBreakFilter,
    input: ByLimitBreakInput,
  },
}

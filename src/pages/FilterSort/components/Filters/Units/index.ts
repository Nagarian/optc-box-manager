import { SearchFilterCriteria, SearchFilterCriteriaInputProps, UnitFilter } from 'models/search'
import { FunctionComponent } from 'react'
import { ByClassFilter, ByClassInput } from './ByClass'
import { ByPotentialFilter, ByPotentialInput } from './ByPotential'
import { ByRarityFilter, ByRarityInput } from './ByRarity'
import { ByRcvFinderFilter, ByRcvFinderInput } from './ByRcvFinder'
import { BySupportFilter, BySupportInput } from './BySupport'
import { ByTypeFilter, ByTypeInput } from './ByType'
import { ByUnclassableFilter, ByUnclassableInput } from './ByUnclassable'

export const SearchFilterUnitsKeys = [
  'byUnclassable',
  'byType',
  'byClass',
  'byRarity',
  'bySupport',
  'byPotential',
  'byRcvFinder',
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
}

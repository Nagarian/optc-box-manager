import { SearchFilterCriteriaInputProps, UnitFilter } from 'models/search'
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
import { ByPirateFestStyleFilter, ByPirateFestStyleInput } from './ByPirateFestStyle'

export const SearchFilterUnitsKeys = [
  'byUnclassable',
  'byType',
  'byClass',
  'byPirateFest',
  'byRarity',
  'bySupport',
  'byLimitBreak',
  'byPotential',
  'byRcvFinder',
  'bySearchBox',
  'byDrop',
] as const

export type SearchFilterUnitsType = typeof SearchFilterUnitsKeys[number]

type Builder<T = unknown | undefined> = (criteria: T) => UnitFilter

type UnitFilterBuilderType<T = unknown | undefined> = {
  title: string
  builder: Builder<T>
  input: FunctionComponent<SearchFilterCriteriaInputProps<T>>
}

export const UnitFilterBuilder: {
  [key in SearchFilterUnitsType]: UnitFilterBuilderType<any>
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
  byPirateFest: {
    title: 'Pirate Rumble Style',
    builder: ByPirateFestStyleFilter,
    input: ByPirateFestStyleInput,
  },
}

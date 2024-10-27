import { SearchOptionInputProps } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import { FunctionComponent, ReactNode } from 'react'
import { byFamily, byId, byLBLvlMax } from './Units/ByCommon'
import { byFestStyle } from './Units/ByPirateFest'
import {
  byRarity,
  byRarityLabel,
  RaritySortOption,
  RaritySortOptionInput,
} from './Units/ByRarity'
import { byType } from './Units/ByType'
import {
  byCoopSortLabel,
  byCoopWithOption,
  CoopSortInput,
  CoopSortOption,
} from './UserUnits/ByCoop'
import {
  bySpecificCottonCandy,
  bySpecificCottonCandyLabel,
  SpecificCottonCandySortInput,
  SpecificCottonCandySortOption,
} from './UserUnits/ByCottonCandy'
import { byInkLvl } from './UserUnits/ByInk'
import {
  byLevelSortLabel,
  byLevelWithOption,
  LevelSortInput,
  LevelSortOption,
} from './UserUnits/ByLevel'
import {
  byLimitBreakLevel,
  byLimitBreakLevelGameLike,
} from './UserUnits/ByLimitBreak'
import {
  byPirateFestAbility,
  byPirateFestGp,
  byPirateFestSpecial,
} from './UserUnits/ByPirateFest'
import {
  bySpecificPotentialLabel,
  bySpecificPotentialLvl,
  SpecificPotentialSortInput,
  SpecificPotentialSortOption,
} from './UserUnits/ByPotential'
import { bySupportLvl } from './UserUnits/BySupport'

type SortUnitOptions = {
  byType: never
  byRarity: RaritySortOption
  byFamily: never
  byId: never
  byLBLvlMax: never
  byFestStyle: never
}

type SortUserUnitOptions = {
  byLevel: LevelSortOption
  byCottonCandy: SpecificCottonCandySortOption
  bySupportLvl: never
  byLBLvlGameLike: never
  byLimitBreakLvl: never
  byPotentialProgression: SpecificPotentialSortOption
  byPirateFestSpecial: never
  byPirateFestAbility: never
  byPirateFestGp: never
  byInkLvl: never
  byAddedToBox: never
  byCoop: CoopSortOption
}

export type SearchSortUnitType = keyof SortUnitOptions
export type SearchSortUserUnitType = keyof SortUserUnitOptions
export type SearchSortType = SearchSortUnitType | SearchSortUserUnitType

export type SortOrder = 'asc' | 'desc'

export type SortCriteria<T> = {
  [Prop in keyof T]: {
    by: Prop
    order: SortOrder
    options?: T[Prop]
  }
}

export type SearchSortUnitCriteria =
  SortCriteria<SortUnitOptions>[keyof SortCriteria<SortUnitOptions>]
export type SearchSortUserUnitCriteria =
  SortCriteria<SortUserUnitOptions>[keyof SortCriteria<SortUserUnitOptions>]
export type SearchSortCriteria =
  | SearchSortUnitCriteria
  | SearchSortUserUnitCriteria

export function isUnitSort(
  sort: SearchSortCriteria,
): sort is SearchSortUnitCriteria {
  return Object.hasOwn(SearchSortUnitBuilder, sort.by)
}

export type Sort<T> = (u1: T, u2: T) => number
export type UnitSort = Sort<ExtendedUnit>
export type UserUnitSort = Sort<UserUnit>

export type SearchSortWithOptionFunction<T, TSort> = (options?: T) => TSort

export type SearchSortBuilderProps<TKey, TOption, TSort> = {
  key: TKey
  label: string
  fn: (options?: TOption) => TSort
  input?: FunctionComponent<SearchOptionInputProps<TOption>>
  optionedLabel?: (option?: TOption) => ReactNode
}

export const SearchSortUnitBuilder: {
  [key in keyof SortUnitOptions]: SearchSortBuilderProps<
    key,
    SortUnitOptions[key],
    UnitSort
  >
} = {
  byType: {
    key: 'byType',
    label: 'Type',
    fn: () => byType,
  },
  byRarity: {
    key: 'byRarity',
    label: 'Rarity',
    fn: byRarity,
    input: RaritySortOptionInput,
    optionedLabel: byRarityLabel,
  },
  byFamily: {
    key: 'byFamily',
    label: 'Character',
    fn: () => byFamily,
  },
  byId: {
    key: 'byId',
    label: 'ID',
    fn: () => byId,
  },
  byLBLvlMax: {
    key: 'byLBLvlMax',
    label: 'LB Lvl Max',
    fn: () => byLBLvlMax,
  },
  byFestStyle: {
    key: 'byFestStyle',
    label: 'PR Style',
    fn: () => byFestStyle,
  },
}

export const SearchSortUserUnitBuilder: {
  [key in keyof SortUserUnitOptions]: SearchSortBuilderProps<
    key,
    SortUserUnitOptions[key],
    UserUnitSort
  >
} = {
  byLevel: {
    key: 'byLevel',
    label: 'Level',
    fn: byLevelWithOption,
    input: LevelSortInput,
    optionedLabel: byLevelSortLabel,
  },
  byCottonCandy: {
    key: 'byCottonCandy',
    label: 'Cotton Candy',
    fn: bySpecificCottonCandy,
    input: SpecificCottonCandySortInput,
    optionedLabel: bySpecificCottonCandyLabel,
  },
  bySupportLvl: {
    key: 'bySupportLvl',
    label: 'Support',
    fn: () => bySupportLvl,
  },
  byLBLvlGameLike: {
    key: 'byLBLvlGameLike',
    label: 'LB Lvl (Game-like)',
    fn: () => byLimitBreakLevelGameLike,
  },
  byLimitBreakLvl: {
    key: 'byLimitBreakLvl',
    label: 'LB Lvl',
    fn: () => byLimitBreakLevel,
  },
  byPotentialProgression: {
    key: 'byPotentialProgression',
    label: 'Potentials Lvl',
    fn: bySpecificPotentialLvl,
    input: SpecificPotentialSortInput,
    optionedLabel: bySpecificPotentialLabel,
  },
  byPirateFestSpecial: {
    key: 'byPirateFestSpecial',
    label: 'PR Special Lvl',
    fn: () => byPirateFestSpecial,
  },
  byPirateFestAbility: {
    key: 'byPirateFestAbility',
    label: 'PR Ability Lvl',
    fn: () => byPirateFestAbility,
  },
  byPirateFestGp: {
    key: 'byPirateFestGp',
    label: 'PR GP Lvl',
    fn: () => byPirateFestGp,
  },
  byInkLvl: {
    key: 'byInkLvl',
    label: 'Ink Lvl',
    fn: () => byInkLvl,
  },
  byAddedToBox: {
    key: 'byAddedToBox',
    label: 'Added to box',
    fn: () => () => 1,
  },
  byCoop: {
    key: 'byCoop',
    label: 'Coop',
    fn: byCoopWithOption,
    input: CoopSortInput,
    optionedLabel: byCoopSortLabel,
  },
}

export const SearchSortBuilder = {
  ...SearchSortUnitBuilder,
  ...SearchSortUserUnitBuilder,
}

export function sortUnitCriteria({
  by,
  order,
  options,
}: SearchSortUnitCriteria): UnitSort {
  const builder = SearchSortUnitBuilder[by]
  const opt = options as unknown as undefined
  const fn = builder.fn(opt)
  return order === 'desc' ? DescendingSort(fn) : fn
}

export function sortUserUnitCriteria(sort: SearchSortCriteria): UserUnitSort {
  const options = sort.options as unknown as undefined
  const fn = isUnitSort(sort)
    ? UnitSort2UserUnitSort(SearchSortUnitBuilder[sort.by].fn(options))
    : SearchSortUserUnitBuilder[sort.by].fn(options)
  return sort.order === 'desc' ? DescendingSort(fn) : fn
}

export function DescendingSort<T>(fn: Sort<T>) {
  return (u1: T, u2: T) => 0 - fn(u1, u2)
}

export function UnitSort2UserUnitSort(fn: UnitSort): UserUnitSort {
  return (u1, u2) => fn(u1.unit, u2.unit)
}

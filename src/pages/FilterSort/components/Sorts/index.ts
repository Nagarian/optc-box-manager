import {
  SearchSortInputProps,
  SearchSortWithOptionFunction,
  Sort,
  UnitSort,
  UserUnitSort,
} from 'models/search'
import { FunctionComponent, ReactNode } from 'react'
import { byFamily, byId, byLBLvlMax } from './Units/ByCommon'
import byFestStyle from './Units/ByPirateFest'
import {
  byRarity,
  byRarityLabel,
  byRaritySimple,
  RaritySortOptionInput,
} from './Units/ByRarity'
import byType from './Units/ByType'
import {
  byCoop,
  byCoopSortLabel,
  byCoopWithOption,
  CoopSortInput,
} from './UserUnits/ByCoop'
import {
  byCottonCandy,
  bySpecificCottonCandy,
  bySpecificCottonCandyLabel,
  SpecificCottonCandySortInput,
} from './UserUnits/ByCottonCandy'
import { byInkLvl } from './UserUnits/ByInk'
import {
  byLevel,
  byLevelSortLabel,
  byLevelWithOption,
  LevelSortInput,
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
  byPotentialLvl,
  bySpecificPotentialLabel,
  bySpecificPotentialLvl,
  SpecificPotentialSortInput,
} from './UserUnits/ByPotential'
import { bySupportLvl } from './UserUnits/BySupport'

export const UnitSortTypeKeys = [
  'byType',
  'byRarity',
  'byFamily',
  'byId',
  'byLBLvlMax',
  'byFestStyle',
] as const
export const UserUnitSortTypeKeys = [
  'byLevel',
  'byCottonCandy',
  'bySupportLvl',
  'byLBLvlGameLike',
  'byLimitBreakLvl',
  'byPotentialProgression',
  'byPirateFestSpecial',
  'byPirateFestAbility',
  'byPirateFestGp',
  'byInkLvl',
  'byAddedToBox',
  'byCoop',
] as const
export type SearchSortType =
  | (typeof UnitSortTypeKeys)[number]
  | (typeof UserUnitSortTypeKeys)[number]

export type SearchSortBuilderProps<T = unknown> = {
  label: string
  type: 'unit' | 'userUnit'
  fn: UnitSort | UserUnitSort
  optionInput?: FunctionComponent<SearchSortInputProps<T>>
  optionedFn?: SearchSortWithOptionFunction<T>
  optionedLabel?: (option: T) => ReactNode
}

export const SearchSortBuilder: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in SearchSortType]: SearchSortBuilderProps<any>
} = {
  byType: {
    label: 'Type',
    type: 'unit',
    fn: byType,
  },
  byRarity: {
    label: 'Rarity',
    type: 'unit',
    fn: byRaritySimple,
    optionedFn: byRarity,
    optionedLabel: byRarityLabel,
    optionInput: RaritySortOptionInput,
  },
  byFamily: {
    label: 'Character',
    type: 'unit',
    fn: byFamily,
  },
  byId: {
    label: 'ID',
    type: 'unit',
    fn: byId,
  },
  byFestStyle: {
    label: 'PR Style',
    type: 'unit',
    fn: byFestStyle,
  },
  byCottonCandy: {
    label: 'Cotton Candy',
    type: 'userUnit',
    fn: byCottonCandy,
    optionedFn: bySpecificCottonCandy,
    optionInput: SpecificCottonCandySortInput,
    optionedLabel: bySpecificCottonCandyLabel,
  },
  bySupportLvl: {
    label: 'Support',
    type: 'userUnit',
    fn: bySupportLvl,
  },
  byLBLvlMax: {
    label: 'LB Lvl Max',
    type: 'unit',
    fn: byLBLvlMax,
  },
  byLimitBreakLvl: {
    label: 'LB Lvl',
    type: 'userUnit',
    fn: byLimitBreakLevel,
  },
  byLBLvlGameLike: {
    label: 'LB Lvl (Game-like)',
    type: 'userUnit',
    fn: byLimitBreakLevelGameLike,
  },
  byPotentialProgression: {
    label: 'Potentials Lvl',
    type: 'userUnit',
    fn: byPotentialLvl,
    optionedFn: bySpecificPotentialLvl,
    optionInput: SpecificPotentialSortInput,
    optionedLabel: bySpecificPotentialLabel,
  },
  byPirateFestSpecial: {
    label: 'PR Special Lvl',
    type: 'userUnit',
    fn: byPirateFestSpecial,
  },
  byPirateFestAbility: {
    label: 'PR Ability Lvl',
    type: 'userUnit',
    fn: byPirateFestAbility,
  },
  byPirateFestGp: {
    label: 'PR GP Lvl',
    type: 'userUnit',
    fn: byPirateFestGp,
  },
  byInkLvl: {
    label: 'Ink Lvl',
    type: 'userUnit',
    fn: byInkLvl,
  },
  byAddedToBox: {
    label: 'Added to box',
    type: 'userUnit',
    fn: () => 1,
  },
  byLevel: {
    label: 'Level',
    type: 'userUnit',
    fn: byLevel,
    optionedFn: byLevelWithOption,
    optionInput: LevelSortInput,
    optionedLabel: byLevelSortLabel,
  },
  byCoop: {
    label: 'Coop',
    type: 'userUnit',
    fn: byCoop,
    optionedFn: byCoopWithOption,
    optionInput: CoopSortInput,
    optionedLabel: byCoopSortLabel,
  },
}

export function DescendingSort<T>(fn: Sort<T>) {
  return (u1: T, u2: T) => 0 - fn(u1, u2)
}

export function UnitSort2UserUnitSort(fn: UnitSort): UserUnitSort {
  return (u1, u2) => fn(u1.unit, u2.unit)
}

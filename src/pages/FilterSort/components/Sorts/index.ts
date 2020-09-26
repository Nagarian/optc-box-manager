import {
  Sort,
  UnitSort,
  UserUnitSort,
  SearchSortInputProps,
  SearchSortWithOptionFunction,
} from 'models/search'
import { byFamily, byId, byLBLvlMax } from './Units/ByCommon'
import byRarity from './Units/ByRarity'
import byType from './Units/ByType'
import {
  byCottonCandy,
  bySpecificCottonCandy,
  SpecificCottonCandySortInput,
  bySpecificCottonCandyLabel,
} from './UserUnits/ByCottonCandy'
import { bySupportLvl } from './UserUnits/BySupport'
import {
  byLimitBreakLevel,
  byLimitBreakLevelGameLike,
} from './UserUnits/ByLimitBreak'
import {
  byPotentialLvl,
  bySpecificPotentialLvl,
  SpecificPotentialSortInput,
  bySpecificPotentialLabel,
} from './UserUnits/ByPotential'
import { FunctionComponent, ReactNode } from 'react'
import byFestStyle from './Units/ByPirateFest'
import { byPirateFestAbility, byPirateFestSpecial } from './UserUnits/ByPirateFest'

export const UnitSortTypeKeys = [
  'byType',
  'byRarity',
  'byFamily',
  'byId',
  'byLBLvlMax',
  'byFestStyle',
] as const
export const UserUnitSortTypeKeys = [
  'byCottonCandy',
  'bySupportLvl',
  'byLBLvlGameLike',
  'byLimitBreakLvl',
  'byPotentialProgression',
  'byPirateFestSpecial',
  'byPirateFestAbility',
  'byAddedToBox',
] as const
export type SearchSortType =
  | typeof UnitSortTypeKeys[number]
  | typeof UserUnitSortTypeKeys[number]

export type SearchSortBuilderProps<T = any> = {
  label: string
  type: 'unit' | 'userUnit'
  fn: UnitSort | UserUnitSort
  optionInput?: FunctionComponent<SearchSortInputProps<T>>
  optionedFn?: SearchSortWithOptionFunction<T>
  optionedLabel?: <T>(option: T) => ReactNode
}

export const SearchSortBuilder: {
  [key in SearchSortType]: SearchSortBuilderProps
} = {
  byType: {
    label: 'Type',
    type: 'unit',
    fn: byType,
  },
  byRarity: {
    label: 'Rarity',
    type: 'unit',
    fn: byRarity,
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
    label: 'PF Style',
    type: 'unit',
    fn: byFestStyle,
  },
  byCottonCandy: {
    label: 'Cotton Candy',
    type: 'userUnit',
    fn: byCottonCandy,
    optionedFn: bySpecificCottonCandy,
    optionInput: SpecificCottonCandySortInput,
    optionedLabel: bySpecificCottonCandyLabel as any,
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
    optionedLabel: bySpecificPotentialLabel as any,
  },
  byPirateFestSpecial: {
    label: 'PF Special Lvl',
    type: 'userUnit',
    fn: byPirateFestSpecial,
  },
  byPirateFestAbility: {
    label: 'PF Ability Lvl',
    type: 'userUnit',
    fn: byPirateFestAbility,
  },
  byAddedToBox: {
    label: 'Added to box',
    type: 'userUnit',
    fn: () => 1,
  },
}

export function DescendingSort<T> (fn: Sort<T>) {
  return (u1: T, u2: T) => 0 - fn(u1, u2)
}

export function UnitSort2UserUnitSort (fn: UnitSort): UserUnitSort {
  return (u1, u2) => fn(u1.unit, u2.unit)
}

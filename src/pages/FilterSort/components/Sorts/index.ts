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
} from './UserUnits/ByPotential'
import { FunctionComponent } from 'react'

export const UnitSortTypeKeys = [
  'byType',
  'byRarity',
  'byFamily',
  'byId',
  'byLBLvlMax',
] as const
export const UserUnitSortTypeKeys = [
  'byCottonCandy',
  'bySupportLvl',
  'byLBLvlGameLike',
  'byLimitBreakLvl',
  'byPotentialProgression',
] as const
export type SearchSortType =
  | typeof UnitSortTypeKeys[number]
  | typeof UserUnitSortTypeKeys[number]

export const SearchSortBuilder: {
  [key in SearchSortType]: {
    label: string
    type: 'unit' | 'userUnit'
    fn: UnitSort | UserUnitSort
    optionInput?: FunctionComponent<SearchSortInputProps>
    optionedFn?: SearchSortWithOptionFunction
  }
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
  byCottonCandy: {
    label: 'Cotton Candy',
    type: 'userUnit',
    fn: byCottonCandy,
    optionedFn: bySpecificCottonCandy as any,
    optionInput: SpecificCottonCandySortInput as any,
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
    optionedFn: bySpecificPotentialLvl as any,
    optionInput: SpecificPotentialSortInput as any,
  },
}

export function DescendingSort<T> (fn: Sort<T>) {
  return (u1: T, u2: T) => 0 - fn(u1, u2)
}

export function UnitSort2UserUnitSort (fn: UnitSort): UserUnitSort {
  return (u1, u2) => fn(u1.unit, u2.unit)
}

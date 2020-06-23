import { Sort, UnitSort, UserUnitSort } from 'models/search'
import { byFamily, byId, byLBLvlMax } from './Units/ByCommon'
import byRarity from './Units/ByRarity'
import byType from './Units/ByType'
import { byCCAtk, byCCHp, byCCRcv, byCottonCandy } from './UserUnits/ByCottonCandy'
import { bySupportLvl } from './UserUnits/BySupport'
import { byLimitBreakLevel, byLimitBreakLevelGameLike } from './UserUnits/ByLimitBreak'

export const UnitSortTypeKeys = [
  'byType',
  'byRarity',
  'byFamily',
  'byId',
  'byLBLvlMax',
] as const
export const UserUnitSortTypeKeys = [
  'byCottonCandy',
  'byCCAtk',
  'byCCHp',
  'byCCRcv',
  'bySupportLvl',
  'byLBLvlGameLike',
  'byLimitBreakLvl',
] as const
export type SearchSortType =
  | typeof UnitSortTypeKeys[number]
  | typeof UserUnitSortTypeKeys[number]

export const SearchSortBuilder: {
  [key in SearchSortType]: {
    label: string
    type: 'unit' | 'userUnit'
    fn: UnitSort | UserUnitSort
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
  },
  byCCAtk: {
    label: 'CC - ATK',
    type: 'userUnit',
    fn: byCCAtk,
  },
  byCCHp: {
    label: 'CC - HP',
    type: 'userUnit',
    fn: byCCHp,
  },
  byCCRcv: {
    label: 'CC - RCV',
    type: 'userUnit',
    fn: byCCRcv,
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
}

export function DescendingSort<T> (fn: Sort<T>) {
  return (u1: T, u2: T) => 0 - fn(u1, u2)
}

export function UnitSort2UserUnitSort (fn: UnitSort): UserUnitSort {
  return (u1, u2) => fn(u1.unit, u2.unit)
}

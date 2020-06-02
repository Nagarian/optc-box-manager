import { Sort, UnitSort, UserUnitSort } from 'models/search'
import { byFamily, byId } from './ByCommon'
import { byCCAtk, byCCHp, byCCRcv, byCottonCandy } from './ByCottonCandy'
import byRarity from './ByRarity'
import { bySupportLvl } from './BySupport'
import byType from './ByType'

export const UnitSortTypeKeys = [
  'byType',
  'byRarity',
  'byFamily',
  'byId',
] as const
export const UserUnitSortTypeKeys = [
  'byCottonCandy',
  'byCCAtk',
  'byCCHp',
  'byCCRcv',
  'bySupportLvl',
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
    label: 'Perso',
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
}

export function DescendingSort<T> (fn: Sort<T>) {
  return (u1: T, u2: T) => 0 - fn(u1, u2)
}

export function UnitSort2UserUnitSort (fn: UnitSort): UserUnitSort {
  return (u1, u2) => fn(u1.unit, u2.unit)
}

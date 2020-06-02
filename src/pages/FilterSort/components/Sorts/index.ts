import { Sort, UnitSort, UserUnitSort } from 'models/search'
import { byFamily, byId } from './ByCommon'
import byRarity from './ByRarity'
import byType from './ByType'

export const SearchSortTypeKeys = [
  'byType',
  'byRarity',
  'byFamily',
  'byId',
] as const
export type SearchSortType = typeof SearchSortTypeKeys[number]

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
}

export function DescendingSort<T> (fn: Sort<T>) {
  return (u1: T, u2: T) => 0 - fn(u1, u2)
}

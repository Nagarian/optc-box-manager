import { Sort, UnitSort, UserUnitSort } from 'models/search'
import byRarity from './ByRarity'

export const SearchSortTypeKeys = ['byRarity'] as const
export type SearchSortType = typeof SearchSortTypeKeys[number]

export const SearchSortBuilder: {
  [key in SearchSortType]: {
    label: string
    type: 'unit' | 'userUnit'
    fn: UnitSort | UserUnitSort
  }
} = {
  byRarity: {
    label: 'Rarity',
    type: 'unit',
    fn: byRarity,
  },

}

export function DescendingSort<T> (fn: Sort<T>) {
  return (u1: T, u2: T) => 0 - fn(u1, u2)
}

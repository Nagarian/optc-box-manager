import { Syncer } from '.'
import { ByUserInkCriteria } from '../Filters/UserUnits/ByUserInk'
import { SearchSortCriteria } from 'models/search'

export const syncInk: Syncer = (filters, sorts, displayer) => {
  const userS = filters.byUserInk as ByUserInkCriteria
  if (!userS || userS.state === 'locked') {
    return [undefined, undefined]
  }

  const syncSort = syncInkSort(sorts)

  return [syncSort, undefined]
}

export function syncInkSort (
  sorts: SearchSortCriteria[],
): SearchSortCriteria[] | undefined {
  if (sorts.length) {
    return undefined
  }
  return [
    {
      by: 'byInkLvl',
      order: 'desc',
    },
  ]
}

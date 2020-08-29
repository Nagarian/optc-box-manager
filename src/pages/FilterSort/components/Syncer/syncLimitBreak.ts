import { Syncer } from '.'
import { ByUserLimitBreakCriteria } from '../Filters/UserUnits/ByUserLimitBreak'
import { SearchSortCriteria } from 'models/search'

export const syncLimitBreak: Syncer = (filters, sorts, displayer) => {
  const userLB = filters.byUserLimitBreak as ByUserLimitBreakCriteria
  if (!userLB) {
    return [undefined, undefined]
  }

  const syncSort = syncLimitBreakSort(sorts)

  return [syncSort, undefined]
}

export function syncLimitBreakSort (
  sorts: SearchSortCriteria[],
): SearchSortCriteria[] | undefined {
  if (sorts.length) {
    return undefined
  }
  return [
    {
      by: 'byLBLvlGameLike',
      order: 'desc',
    },
  ]
}

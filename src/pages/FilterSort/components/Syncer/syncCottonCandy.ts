import { Syncer } from '.'
import { ByUserCottonCandyCriteria } from '../Filters/UserUnits/ByUserCottonCandy'
import { SearchDisplayerCriteria } from '../Displayers'
import { SearchSortCriteria } from 'models/search'

export const syncCottonCandy: Syncer = (filters, sorts, displayer) => {
  const userS = filters.byUserCottonCandy as ByUserCottonCandyCriteria
  if (!userS) {
    return [undefined, undefined]
  }

  const syncDisplayer = syncCottonCandyDisplayer(displayer)

  const syncSort = syncCottonCandySort(sorts)

  return [syncSort, syncDisplayer]
}

export function syncCottonCandyDisplayer (
  displayer: SearchDisplayerCriteria | undefined,
): SearchDisplayerCriteria | undefined {
  if (displayer) {
    return undefined
  }

  return {
    type: 'cottonCandy',
  }
}

export function syncCottonCandySort (
  sorts: SearchSortCriteria[],
): SearchSortCriteria[] | undefined {
  if (sorts.length) {
    return undefined
  }
  return [
    {
      by: 'byCottonCandy',
      order: 'desc',
    },
  ]
}

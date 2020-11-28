import { Syncer } from '.'
import { ByUserCottonCandyCriteria } from '../Filters/UserUnits/ByUserCottonCandy'
import { SearchDisplayerCriteria } from '../Displayers'
import { SearchSortCriteria } from 'models/search'
import { CottonCandyType } from 'models/userBox'

export const syncCottonCandy: Syncer = (filters, sorts, displayer) => {
  const userS = filters.byUserCottonCandy as ByUserCottonCandyCriteria
  if (!userS) {
    return [undefined, undefined]
  }

  const syncDisplayer = syncCottonCandyDisplayer(displayer)

  const ccTypes = Object.entries(userS.by || {})
    .filter(([key, value]) => value === 'unmaxed')
    .map(([k]) => k) as CottonCandyType[]

  const syncSort = syncCottonCandySort(
    sorts,
    ccTypes.length === 1 ? ccTypes[0] : undefined,
  )

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
  ccType?: CottonCandyType,
): SearchSortCriteria[] | undefined {
  if (!sorts.length) {
    return [
      {
        by: 'byCottonCandy',
        order: 'desc',
        options: ccType && {
          cc: ccType,
        },
      },
    ]
  }

  if (sorts.find(s => s.by === 'byCottonCandy')) {
    return sorts.map(s =>
      s.by === 'byCottonCandy' ? { ...s, options: ccType && { cc: ccType } } : s,
    )
  }

  return undefined
}

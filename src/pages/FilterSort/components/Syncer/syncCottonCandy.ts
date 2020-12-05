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

  const ccSorters = sorts.filter(s => s.by === 'byCottonCandy')

  if (!ccSorters.length) {
    return undefined
  }

  if (ccSorters.length === 1) {
    return sorts.map(s =>
      s === ccSorters[0] ? { ...s, options: ccType && { cc: ccType } } : s,
    )
  }

  const optioned = ccSorters.filter(s => s.options)

  if (optioned.length < ccSorters.length && !ccType) {
    return undefined
  }

  if (optioned.find(s => (s.options as any)?.cc === ccType)) {
    return undefined
  }

  return sorts.map(s =>
    s === (optioned[0] ?? ccSorters[0])
      ? { ...s, options: ccType && { cc: ccType } }
      : s,
  )
}

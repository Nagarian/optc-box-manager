import { SearchDisplayerCriteria } from '../Displayers'
import { ByUserSupportCriteria } from '../Filters/UserUnits/ByUserSupport'
import { SearchSortCriteria } from '../Sorts'
import { Syncer } from '.'

export const syncSupport: Syncer = (filters, sorts, displayer) => {
  const userS = filters.byUserSupport as ByUserSupportCriteria
  if (!userS || userS.state === 'locked' || userS.state === 'maxed') {
    return [undefined, undefined]
  }

  const syncDisplayer = syncSupportDisplayer(displayer)

  const syncSort = syncSupportSort(sorts)

  return [syncSort, syncDisplayer]
}

export function syncSupportDisplayer(
  displayer: SearchDisplayerCriteria | undefined,
): SearchDisplayerCriteria | undefined {
  if (displayer) {
    return undefined
  }

  return {
    type: 'support',
  }
}

export function syncSupportSort(
  sorts: SearchSortCriteria[],
): SearchSortCriteria[] | undefined {
  if (sorts.length) {
    return undefined
  }
  return [
    {
      by: 'bySupportLvl',
      order: 'desc',
    },
  ]
}

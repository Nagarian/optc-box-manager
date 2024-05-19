import { SearchSortCriteria } from 'models/search'
import { SearchDisplayerCriteria } from '../Displayers'
import {
  CoopDisplayerOption,
  CoopDisplayerOptionType,
} from '../Displayers/CoopDisplayer'
import { ByUserCoopCriteria } from '../Filters/UserUnits/ByUserCoop'
import { CoopSortOption } from '../Sorts/UserUnits/ByCoop'
import { Syncer } from '.'

export const syncCoop: Syncer = (filters, sorts, displayer) => {
  const criteria = filters.byUserCoop as ByUserCoopCriteria
  if (!criteria) {
    return [undefined, undefined]
  }

  const { captainState, specialState } = criteria
  const optionType: CoopDisplayerOptionType =
    captainState && specialState
      ? 'both'
      : captainState
        ? 'captain'
        : specialState
          ? 'special'
          : 'luck'

  const syncDisplayer = syncCoopDisplayer(displayer, optionType)

  const syncSort = syncCoopSort(sorts, optionType)

  return [syncSort, syncDisplayer]
}

export function syncCoopDisplayer(
  displayer: SearchDisplayerCriteria | undefined,
  type: CoopDisplayerOptionType,
): SearchDisplayerCriteria<CoopDisplayerOption> | undefined {
  if (displayer && displayer.type !== 'coop') {
    return undefined
  }

  return {
    type: 'coop',
    options: {
      type,
    },
  }
}

export function syncCoopSort(
  sorts: SearchSortCriteria[],
  type: CoopDisplayerOptionType,
): SearchSortCriteria[] | undefined {
  if (sorts.length) {
    return undefined
  }

  if (type === 'both') {
    return [
      {
        by: 'byCoop',
        order: 'desc',
        options: {
          type: 'captain lvl',
        } as CoopSortOption,
      },
      {
        by: 'byCoop',
        order: 'desc',
        options: {
          type: 'special lvl',
        } as CoopSortOption,
      },
    ]
  }

  if (type === 'captain') {
    return [
      {
        by: 'byCoop',
        order: 'desc',
        options: {
          type: 'captain lvl',
        } as CoopSortOption,
      },
    ]
  }

  if (type === 'special') {
    return [
      {
        by: 'byCoop',
        order: 'desc',
        options: {
          type: 'special lvl',
        } as CoopSortOption,
      },
    ]
  }

  if (type === 'luck') {
    return [
      {
        by: 'byCoop',
        order: 'desc',
        options: {
          type: 'luck',
        } as CoopSortOption,
      },
    ]
  }

  return undefined
}

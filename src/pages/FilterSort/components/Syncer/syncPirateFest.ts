import { SearchSortCriteria } from 'models/search'
import { SearchDisplayerCriteria } from '../Displayers'
import {
  PirateFestDisplayerOption,
  PirateFestDisplayerOptionType,
} from '../Displayers/PirateFestDisplayer'
import { ByUserPirateFestCriteria } from '../Filters/UserUnits/ByUserPirateFest'
import { Syncer } from '.'

export const syncPirateFest: Syncer = (filters, sorts, displayer) => {
  const userS = filters.byUserPirateFest as ByUserPirateFestCriteria
  if (!userS) {
    return [undefined, undefined]
  }

  const optionType: PirateFestDisplayerOptionType =
    userS.abilityLvlState && userS.specialLvlState
      ? 'all'
      : userS.abilityLvlState
        ? 'ability'
        : userS.specialLvlState
          ? 'special'
          : 'gp'

  const syncDisplayer = syncPirateFestDisplayer(displayer, optionType)

  const syncSort = syncPirateFestSort(sorts, optionType)

  return [syncSort, syncDisplayer]
}

export function syncPirateFestDisplayer (
  displayer: SearchDisplayerCriteria | undefined,
  type: PirateFestDisplayerOptionType,
): SearchDisplayerCriteria<PirateFestDisplayerOption> | undefined {
  if (displayer) {
    return undefined
  }

  return {
    type: 'pirateFest',
    options: {
      type,
    },
  }
}

export function syncPirateFestSort (
  sorts: SearchSortCriteria[],
  type: PirateFestDisplayerOptionType,
): SearchSortCriteria[] | undefined {
  if (sorts.length) {
    return undefined
  }

  if (type === 'ability') {
    return [
      {
        by: 'byPirateFestAbility',
        order: 'desc',
      },
    ]
  }

  if (type === 'special') {
    return [
      {
        by: 'byPirateFestSpecial',
        order: 'desc',
      },
    ]
  }

  if (type === 'gp') {
    return [
      {
        by: 'byPirateFestGp',
        order: 'desc',
      },
    ]
  }

  return undefined
}

import { SearchSortCriteria } from 'models/search'
import { SearchDisplayerCriteria } from '../Displayers'
import { LevelDisplayerOption } from '../Displayers/LevelDisplayer'
import { ByUserLevelCriteria } from '../Filters/UserUnits/ByUserLevel'
import { LevelSortOption } from '../Sorts/UserUnits/ByLevel'
import { Syncer } from '.'

export const syncLevel: Syncer = (filters, sorts, displayer) => {
  const userL = filters.byUserLevel as ByUserLevelCriteria
  if (!userL) {
    return [undefined, undefined]
  }

  const syncDisplayer = syncLevelDisplayer(displayer, userL)

  const syncSort = syncLevelSort(sorts, userL)

  return [syncSort, syncDisplayer]
}

export function syncLevelDisplayer (
  displayer: SearchDisplayerCriteria | undefined,
  levelCriteria: ByUserLevelCriteria,
): SearchDisplayerCriteria<LevelDisplayerOption> | undefined {
  if (displayer && displayer.type !== 'level') {
    return undefined
  }

  return {
    type: 'level',
    options: {
      type: levelCriteria.lbState ? 'level LB' : 'progression',
    },
  }
}

export function syncLevelSort (
  sorts: SearchSortCriteria[],
  levelCriteria: ByUserLevelCriteria,
): SearchSortCriteria[] | undefined {
  const sort: SearchSortCriteria = {
    by: 'byLevel',
    order: 'desc',
    options: {
      type: levelCriteria.lbState ? 'lvl LB' : 'lvl',
    } as LevelSortOption,
  }

  if (!sorts.length) {
    return [sort]
  }

  const levelSorters = sorts.filter(s => s.by === 'byLevel')

  if (!levelSorters.length) {
    return undefined
  }

  return sorts.map(s => (s === levelSorters[0] ? sort : s))
}

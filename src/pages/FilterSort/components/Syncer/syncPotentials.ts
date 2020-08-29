import { SearchSortCriteria } from 'models/search'
import { PotentialKey } from 'models/units'
import { SearchDisplayerCriteria } from '../Displayers'
import { SpecificPotentialDisplayerOption } from '../Displayers/PotentialsDisplayer'
import { ByUserPotentialCriteria } from '../Filters/UserUnits/ByUserPotential'
import { Syncer } from '.'

export const syncPotentials: Syncer = (filters, sorts, displayer) => {
  const userP = filters.byUserPotential as ByUserPotentialCriteria
  if (!userP) {
    return [undefined, undefined]
  }

  const selectedPotential = Object.keys(userP)[0] as PotentialKey

  if (!selectedPotential) {
    return [undefined, undefined]
  }

  const syncDisplayer = syncPotentialDisplayer(displayer, selectedPotential)

  const syncSort = syncPotentialSort(sorts, selectedPotential)

  return [syncSort, syncDisplayer]
}

export function syncPotentialDisplayer (
  displayer: SearchDisplayerCriteria | undefined,
  potential: PotentialKey,
): SearchDisplayerCriteria<SpecificPotentialDisplayerOption> | undefined {
  if (displayer && displayer.type !== 'potential') {
    return undefined
  }

  return {
    type: 'potential',
    options: {
      type: potential,
    },
  }
}

export function syncPotentialSort (
  sorts: SearchSortCriteria[],
  potential: PotentialKey,
): SearchSortCriteria[] | undefined {
  if (!sorts.length) {
    return [
      {
        by: 'byPotentialProgression',
        order: 'desc',
        options: {
          type: potential,
        },
      },
    ]
  }

  if (sorts.find(s => s.by === 'byPotentialProgression')) {
    return sorts.map(s =>
      s.by === 'byPotentialProgression'
        ? { ...s, options: { type: potential } }
        : s,
    )
  }

  return undefined
}

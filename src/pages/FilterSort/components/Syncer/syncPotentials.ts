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

export function syncPotentialDisplayer(
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

export function syncPotentialSort(
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

  const potentialSorters = sorts.filter(s => s.by === 'byPotentialProgression')

  if (!potentialSorters.length) {
    return undefined
  }

  if (potentialSorters.length === 1) {
    return sorts.map(s =>
      s === potentialSorters[0]
        ? { ...s, options: potential && { type: potential } }
        : s,
    )
  }

  const optioned = potentialSorters.filter(s => s.options)

  if (optioned.length < potentialSorters.length && !potentialSorters) {
    return undefined
  }

  if (
    optioned.find(
      s => (s.options as SpecificPotentialDisplayerOption)?.type === potential,
    )
  ) {
    return undefined
  }

  return sorts.map(s =>
    s === (optioned[0] ?? potentialSorters[0])
      ? { ...s, options: potential && { type: potential } }
      : s,
  )
}

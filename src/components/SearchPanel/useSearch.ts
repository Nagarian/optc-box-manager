import { Search, UnitFilter, UnitFilterCriteria } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { ByRarityCriteria, ByRarityFilter } from './Filters/Units/ByRarity'

function UnitFilterBuilder (
  key: string,
  criteria: UnitFilterCriteria,
): UnitFilter {
  switch (key) {
    case 'byRarity':
      return ByRarityFilter(criteria as ByRarityCriteria)

    default:
      throw new Error(`Invalid filter " ${key} "`)
  }
}

export const DefaultSearch: Search = {
  filters: {
    units: {
      byRarity: {
        values: [5, 6, '4+', '5+', '6+'],
      },
    },
  },
}

export function useSearch (search: Search) {
  const filters = Object.entries(
    search.filters.units || {},
  ).map(([key, criteria]) => UnitFilterBuilder(key, criteria))

  return {
    filters: (unit: ExtendedUnit) => !filters.some(f => !f(unit)),
  }
}

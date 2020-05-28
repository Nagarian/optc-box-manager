import { ByRarityCriteria, ByRarityFilter } from 'components/SearchPanel/Filters/Units/ByRarity'
import { Search, UnitFilter, UnitFilterCriteria } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { useEffect, useState } from 'react'

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

export function useSearch (search: Search = DefaultSearch) {
  const filters = Object.entries(
    search.filters.units || {},
  )
    .filter(([key, criteria]) => Boolean(criteria))
    .map(([key, criteria]) => UnitFilterBuilder(key, criteria!))

  return {
    search,
    filters: (unit: ExtendedUnit) => !filters.some(f => !f(unit)),
  }
}

const savedSearchKey = 'search'

export function useSavedSearch () {
  const [search, setSearch] = useState<Search>(DefaultSearch)

  useEffect(() => {
    const json = localStorage.getItem(savedSearchKey)
    if (json) {
      setSearch(JSON.parse(json))
    }
  }, [])

  useEffect(() => {
    if (search) {
      localStorage.setItem(savedSearchKey, JSON.stringify(search))
    }
  }, [search])

  const seaarch = useSearch(search)

  return {
    ...seaarch,
    setSearch,
  }
}

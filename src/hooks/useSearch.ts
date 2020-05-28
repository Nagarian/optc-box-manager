import { UnitFilterBuilder } from 'components/SearchPanel/Filters/Units'
import { Search } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { useEffect, useState } from 'react'

export const DefaultSearch: Search = {
  filters: {
    units: {
      byRarity: {
        values: [5, 6, '4+', '5+', '6+'],
      },
      byUnclassable: {
        globalOnly: true,
        evolvedOnly: true,
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

import { UnitFilterBuilder } from 'components/SearchPanel/Filters/Units'
import { SearchFilterUserUnitsKeys, UserUnitFilterBuilder } from 'components/SearchPanel/Filters/UserUnits'
import { Search } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
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
  const unitFilters = Object.entries(search.filters.units || {})
    .filter(([key, criteria]) => Boolean(criteria))
    .map(([key, criteria]) => UnitFilterBuilder(key, criteria!))

  const userUnitFilters = Object.entries(search.filters.userUnits || {})
    .filter(([key, criteria]) => Boolean(criteria))
    .map(([key, criteria]) =>
      UserUnitFilterBuilder(key as SearchFilterUserUnitsKeys, criteria!),
    )

  return {
    search,
    unitFilters: (unit: ExtendedUnit) => !unitFilters.some(f => !f(unit)),
    userUnitFilters: (userUnit: UserUnit) =>
      !unitFilters.some(f => !f(userUnit.unit)) &&
      !userUnitFilters.some(f => !f(userUnit)),
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

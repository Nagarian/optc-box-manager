import { Search, UnitSort, UserUnitSort } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import { SearchFilterUnitsType, UnitFilterBuilder } from 'pages/FilterSort/components/Filters/Units'
import { SearchFilterUserUnitsType, UserUnitFilterBuilder } from 'pages/FilterSort/components/Filters/UserUnits'
import { DescendingSort, SearchSortBuilder, UnitSort2UserUnitSort } from 'pages/FilterSort/components/Sorts'
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
  sorts: [
    { by: 'byType', order: 'asc' },
    { by: 'byRarity', order: 'desc' },
    { by: 'byFamily', order: 'asc' },
    { by: 'byId', order: 'asc' },
  ],
}

export function useSearch (search: Search = DefaultSearch) {
  const unitFilters = Object.entries(search.filters.units || {})
    .filter(([key, criteria]) => Boolean(criteria))
    .map(([key, criteria]) =>
      UnitFilterBuilder[key as SearchFilterUnitsType].builder(criteria),
    )

  const userUnitFilters = Object.entries(search.filters.userUnits || {})
    .filter(([key, criteria]) => Boolean(criteria))
    .map(([key, criteria]) =>
      UserUnitFilterBuilder[key as SearchFilterUserUnitsType].builder(criteria),
    )

  const unitSorters: UnitSort[] = search.sorts
    .filter(({ by }) => SearchSortBuilder[by].type === 'unit')
    .map<UnitSort>(({ by, order }) =>
      order === 'desc'
        ? DescendingSort(SearchSortBuilder[by].fn as UnitSort)
        : (SearchSortBuilder[by].fn as UnitSort),
    )

  const userUnitSorters: UserUnitSort[] = search.sorts.map<UserUnitSort>(
    ({ by, order }) => {
      const builder = SearchSortBuilder[by]
      const fn: UserUnitSort =
        builder.type === 'unit'
          ? UnitSort2UserUnitSort(builder.fn as UnitSort)
          : (builder.fn as UserUnitSort)
      return order === 'desc' ? DescendingSort(fn) : fn
    },
  )

  return {
    search,
    unitFilters: (unit: ExtendedUnit) => !unitFilters.some(f => !f(unit)),
    userUnitFilters: (userUnit: UserUnit) =>
      !unitFilters.some(f => !f(userUnit.unit)) &&
      !userUnitFilters.some(f => !f(userUnit)),
    unitSort: (unit1: ExtendedUnit, unit2: ExtendedUnit) => {
      for (const sort of unitSorters) {
        const result = sort(unit1, unit2)
        if (result !== 0) return result
      }

      return 0
    },
    userUnitSort: (userUnit1: UserUnit, userUnit2: UserUnit) => {
      for (const sort of userUnitSorters) {
        const result = sort(userUnit1, userUnit2)
        if (result !== 0) return result
      }

      return 0
    },
  }
}

export function useSavedSearch (savedSearchKey: string = 'search') {
  const [search, setSearch] = useState<Search>(DefaultSearch)

  useEffect(() => {
    const json = localStorage.getItem(savedSearchKey)
    if (json) {
      setSearch(JSON.parse(json))
    }
  }, [savedSearchKey])

  useEffect(() => {
    if (search) {
      localStorage.setItem(savedSearchKey, JSON.stringify(search))
    }
  }, [savedSearchKey, search])

  const seaarch = useSearch(search)

  return {
    ...seaarch,
    setSearch,
  }
}

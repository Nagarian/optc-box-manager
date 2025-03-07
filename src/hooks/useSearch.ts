import { Search } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import {
  SearchFilterUnitsType,
  UnitFilterBuilder,
} from 'pages/SearchBuilder/components/Filters/Units'
import {
  SearchFilterUserUnitsType,
  UserUnitFilterBuilder,
} from 'pages/SearchBuilder/components/Filters/UserUnits'
import {
  isUnitSort,
  sortUnitCriteria,
  sortUserUnitCriteria,
  UnitSort,
  UserUnitSort,
} from 'pages/SearchBuilder/components/Sorts'
import { useStorage } from './useStorage'
import { useUserSettings } from './useUserSettings'

export const EmptySearch: Search = {
  filters: {},
  sorts: [],
}

export const DefaultSearch: Search = {
  filters: {
    units: {
      byRarity: {
        values: [5, 6, '4+', '5+', '6+'],
      },
      byUnclassable: {
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

export const DefaultSugoCleanerSearch: Search = {
  filters: {
    units: { byDrop: { dropLocations: ['rarerecruit'] } },
    userUnits: {},
  },
  sorts: [{ by: 'byId', order: 'desc' }],
}

export const DefaultUserBoxSearch: Search = {
  filters: { units: {}, userUnits: {} },
  sorts: [{ by: 'byAddedToBox', order: 'desc' }],
  displayer: { type: 'level', options: { type: 'level' } },
}

export function mergeSearch(search: Search, search2: Partial<Search>): Search {
  return {
    ...search,
    ...search2,
    filters: {
      ...search.filters,
      ...search2.filters,
      units: {
        ...search.filters.units,
        ...(search2.filters?.units ?? {}),
      },
      userUnits: {
        ...search.filters.userUnits,
        ...(search2.filters?.userUnits ?? {}),
      },
    },
    sorts: search2.sorts?.length ? search2.sorts : search.sorts,
  }
}

export function useSearch(search: Search = DefaultSearch) {
  const userSettings = useUserSettings()

  const unitFilters = Object.entries(search.filters.units || {})
    .filter(([key, criteria]) => Boolean(criteria))
    .map(([key, criteria]) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      UnitFilterBuilder[key as SearchFilterUnitsType].builder(criteria as any),
    )

  const userUnitFilters = Object.entries(search.filters.userUnits || {})
    .filter(([key, criteria]) => Boolean(criteria))
    .map(([key, criteria]) =>
      UserUnitFilterBuilder[key as SearchFilterUserUnitsType].builder(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
        criteria as any,
        userSettings,
      ),
    )

  const unitSorters: UnitSort[] = search.sorts
    .filter(isUnitSort)
    .map<UnitSort>(sortUnitCriteria)

  const userUnitSorters: UserUnitSort[] =
    search.sorts.map<UserUnitSort>(sortUserUnitCriteria)

  return {
    search,
    unitFilters: (unit: ExtendedUnit) => unitFilters.every(f => f(unit)),
    userUnitFilters: (userUnit: UserUnit) =>
      unitFilters.every(f => f(userUnit.unit)) &&
      userUnitFilters.every(f => f(userUnit)),
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

export function useSavedSearch(
  savedSearchKey: string = 'search',
  defaultSearch: Search = DefaultSearch,
) {
  const [search, setSearch] = useStorage<Search>(savedSearchKey, defaultSearch)
  const seaarch = useSearch(search)

  return {
    ...seaarch,
    setSearch,
  }
}

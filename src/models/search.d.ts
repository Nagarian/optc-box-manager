import { SearchDisplayerCriteria } from 'pages/FilterSort/components/Displayers'
import { SearchSortType } from 'pages/FilterSort/components/Sorts'
import { ExtendedUnit } from './units'
import { UserUnit } from './userBox'

export type LogicalMode = 'AND' | 'OR'

export type Filter<T> = (unit: T) => boolean
export type UnitFilter = Filter<ExtendedUnit>
export type UserUnitFilter = Filter<UserUnit>

export type SearchFilterCriteriaInputProps<T = unknown | undefined> = {
  criteria?: T
  onChange: (criteria?: T) => void
}

export type SearchFilterUnits<T = unknown | undefined> = {
  [key in SearchFilterUnitsType]?: T
}

export type SearchFilterUserUnits<T = unknown | undefined> = {
  [key in SearchFilterUserUnitsType]?: T
}

export type Sort<T> = (u1: T, u2: T) => number
export type UnitSort = Sort<ExtendedUnit>
export type UserUnitSort = Sort<UserUnit>

export type SearchSortCriteria<T = unknown | undefined> = {
  by: SearchSortType
  order: 'asc' | 'desc'
  options?: T
}

export type SearchSortInputProps<T = undefined> = {
  options?: T
  onChange: (options?: T) => void
}

export type SearchSortWithOptionFunction<T = undefined> = (
  options: T,
) => UnitSort | UserUnitSort

export type Search = {
  filters: {
    units?: SearchFilterUnits
    userUnits?: SearchFilterUserUnits
  }
  sorts: SearchSortCriteria[]
  displayer?: SearchDisplayerCriteria
}

import { SearchFilterUnits } from 'pages/FilterSort/components/Filters/Units'
import { SearchFilterUserUnits } from 'pages/FilterSort/components/Filters/UserUnits'
import { SearchSortType } from 'pages/FilterSort/components/Sorts'
import { ExtendedUnit } from './units'
import { UserUnit } from './userBox'

export type LogicalMode = 'AND' | 'OR'

export interface UnitFilterCriteria {}
export interface UserUnitFilterCriteria {}

export type UnitFilter = (unit: ExtendedUnit) => boolean
export type UserUnitFilter = (userUnit: UserUnit) => boolean

export type Sort<T> = (u1: T, u2: T) => number
export type UnitSort = Sort<ExtendedUnit>
export type UserUnitSort = Sort<UserUnit>

export type SearchSortCriteria = {
  by: SearchSortType
  order: 'asc' | 'desc'
}

export type Search = {
  filters: {
    units?: SearchFilterUnits,
    userUnits?: SearchFilterUserUnits
  }
  sorts: SearchSortCriteria[]
}

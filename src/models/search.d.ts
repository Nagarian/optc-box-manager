import { SearchBoxDisplayerCriteria } from 'pages/SearchBuilder/components/BoxDisplayers'
import { SearchDisplayerCriteria } from 'pages/SearchBuilder/components/Displayers'
import { SearchFilterUnits } from 'pages/SearchBuilder/components/Filters/Units'
import { SearchFilterUserUnits } from 'pages/SearchBuilder/components/Filters/UserUnits'
import { SearchSortCriteria } from 'pages/SearchBuilder/components/Sorts'
import { ExtendedUnit } from './units'
import { UserUnit } from './userBox'

export type Filter<T> = (unit: T) => boolean
export type UnitFilter = Filter<ExtendedUnit>
export type UserUnitFilter = Filter<UserUnit>

export type SearchFilterCriteriaInputProps<T = unknown> = {
  criteria?: T
  onChange: (criteria?: T) => void
}

export type SearchOptionInputProps<T> = {
  options?: T
  onChange: (options?: T) => void
}

export type Search = {
  filters: {
    units?: SearchFilterUnits
    userUnits?: SearchFilterUserUnits
  }
  sorts: SearchSortCriteria[]
  displayer?: SearchDisplayerCriteria
  boxDisplayer?: SearchBoxDisplayerCriteria
}

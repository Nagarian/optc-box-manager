import { SearchFilterUnits } from 'pages/FilterSort/components/Filters/Units'
import { SearchFilterUserUnits } from 'pages/FilterSort/components/Filters/UserUnits'
import { UserUnit } from './userBox'

export type LogicalMode = 'AND' | 'OR'

export interface UnitFilterCriteria {}
export interface UserUnitFilterCriteria {}

type UnitFilter = (unit: ExtendedUnit) => boolean
type UserUnitFilter = (userUnit: UserUnit) => boolean

export type Search = {
  filters: {
    units?: SearchFilterUnits,
    userUnits?: SearchFilterUserUnits
  }
}

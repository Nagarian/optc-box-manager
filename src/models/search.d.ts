import { ByRarityCriteria } from 'components/SearchPanel/Filters/Units/ByRarity'

export type LogicalMode = 'AND' | 'OR'

export interface UnitFilterCriteria {}

type UnitFilter = (unit: ExtendedUnit) => boolean

// epxort type Default
//   values: string[]
//   searchMode?: LogicalMode
// }

export interface UserUnitFilterCriteria {}

export type SearchFilterUnits = {
  // [key: string]: UnitFilterCriteria
  byRarity?: ByRarityCriteria
}

export type Search = {
  filters: {
    units?: SearchFilterUnits,
    userUnits?: {
      [key: string]: UserUnitFilterCriteria
    }
  }
}

import { SearchFilterUnits } from 'components/SearchPanel/Filters/Units'

export type LogicalMode = 'AND' | 'OR'

export interface UnitFilterCriteria {}

type UnitFilter = (unit: ExtendedUnit) => boolean

// epxort type Default
//   values: string[]
//   searchMode?: LogicalMode
// }

export interface UserUnitFilterCriteria {}

export type Search = {
  filters: {
    units?: SearchFilterUnits,
    userUnits?: {
      [key: string]: UserUnitFilterCriteria
    }
  }
}

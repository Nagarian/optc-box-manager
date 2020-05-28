
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
    units?: {
      [key: string]: UnitFilterCriteria
    },
    userUnits?: {
      [key: string]: UserUnitFilterCriteria
    }
  }
}

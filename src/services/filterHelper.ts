import { UnitFilter } from 'models/search'
import { ExtendedUnit } from 'models/units'

export function BooleanUnitFilterMapper (...args: [boolean | undefined, UnitFilter][]) {
  const filters = args
    .filter(([include, filter]) => !!include)
    .map(([, filter]) => filter)

  return filters.length === 0
    ? (unit: ExtendedUnit) => true
    : (unit: ExtendedUnit) => !filters.some(fn => !fn(unit))
}

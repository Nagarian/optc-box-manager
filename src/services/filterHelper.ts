import { Filter } from 'models/search'

export function BooleanFilterMapper<T>(...args: [unknown, Filter<T>][]) {
  const filters = args
    .filter(([include, filter]) => Boolean(include))
    .map(([, filter]) => filter)

  return filters.length === 0
    ? (unit: T) => true
    : (unit: T) => !filters.some(fn => !fn(unit))
}

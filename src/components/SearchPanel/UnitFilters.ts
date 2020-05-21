import { ExtendedUnit, UnitStar } from 'models/units'
import { useEffect, useState } from 'react'

type UnitFilter = (unit: ExtendedUnit) => boolean

const Filters = {
  hideUnEvolved: (unit: ExtendedUnit) => !unit.evolution,
  byRarity: (criteria: UnitStar[]) => (unit: ExtendedUnit) =>
    criteria.includes(unit.stars),
  globalOnly: (unit: ExtendedUnit) => !!unit.flags?.global,
}

export function useUnitFilters () {
  const [filters, setFilters] = useState<UnitFilter[]>([])

  useEffect(() => {
    setFilters([
      Filters.hideUnEvolved,
      Filters.byRarity([5, 6, '4+', '5+', '6+']),
      Filters.globalOnly,
    ])
  }, [])

  return {
    filters: (unit: ExtendedUnit) => !filters.some(f => !f(unit)),
  }
}

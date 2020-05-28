import { UnitFilter } from 'models/search'
import { ExtendedUnit, UnitStar } from 'models/units'
import { useEffect, useState } from 'react'

const Filters = {
  hasSuperEvolved: (unit: ExtendedUnit) => !unit.evolution,
  hasEvolved: (unit: ExtendedUnit) => !unit.evolution || unit.evolution.evolvers[0].startsWith?.('skull'),
  byRarity: (criteria: UnitStar[]) => (unit: ExtendedUnit) =>
    criteria.includes(unit.stars),
  globalOnly: (unit: ExtendedUnit) => !!unit.flags?.global,
}

export function useUnitFilters () {
  const [filters, setFilters] = useState<UnitFilter[]>([])

  useEffect(() => {
    setFilters([
      Filters.byRarity([5, 6, '4+', '5+', '6+']),
      Filters.hasEvolved,
      Filters.globalOnly,
    ])
  }, [])

  return {
    filters: (unit: ExtendedUnit) => !filters.some(f => !f(unit)),
  }
}

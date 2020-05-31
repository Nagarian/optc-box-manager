import { UnitFilterCriteria } from 'models/search'
import { ExtendedUnit } from 'models/units'
import React from 'react'
import FilterContainer from '../FilterContainer'

export interface ByUnclassableCriteria extends UnitFilterCriteria {
  globalOnly?: boolean
  evolvedOnly?: boolean
  superEvolvedOnly?: boolean
}

const UnclassedFilters = {
  hasSuperEvolved: (unit: ExtendedUnit) => !unit.evolution,
  hasEvolved: (unit: ExtendedUnit) =>
    !unit.evolution || unit.evolution.evolvers[0].startsWith?.('skull'),
  globalOnly: (unit: ExtendedUnit) => !!unit.flags?.global,
}

export const ByUnclassableFilter = (criteria: ByUnclassableCriteria) => {
  const filters = [
    !!criteria.evolvedOnly && UnclassedFilters.hasEvolved,
    !!criteria.superEvolvedOnly && UnclassedFilters.hasSuperEvolved,
    !!criteria.globalOnly && UnclassedFilters.globalOnly,
  ].filter(Boolean) as ((unit: ExtendedUnit) => void)[]
  return filters.length === 0
    ? (unit: ExtendedUnit) => true
    : (unit: ExtendedUnit) => filters.some(fn => fn(unit))
}

export type ByUnclassableInputProps = {
  criteria?: ByUnclassableCriteria
  onChange: (criteria?: ByUnclassableCriteria) => void
}

export function ByUnclassableInput ({
  criteria,
  onChange,
}: ByUnclassableInputProps) {
  return (
    <FilterContainer title="Common" onReset={() => onChange(undefined)}>
      <label>
        <input
          type="checkbox"
          name="global-only"
          checked={criteria?.globalOnly ?? false}
          onChange={e => onChange({
            ...criteria,
            globalOnly: e.target.checked,
          })}
        />
        Show global only
      </label>

      <label>
        <input
          type="radio"
          name="evolved-only"
          checked={criteria?.evolvedOnly ?? false}
          onChange={e => onChange({
            ...criteria,
            superEvolvedOnly: !e.target.checked,
            evolvedOnly: e.target.checked,
          })}
        />
        Show evolved units only
      </label>

      <label>
        <input
          type="radio"
          name="evolved-only"
          checked={criteria?.superEvolvedOnly ?? false}
          onChange={e => onChange({
            ...criteria,
            superEvolvedOnly: e.target.checked,
            evolvedOnly: !e.target.checked,
          })}
        />
        Show super-evolved units only (this hide 6 when 6+ is available)
      </label>
    </FilterContainer>
  )
}

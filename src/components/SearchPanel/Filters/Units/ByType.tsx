import { UnitFilterCriteria } from 'models/search'
import { ExtendedUnit, UnitType, UnitTypes } from 'models/units'
import React from 'react'
import FilterContainer from './FilterContainer'

export interface ByTypeCriteria extends UnitFilterCriteria {
  values: UnitType[]
}

export const ByTypeFilter = (criteria: ByTypeCriteria) => (
  unit: ExtendedUnit,
) =>
  criteria.values.some(crit =>
    Array.isArray(unit.type)
      ? unit.type.some(t => t === crit)
      : unit.type === crit,
  )

export type ByTypeInputProps = {
  criteria?: ByTypeCriteria
  onChange: (criteria?: ByTypeCriteria) => void
}

export function ByTypeInput ({
  criteria = { values: [] },
  onChange,
}: ByTypeInputProps) {
  const triggerChange = (value: UnitType, check: boolean) => {
    const values = check
      ? criteria.values.concat(value)
      : criteria.values.filter(v => v !== value)

    onChange(
      values.length
        ? {
          values,
        }
        : undefined,
    )
  }

  return (
    <FilterContainer title="Type" onReset={() => onChange(undefined)}>
      {UnitTypes.map(unitType => (
        <label key={unitType}>
          <input
            type="checkbox"
            name="unit-type"
            checked={criteria.values.includes(unitType)}
            onChange={e => triggerChange(unitType, e.target.checked)}
          />
          {unitType}
        </label>
      ))}
    </FilterContainer>
  )
}

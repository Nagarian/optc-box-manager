import PotentialAbility from 'components/PotentialAbility'
import { UnitFilterCriteria } from 'models/search'
import { ExtendedUnit, PotentialKey, Potentials } from 'models/units'
import React from 'react'
import FilterContainer from './FilterContainer'

export interface ByPotentialCriteria extends UnitFilterCriteria {
  values: PotentialKey[]
}

export const ByPotentialFilter = (criteria: ByPotentialCriteria) => (
  unit: ExtendedUnit,
) =>
  criteria.values.some(crit =>
    unit.detail.potential?.some(p => p.Name === crit),
  )

export type ByPotentialInputProps = {
  criteria?: ByPotentialCriteria
  onChange: (criteria?: ByPotentialCriteria) => void
}

export function ByPotentialInput ({
  criteria = { values: [] },
  onChange,
}: ByPotentialInputProps) {
  const triggerChange = (value: PotentialKey, check: boolean) => {
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
    <FilterContainer title="Potentials" onReset={() => onChange(undefined)}>
      {Potentials.map(potential => (
        <label key={potential}>
          <input
            type="checkbox"
            name="unit-potentials"
            checked={criteria.values.includes(potential)}
            onChange={e => triggerChange(potential, e.target.checked)}
          />
          <PotentialAbility type={potential} size="2" />
        </label>
      ))}
    </FilterContainer>
  )
}

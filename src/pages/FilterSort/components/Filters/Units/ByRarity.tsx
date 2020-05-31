import { UnitFilterCriteria } from 'models/search'
import { ExtendedUnit, Rarity, UnitStar } from 'models/units'
import React from 'react'
import FilterContainer from '../FilterContainer'

export interface ByRarityCriteria extends UnitFilterCriteria {
  values: UnitStar[]
}

export const ByRarityFilter = (criteria: ByRarityCriteria) => (
  unit: ExtendedUnit,
) => criteria.values.includes(unit.stars)

export type ByRarityInputProps = {
  criteria?: ByRarityCriteria
  onChange: (criteria?: ByRarityCriteria) => void
}

export function ByRarityInput ({
  criteria = { values: [] },
  onChange,
}: ByRarityInputProps) {
  const triggerChange = (value: UnitStar, check: boolean) => {
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
    <FilterContainer title="Rarity" onReset={() => onChange(undefined)}>
      {Rarity.map(value => (
        <label key={value}>
          <input
            type="checkbox"
            name="rarity-filter"
            checked={criteria.values.includes(value)}
            onChange={e => triggerChange(value, e.target.checked)}
          />
          ⭐{value}
        </label>
      ))}
    </FilterContainer>
  )
}

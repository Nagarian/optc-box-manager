import { SearchFilterCriteria, SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedUnit } from 'models/units'
import React from 'react'
import FilterContainer, { FilterContainerPanel } from '../FilterContainer'

export interface BySupportCriteria extends SearchFilterCriteria {
  hasSupport: boolean
}

export const BySupportFilter = (criteria: BySupportCriteria) => (
  unit: ExtendedUnit,
) => (unit.detail.support?.length > 0) === (criteria.hasSupport ?? false)

export function BySupportInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<BySupportCriteria>) {
  const triggerChange = (check: boolean) => {
    onChange({
      hasSupport: check,
    })
  }

  return (
    <FilterContainer
      title="Support"
      onReset={() => onChange(undefined)}
      disableReset={!criteria}
    >
      <FilterContainerPanel>
        <label>
          <input
            type="radio"
            name="has-support"
            checked={criteria?.hasSupport === true}
            onChange={e => triggerChange(true)}
          />
          Has support ability
        </label>
        <label>
          <input
            type="radio"
            name="has-support"
            checked={criteria?.hasSupport === false}
            onChange={e => triggerChange(false)}
          />
          Hasn't support ability
        </label>
      </FilterContainerPanel>
    </FilterContainer>
  )
}

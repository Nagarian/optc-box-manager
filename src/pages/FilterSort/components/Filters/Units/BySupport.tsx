import { UnitFilterCriteria } from 'models/search'
import { ExtendedUnit } from 'models/units'
import React from 'react'
import FilterContainer, { FilterContainerPanel } from '../FilterContainer'

export interface BySupportCriteria extends UnitFilterCriteria {
  hasSupport: boolean
}

export const BySupportFilter = (criteria: BySupportCriteria) => (
  unit: ExtendedUnit,
) => (unit.detail.support?.length > 0) === criteria.hasSupport

export type BySupportInputProps = {
  criteria?: BySupportCriteria
  onChange: (criteria?: BySupportCriteria) => void
}

export function BySupportInput ({ criteria, onChange }: BySupportInputProps) {
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

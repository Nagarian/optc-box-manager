import { UnitFilterCriteria } from 'models/search'
import { ExtendedUnit } from 'models/units'
import React from 'react'
import { BooleanUnitFilterMapper } from 'services/filterHelper'
import FilterContainer, { FilterContainerPanel } from '../FilterContainer'

export interface ByUnclassableCriteria extends UnitFilterCriteria {
  globalOnly?: boolean
  evolvedOnly?: boolean
  superEvolvedOnly?: boolean
}

const UnclassedFilters = {
  hasSuperEvolved: (unit: ExtendedUnit) => !unit.evolution,
  hasEvolved: (unit: ExtendedUnit) =>
    (!unit.evolution ||
      unit.evolution.evolvers[0].startsWith?.('skull') ||
      false) as boolean,
  globalOnly: (unit: ExtendedUnit) => !!unit.flags?.global,
}

export const ByUnclassableFilter = (criteria: ByUnclassableCriteria) =>
  BooleanUnitFilterMapper(
    [criteria.evolvedOnly, UnclassedFilters.hasEvolved],
    [criteria.superEvolvedOnly, UnclassedFilters.hasSuperEvolved],
    [criteria.globalOnly, UnclassedFilters.globalOnly],
  )

export type ByUnclassableInputProps = {
  criteria?: ByUnclassableCriteria
  onChange: (criteria?: ByUnclassableCriteria) => void
}

export function ByUnclassableInput ({
  criteria,
  onChange,
}: ByUnclassableInputProps) {
  return (
    <FilterContainer
      title="Common"
      onReset={() => onChange(undefined)}
      disableReset={!criteria}
    >
      <label>
        <input
          type="checkbox"
          name="global-only"
          checked={criteria?.globalOnly ?? false}
          onChange={e =>
            onChange({
              ...criteria,
              globalOnly: e.target.checked,
            })
          }
        />
        Show global only
      </label>

      <FilterContainerPanel marginTop="2">
        Hide
        <label>
          <input
            type="radio"
            name="evolved-only"
            checked={criteria?.evolvedOnly ?? false}
            onChange={e =>
              onChange({
                ...criteria,
                superEvolvedOnly: !e.target.checked,
                evolvedOnly: e.target.checked,
              })
            }
          />
          unevolved
        </label>
        <label>
          <input
            type="radio"
            name="evolved-only"
            checked={criteria?.superEvolvedOnly ?? false}
            onChange={e =>
              onChange({
                ...criteria,
                superEvolvedOnly: e.target.checked,
                evolvedOnly: !e.target.checked,
              })
            }
          />
          unevolved + not super-evolved
        </label>
      </FilterContainerPanel>
    </FilterContainer>
  )
}
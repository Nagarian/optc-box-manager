import { UnitFilterCriteria } from 'models/search'
import { ExtendedUnit, UnitSpecial } from 'models/units'
import React from 'react'
import { BooleanUnitFilterMapper } from 'services/filterHelper'
import FilterContainer from '../FilterContainer'

export interface ByRcvFinderCriteria extends UnitFilterCriteria {
  captainRcv?: boolean
  specialRcv?: boolean
}

const RcvRegex = /( rcv|rcv )/i

const SpecialRcvFinder = (special: UnitSpecial) => {
  if (Array.isArray(special)) {
    return special.some(spe => RcvRegex.test(spe.description))
  }

  return RcvRegex.test(special)
}

export const ByRcvFinderFilter = (criteria: ByRcvFinderCriteria) =>
  BooleanUnitFilterMapper(
    [
      criteria.captainRcv,
      (unit: ExtendedUnit) => RcvRegex.test(unit.detail.captain),
    ],
    [
      criteria.specialRcv,
      (unit: ExtendedUnit) => SpecialRcvFinder(unit.detail.special),
    ],
  )

export type ByRcvFinderInputProps = {
  criteria?: ByRcvFinderCriteria
  onChange: (criteria?: ByRcvFinderCriteria) => void
}

export function ByRcvFinderInput ({
  criteria,
  onChange,
}: ByRcvFinderInputProps) {
  return (
    <FilterContainer
      title="Rcv Finder"
      onReset={() => onChange(undefined)}
      disableReset={!criteria}
    >
      <label>
        <input
          type="checkbox"
          name="captainRcv"
          checked={criteria?.captainRcv === true}
          onChange={e =>
            onChange({
              ...criteria,
              captainRcv: e.target.checked,
            })
          }
        />
        Show RCV related captain
      </label>
      <label>
        <input
          type="checkbox"
          name="specialRcv"
          checked={criteria?.specialRcv === true}
          onChange={e =>
            onChange({
              ...criteria,
              specialRcv: e.target.checked,
            })
          }
        />
        Show RCV related special
      </label>
    </FilterContainer>
  )
}

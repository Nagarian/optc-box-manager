import { SearchFilterCriteria, SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedUnit, UnitSpecial } from 'models/units'
import React from 'react'
import { BooleanUnitFilterMapper } from 'services/filterHelper'

export interface ByRcvFinderCriteria extends SearchFilterCriteria {
  captainRcv?: boolean
  specialRcv?: boolean
}

const RcvRegex = /( rcv|rcv )/i

const SpecialRcvFinder = (special: UnitSpecial) => {
  if (Array.isArray(special)) {
    return special.some(spe => RcvRegex.test(spe.description))
  }
  if (typeof special === 'string') {
    return RcvRegex.test(special)
  }

  return false
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

export function ByRcvFinderInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByRcvFinderCriteria>) {
  return (
    <>
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
    </>
  )
}

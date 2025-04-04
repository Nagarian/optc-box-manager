import { ChoiceInput } from 'components/forms/ChoiceInput'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedUnit, UnitCaptain, UnitSpecial } from 'models/units'
import { BooleanFilterMapper } from 'services/filterHelper'
import {
  SearchRecapItem,
  SearchRecapItemCriteriaProps,
} from '../../BoxDisplayers/SearchRecap/SearchRecapItem'

export interface ByRcvFinderCriteria {
  captainRcv?: boolean
  specialRcv?: boolean
}

const RcvRegex = /( rcv|rcv )/i

const CaptainRcvFinder = (captain: UnitCaptain) => {
  if (typeof captain === 'string') {
    return RcvRegex.test(captain)
  }

  if (typeof captain === 'object') {
    const keys = Object.keys(captain)
    const lastKey = keys[keys.length - 1]
    const captainDetail = captain[lastKey as keyof UnitCaptain]
    return RcvRegex.test(captainDetail)
  }

  return false
}

const SpecialRcvFinder = (special: UnitSpecial) => {
  return RcvRegex.test(special)
}

export const ByRcvFinderFilter = (criteria: ByRcvFinderCriteria) =>
  BooleanFilterMapper(
    [
      criteria.captainRcv,
      (unit: ExtendedUnit) => CaptainRcvFinder(unit.detail.captain),
    ],
    [
      criteria.specialRcv,
      (unit: ExtendedUnit) => SpecialRcvFinder(unit.detail.special),
    ],
  )

export function ByRcvFinderInput({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByRcvFinderCriteria>) {
  return (
    <>
      <ChoiceInput
        type="checkbox"
        name="captainRcv"
        checked={criteria?.captainRcv === true}
        onChange={e =>
          onChange({
            ...criteria,
            captainRcv: e.target.checked,
          })
        }
      >
        Show RCV related captain
      </ChoiceInput>
      <ChoiceInput
        type="checkbox"
        name="specialRcv"
        checked={criteria?.specialRcv === true}
        onChange={e =>
          onChange({
            ...criteria,
            specialRcv: e.target.checked,
          })
        }
      >
        Show RCV related special
      </ChoiceInput>
    </>
  )
}

export function ByRcvFinderBoxDisplayer({
  criteria,
}: SearchRecapItemCriteriaProps<ByRcvFinderCriteria>) {
  if (!criteria) {
    return undefined
  }

  return (
    <SearchRecapItem title="rcv finder">
      {criteria.captainRcv && `captain`}
      {criteria.specialRcv && `special`}
    </SearchRecapItem>
  )
}

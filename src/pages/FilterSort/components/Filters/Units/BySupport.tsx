import {
  SearchFilterCriteria,
  SearchFilterCriteriaInputProps,
} from 'models/search'
import { ExtendedUnit } from 'models/units'
import React from 'react'
import { FilterContainerPanel } from '../FilterContainer'
import { SubTitle } from 'components/Title'
import { BooleanFilterMapper } from 'services/filterHelper'
import Box from 'components/Box'
import ChoiceInput from 'components/forms/ChoiceInput'

export interface BySupportCriteria extends SearchFilterCriteria {
  hasSupport?: boolean
  hasAtkSupport?: boolean
  hasHpSupport?: boolean
  hasRcvSupport?: boolean
  hasOtherSupport?: boolean
}

const AtkRegex = /Adds.+%.+ATK/i
const HpRegex = /Adds.+%.+HP/i
const RcvRegex = /Adds.+%.+RCV/i

export const BySupportFilter = (criteria: BySupportCriteria) =>
  BooleanFilterMapper(
    [
      typeof criteria.hasSupport === 'boolean' && criteria.hasSupport,
      (unit: ExtendedUnit) => unit?.detail?.support?.length > 0,
    ],
    [
      typeof criteria.hasSupport === 'boolean' && !criteria.hasSupport,
      (unit: ExtendedUnit) => !unit?.detail?.support?.length,
    ],
    [
      criteria.hasAtkSupport,
      (unit: ExtendedUnit) =>
        unit?.detail?.support?.some(support =>
          support.description.some(desc => AtkRegex.test(desc)),
        ),
    ],
    [
      criteria.hasHpSupport,
      (unit: ExtendedUnit) =>
        unit?.detail?.support?.some(support =>
          support.description.some(desc => HpRegex.test(desc)),
        ),
    ],
    [
      criteria.hasRcvSupport,
      (unit: ExtendedUnit) =>
        unit?.detail?.support?.some(support =>
          support.description.some(desc => RcvRegex.test(desc)),
        ),
    ],
    [
      criteria.hasOtherSupport,
      (unit: ExtendedUnit) =>
        unit?.detail?.support?.some(support =>
          support.description.some(
            desc =>
              !AtkRegex.test(desc) &&
              !HpRegex.test(desc) &&
              !RcvRegex.test(desc),
          ),
        ),
    ],
  )

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
    <Box>
      <FilterContainerPanel>
        <ChoiceInput
          type="radio"
          name="has-support"
          checked={criteria?.hasSupport === true}
          onChange={e => triggerChange(true)}
        >
          Has support ability
        </ChoiceInput>
        <ChoiceInput
          type="radio"
          name="has-support"
          checked={criteria?.hasSupport === false}
          onChange={e => triggerChange(false)}
        >
          Hasn't support ability
        </ChoiceInput>
      </FilterContainerPanel>

      <SubTitle fontSize="2" my="2">
        Specific Support Finder
      </SubTitle>
      <FilterContainerPanel>
        <ChoiceInput
          type="checkbox"
          name="hasAtkSupport"
          checked={criteria?.hasAtkSupport === true}
          onChange={e =>
            onChange({
              ...criteria,
              hasAtkSupport: e.target.checked,
            })
          }
        >
          ATK
        </ChoiceInput>
        <ChoiceInput
          type="checkbox"
          name="hasHpSupport"
          checked={criteria?.hasHpSupport === true}
          onChange={e =>
            onChange({
              ...criteria,
              hasHpSupport: e.target.checked,
            })
          }
        >
          HP
        </ChoiceInput>
        <ChoiceInput
          type="checkbox"
          name="hasRcvSupport"
          checked={criteria?.hasRcvSupport === true}
          onChange={e =>
            onChange({
              ...criteria,
              hasRcvSupport: e.target.checked,
            })
          }
        >
          RCV
        </ChoiceInput>
        <ChoiceInput
          type="checkbox"
          name="hasRcvSupport"
          checked={criteria?.hasOtherSupport === true}
          onChange={e =>
            onChange({
              ...criteria,
              hasAtkSupport: undefined,
              hasHpSupport: undefined,
              hasRcvSupport: undefined,
              hasOtherSupport: e.target.checked,
            })
          }
        >
          Other
        </ChoiceInput>
      </FilterContainerPanel>
    </Box>
  )
}

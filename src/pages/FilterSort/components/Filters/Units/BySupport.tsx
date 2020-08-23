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

      <SubTitle fontSize="2" my="2">
        Specific Support Finder
      </SubTitle>
      <FilterContainerPanel>
        <label>
          <input
            type="checkbox"
            name="hasAtkSupport"
            checked={criteria?.hasAtkSupport === true}
            onChange={e =>
              onChange({
                ...criteria,
                hasAtkSupport: e.target.checked,
              })
            }
          />
          ATK
        </label>
        <label>
          <input
            type="checkbox"
            name="hasHpSupport"
            checked={criteria?.hasHpSupport === true}
            onChange={e =>
              onChange({
                ...criteria,
                hasHpSupport: e.target.checked,
              })
            }
          />
          HP
        </label>
        <label>
          <input
            type="checkbox"
            name="hasRcvSupport"
            checked={criteria?.hasRcvSupport === true}
            onChange={e =>
              onChange({
                ...criteria,
                hasRcvSupport: e.target.checked,
              })
            }
          />
          RCV
        </label>
        <label>
          <input
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
          />
          Other
        </label>
      </FilterContainerPanel>
    </Box>
  )
}

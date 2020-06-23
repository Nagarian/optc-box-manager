import {
  SearchFilterCriteria,
  SearchFilterCriteriaInputProps,
} from 'models/search'
import { ExtendedUnit } from 'models/units'
import React from 'react'
import { BooleanFilterMapper } from 'services/filterHelper'
import Box from 'components/Box'

export interface ByLimitBreakCriteria extends SearchFilterCriteria {
  hasLimitBreak?: boolean
  hasKeyLimitBreak?: boolean
}

export const ByLimitBreakFilter = (criteria: ByLimitBreakCriteria) =>
  BooleanFilterMapper(
    [
      typeof criteria.hasLimitBreak === 'boolean',
      (unit: ExtendedUnit) =>
        unit?.detail?.limit?.length
          ? criteria.hasLimitBreak!
          : !criteria.hasLimitBreak!,
    ],
    [
      typeof criteria.hasKeyLimitBreak === 'boolean',
      (unit: ExtendedUnit) =>
        unit?.detail?.limit?.some(lb => lb.description === 'LOCKED WITH KEY')
          ? criteria.hasKeyLimitBreak!
          : !criteria.hasKeyLimitBreak!,
    ],
  )

export function ByLimitBreakInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByLimitBreakCriteria>) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="auto auto"
      gridTemplateRows="auto auto"
      gridAutoFlow="column"
      gridGap="2"
    >
      <label>
        <input
          type="radio"
          name="has-lb"
          checked={criteria?.hasLimitBreak === true}
          onChange={e =>
            onChange({
              ...criteria,
              hasLimitBreak: true,
            })
          }
        />
        Has limit break
      </label>
      <label>
        <input
          type="radio"
          name="has-lb"
          checked={criteria?.hasLimitBreak === false}
          onChange={e =>
            onChange({
              ...criteria,
              hasLimitBreak: false,
            })
          }
        />
        Hasn't limit break
      </label>

      <label>
        <input
          type="radio"
          name="has-lb-key"
          checked={criteria?.hasKeyLimitBreak === true}
          onChange={e =>
            onChange({
              ...criteria,
              hasKeyLimitBreak: true,
            })
          }
        />
        Has limit break key extension
      </label>
      <label>
        <input
          type="radio"
          name="has-lb-key"
          checked={criteria?.hasKeyLimitBreak === false}
          onChange={e =>
            onChange({
              ...criteria,
              hasKeyLimitBreak: false,
            })
          }
        />
        Hasn't limit break key extension
      </label>
    </Box>
  )
}

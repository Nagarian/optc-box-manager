import {
  SearchFilterCriteria,
  SearchFilterCriteriaInputProps,
} from 'models/search'
import { ExtendedUnit } from 'models/units'
import React from 'react'
import { BooleanFilterMapper } from 'services/filterHelper'
import Box from 'components/Box'
import { getLimitType } from 'services/limit'
import { SubTitle } from 'components/Title'
import { FilterContainerPanel } from '../FilterContainer'

export interface ByLimitBreakCriteria extends SearchFilterCriteria {
  hasLimitBreak?: boolean
  hasKeyLimitBreak?: boolean
  hasCooldownExtension?: boolean
  hasCaptainReductionExtension?: boolean
  hasPotentialExtension?: boolean
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
    [
      criteria.hasCooldownExtension,
      (unit: ExtendedUnit) => {
        const keyLockIndex = unit?.detail?.limit?.findIndex(
          lb => lb.description === 'LOCKED WITH KEY',
        )
        if (!keyLockIndex || keyLockIndex === -1) {
          return false
        }

        return unit!
          .detail!.limit!.slice(keyLockIndex)
          .some(limit => getLimitType(limit) === 'cooldown')
      },
    ],
    [
      criteria.hasCaptainReductionExtension,
      (unit: ExtendedUnit) => {
        const keyLockIndex = unit?.detail?.limit?.findIndex(
          lb => lb.description === 'LOCKED WITH KEY',
        )
        if (!keyLockIndex || keyLockIndex === -1) {
          return false
        }

        return unit!
          .detail!.limit!.slice(keyLockIndex)
          .some(limit => getLimitType(limit) === 'captain')
      },
    ],
    [
      criteria.hasPotentialExtension,
      (unit: ExtendedUnit) => {
        const keyLockIndex = unit?.detail?.limit?.findIndex(
          lb => lb.description === 'LOCKED WITH KEY',
        )
        if (!keyLockIndex || keyLockIndex === -1) {
          return false
        }

        return unit!
          .detail!.limit!.slice(keyLockIndex)
          .some(limit => getLimitType(limit) === 'potential')
      },
    ],
  )

export function ByLimitBreakInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByLimitBreakCriteria>) {
  return (
    <>
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

      <SubTitle fontSize="2" my="2">Key extension Finder</SubTitle>
      <FilterContainerPanel>
        <label>
          <input
            type="checkbox"
            name="has-lb-key-cooldown"
            checked={criteria?.hasCooldownExtension === true}
            onChange={e =>
              onChange({
                ...criteria,
                hasCooldownExtension: e.target.checked,
              })
            }
          />
          Has cooldown reduction
        </label>
        <label>
          <input
            type="checkbox"
            name="has-lb-key-captain"
            checked={criteria?.hasCaptainReductionExtension === true}
            onChange={e =>
              onChange({
                ...criteria,
                hasCaptainReductionExtension: e.target.checked,
              })
            }
          />
          Has captain amelioration
        </label>
        <label>
          <input
            type="checkbox"
            name="has-lb-key-potential"
            checked={criteria?.hasPotentialExtension === true}
            onChange={e =>
              onChange({
                ...criteria,
                hasPotentialExtension: e.target.checked,
              })
            }
          />
          Has another potential
        </label>
      </FilterContainerPanel>
    </>
  )
}
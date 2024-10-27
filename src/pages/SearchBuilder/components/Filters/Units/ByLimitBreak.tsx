import { Box } from 'components/Box'
import { ChoiceInput } from 'components/forms/ChoiceInput'
import { SubTitle } from 'components/Title'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { BooleanFilterMapper } from 'services/filterHelper'
import { getLimitType } from 'services/limit'
import {
  SearchRecapItem,
  SearchRecapItemCriteriaProps,
} from '../../BoxDisplayers/SearchRecap/SearchRecapItem'
import { FilterContainerPanel } from '../FilterContainer'

export interface ByLimitBreakCriteria {
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
          ? (criteria.hasLimitBreak ?? false)
          : !criteria.hasLimitBreak,
    ],
    [
      typeof criteria.hasKeyLimitBreak === 'boolean',
      (unit: ExtendedUnit) =>
        unit?.detail?.limit?.some(lb =>
          lb.description.startsWith('LOCKED WITH KEY'),
        )
          ? (criteria.hasKeyLimitBreak ?? false)
          : !criteria.hasKeyLimitBreak,
    ],
    [
      criteria.hasCooldownExtension,
      (unit: ExtendedUnit) => {
        const keyLockIndex = unit?.detail?.limit?.findIndex(lb =>
          lb.description.startsWith('LOCKED WITH KEY'),
        )
        if (!keyLockIndex || keyLockIndex === -1 || !unit.detail.limit) {
          return false
        }

        return unit.detail.limit
          .slice(keyLockIndex)
          .some(limit => getLimitType(limit) === 'cooldown')
      },
    ],
    [
      criteria.hasCaptainReductionExtension,
      (unit: ExtendedUnit) => {
        const keyLockIndex = unit?.detail?.limit?.findIndex(lb =>
          lb.description.startsWith('LOCKED WITH KEY'),
        )
        if (!keyLockIndex || keyLockIndex === -1 || !unit.detail.limit) {
          return false
        }

        return unit.detail.limit
          .slice(keyLockIndex)
          .some(limit => getLimitType(limit) === 'captain')
      },
    ],
    [
      criteria.hasPotentialExtension,
      (unit: ExtendedUnit) => {
        const keyLockIndex = unit?.detail?.limit?.findIndex(lb =>
          lb.description.startsWith('LOCKED WITH KEY'),
        )
        if (!keyLockIndex || keyLockIndex === -1 || !unit.detail.limit) {
          return false
        }

        return unit.detail.limit
          .slice(keyLockIndex)
          .some(limit => getLimitType(limit) === 'potential')
      },
    ],
  )

export function ByLimitBreakInput({
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
        gap="2"
      >
        <ChoiceInput
          type="radio"
          name="has-lb"
          checked={criteria?.hasLimitBreak === true}
          onChange={e =>
            onChange({
              ...criteria,
              hasLimitBreak: true,
            })
          }
        >
          {'Has limit break'}
        </ChoiceInput>
        <ChoiceInput
          type="radio"
          name="has-lb"
          checked={criteria?.hasLimitBreak === false}
          onChange={e =>
            onChange({
              ...criteria,
              hasLimitBreak: false,
            })
          }
        >
          {"Hasn't limit break"}
        </ChoiceInput>

        <ChoiceInput
          type="radio"
          name="has-lb-key"
          checked={criteria?.hasKeyLimitBreak === true}
          onChange={e =>
            onChange({
              ...criteria,
              hasKeyLimitBreak: true,
            })
          }
        >
          {'Has limit break key extension'}
        </ChoiceInput>
        <ChoiceInput
          type="radio"
          name="has-lb-key"
          checked={criteria?.hasKeyLimitBreak === false}
          onChange={e =>
            onChange({
              ...criteria,
              hasKeyLimitBreak: false,
            })
          }
        >
          {"Hasn't limit break key extension"}
        </ChoiceInput>
      </Box>

      <SubTitle fontSize="2" my="2">
        Key extension Finder
      </SubTitle>
      <FilterContainerPanel>
        <ChoiceInput
          type="checkbox"
          name="has-lb-key-cooldown"
          checked={criteria?.hasCooldownExtension === true}
          onChange={e =>
            onChange({
              ...criteria,
              hasCooldownExtension: e.target.checked,
            })
          }
        >
          {'Has cooldown reduction'}
        </ChoiceInput>
        <ChoiceInput
          type="checkbox"
          name="has-lb-key-captain"
          checked={criteria?.hasCaptainReductionExtension === true}
          onChange={e =>
            onChange({
              ...criteria,
              hasCaptainReductionExtension: e.target.checked,
            })
          }
        >
          {'Has captain amelioration'}
        </ChoiceInput>
        <ChoiceInput
          type="checkbox"
          name="has-lb-key-potential"
          checked={criteria?.hasPotentialExtension === true}
          onChange={e =>
            onChange({
              ...criteria,
              hasPotentialExtension: e.target.checked,
            })
          }
        >
          {'Has another potential'}
        </ChoiceInput>
      </FilterContainerPanel>
    </>
  )
}

export function ByLimitBreakBoxDisplayer({
  criteria,
}: SearchRecapItemCriteriaProps<ByLimitBreakCriteria>) {
  if (!criteria) {
    return undefined
  }

  const {
    hasLimitBreak,
    hasKeyLimitBreak,
    hasCooldownExtension,
    hasCaptainReductionExtension,
    hasPotentialExtension,
  } = criteria

  const str = [
    hasLimitBreak !== undefined && (hasLimitBreak ? 'w/ LB' : 'w/o LB'),
    hasKeyLimitBreak !== undefined &&
      (hasKeyLimitBreak ? 'w/ LB key' : 'w/o LB key'),
  ]
    .filter(str => str !== false)
    .join(', ')

  const extStr = [
    hasCooldownExtension !== undefined &&
      (hasCooldownExtension ? 'w/ cooldown' : 'w/o cooldown'),
    hasCaptainReductionExtension !== undefined &&
      (hasCaptainReductionExtension ? 'w/ capt' : 'w/o capt'),
    hasPotentialExtension !== undefined &&
      (hasPotentialExtension ? 'w/ potential' : 'w/o potential'),
  ]
    .filter(str => str !== false)
    .join(', ')

  return (
    <SearchRecapItem title="limit break">
      {str && extStr
        ? `${str}; key ext: ${extStr}`
        : str
          ? str
          : `key ext: ${extStr}`}
    </SearchRecapItem>
  )
}

import ChoiceInput from 'components/forms/ChoiceInput'
import { SupportIcon } from 'components/Icon'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { UserUnit } from 'models/userBox'
import React from 'react'
import { FilterContainerPanel } from '../FilterContainer'

export const SupportStateKeys = [
  'locked',
  'unlocked',
  'unmaxed',
  'maxed',
] as const
export type SupportState = typeof SupportStateKeys[number]

export interface ByUserSupportCriteria {
  state: SupportState
}

const compareLvlToState = (state: SupportState, lvl: number) => {
  switch (state) {
    case 'locked':
      return lvl === 0
    case 'unlocked':
      return lvl > 0
    case 'unmaxed':
      return lvl < 5
    case 'maxed':
      return lvl === 5
    default:
      return true
  }
}

export const ByUserSupportFilter = (criteria: ByUserSupportCriteria) => (
  userUnit: UserUnit,
) =>
  !!userUnit?.support && compareLvlToState(criteria.state, userUnit.support.lvl)

export function ByUserSupportInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserSupportCriteria>) {
  return (
    <FilterContainerPanel>
      <SupportIcon size="2" />
        Support level
      {SupportStateKeys.map(stateKey => (
        <ChoiceInput key={stateKey}
          type="radio"
          name="userunit-support"
          checked={criteria?.state === stateKey}
          onChange={e =>
            onChange({
              state: stateKey,
            })
          }
        >
          {stateKey}
        </ChoiceInput>
      ))}
    </FilterContainerPanel>
  )
}

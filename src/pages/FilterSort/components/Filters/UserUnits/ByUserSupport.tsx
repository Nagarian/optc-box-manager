import { SupportIcon } from 'components/Icon'
import { SearchFilterCriteria, SearchFilterCriteriaInputProps } from 'models/search'
import { UserUnit } from 'models/userBox'
import React from 'react'
import FilterContainer, { FilterContainerPanel } from '../FilterContainer'

export const SupportStateKeys = [
  'locked',
  'unlocked',
  'ongoing',
  'maxed',
] as const
export type SupportState = typeof SupportStateKeys[number]

export interface ByUserSupportCriteria extends SearchFilterCriteria {
  state: SupportState
}

const compareLvlToState = (state: SupportState, lvl: number) => {
  switch (state) {
    case 'locked':
      return lvl === 0
    case 'unlocked':
      return lvl > 0
    case 'ongoing':
      return lvl > 0 && lvl < 5
    case 'maxed':
      return lvl === 5
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
    <FilterContainer
      title="Support"
      onReset={() => onChange(undefined)}
      disableReset={!criteria}
    >
      <FilterContainerPanel>
        <SupportIcon color="specific.support" size="2" title="Support" />
        Support level
        {SupportStateKeys.map(stateKey => (
          <label key={stateKey}>
            <input
              type="radio"
              name="userunit-support"
              checked={criteria?.state === stateKey}
              onChange={e =>
                onChange({
                  state: stateKey,
                })
              }
            />
            {stateKey}
          </label>
        ))}
      </FilterContainerPanel>
    </FilterContainer>
  )
}

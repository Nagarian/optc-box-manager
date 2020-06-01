import { SpecialLvlIcon } from 'components/Icon'
import { UserUnitFilterCriteria } from 'models/search'
import { UserUnit } from 'models/userBox'
import React from 'react'
import FilterContainer, { FilterContainerPanel } from '../FilterContainer'

export const UserSpecialStateKeys = ['ongoing', 'maxed'] as const
export type UserSpecialState = typeof UserSpecialStateKeys[number]

export type ByUserSpecialCriteria = UserUnitFilterCriteria & {
  state: UserSpecialState
}

const specialFilter = (
  value: number,
  max: number,
  state?: UserSpecialState,
) => {
  switch (state) {
    case 'ongoing':
      return value < max
    case 'maxed':
      return value === max
    case undefined:
      return true
  }
}

export const ByUserSpecialFilter = (criteria: ByUserSpecialCriteria) => (
  userUnit: UserUnit,
) =>
  !!userUnit.special &&
  specialFilter(userUnit.special.lvl, userUnit.special.lvlMax, criteria.state)

export type ByUserSpecialInputProps = {
  criteria?: ByUserSpecialCriteria
  onChange: (criteria?: ByUserSpecialCriteria) => void
}

export function ByUserSpecialInput ({
  criteria,
  onChange,
}: ByUserSpecialInputProps) {
  return (
    <FilterContainer
      title="Special"
      onReset={() => onChange(undefined)}
      disableReset={!criteria}
    >
      <FilterContainerPanel>
        <SpecialLvlIcon size="2" />
        Special level
        {UserSpecialStateKeys.map(stateKey => (
          <label key={stateKey}>
            <input
              type="radio"
              name="userunit-special"
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

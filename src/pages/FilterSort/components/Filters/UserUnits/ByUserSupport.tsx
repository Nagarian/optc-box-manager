import Box from 'components/Box'
import { UserUnitFilterCriteria } from 'models/search'
import { UserUnit } from 'models/userBox'
import React from 'react'
import FilterContainer from '../FilterContainer'

export const SupportStateKeys = [
  'locked',
  'unlocked',
  'ongoing',
  'maxed',
] as const
export type SupportState = typeof SupportStateKeys[number]

export type ByUserSupportCriteria = UserUnitFilterCriteria & {
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
) => !!userUnit?.support && compareLvlToState(criteria.state, userUnit.support.lvl)

export type ByUserSupportInputProps = {
  criteria?: ByUserSupportCriteria
  onChange: (criteria?: ByUserSupportCriteria) => void
}

export function ByUserSupportInput ({
  criteria,
  onChange,
}: ByUserSupportInputProps) {
  return (
    <FilterContainer title="Support" onReset={() => onChange(undefined)}>
      <Box display="flex">
        Support level
        {SupportStateKeys.map(stateKey => (
          <label key={stateKey}>
            <input
              type="radio"
              name="userunit-support"
              checked={criteria?.state === stateKey}
              onChange={e => onChange({
                state: stateKey,
              })}
            />
            {stateKey}
          </label>
        ))}
      </Box>
    </FilterContainer>
  )
}

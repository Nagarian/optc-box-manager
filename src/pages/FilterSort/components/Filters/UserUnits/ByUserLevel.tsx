import ChoiceInput from 'components/forms/ChoiceInput'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { UserUnit } from 'models/userBox'
import { BooleanFilterMapper } from 'services/filterHelper'
import { FilterContainerPanel } from '../FilterContainer'

export const UserLevelStateKeys = ['ongoing', 'maxed'] as const
export type UserLevelState = typeof UserLevelStateKeys[number]

export const UserLevelLBStateKeys = [
  'locked',
  'unlocked',
  'unmaxed',
  'maxed',
] as const
export type UserLevelLBState = typeof UserLevelLBStateKeys[number]

export interface ByUserLevelCriteria {
  state?: UserLevelState
  lbState?: UserLevelLBState
  postLbState?: UserLevelState
}

const levelFilter = (value: number, max: number, state?: UserLevelState) => {
  switch (state) {
    case 'ongoing':
      return value < max
    case 'maxed':
      return value >= max
    case undefined:
      return true
  }
}

const levelLBFilter = (
  value: number,
  max: number,
  state?: UserLevelLBState,
) => {
  switch (state) {
    case 'locked':
      return value === 0
    case 'unlocked':
      return value > 0
    case 'unmaxed':
      return value < max
    case 'maxed':
      return value >= max
    case undefined:
      return true
  }
}

const llbFilter = (value: number, max: number, state?: UserLevelState) => {
  switch (state) {
    case 'ongoing':
      return value < max && value >= 99
    case 'maxed':
      return value >= max
    case undefined:
      return true
  }
}

export const ByUserLevelFilter = (criteria: ByUserLevelCriteria) =>
  BooleanFilterMapper<UserUnit>(
    [
      criteria.state,
      userUnit =>
        levelFilter(userUnit.level.lvl, userUnit.unit.maxLevel, criteria.state),
    ],
    [
      criteria.lbState,
      userUnit =>
        levelLBFilter(userUnit.level.limitLvl ?? -1, 5, criteria.lbState),
    ],
    [
      criteria.postLbState,
      userUnit =>
        llbFilter(userUnit.level.lvl, userUnit.level.lvlMax, criteria.postLbState),
    ],
  )

export function ByUserLevelInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserLevelCriteria>) {
  return (
    <>
      <FilterContainerPanel marginY="2">
        Level
        {UserLevelStateKeys.map(stateKey => (
          <ChoiceInput
            key={stateKey}
            type="radio"
            name="userunit-level"
            checked={criteria?.state === stateKey}
            onChange={e =>
              onChange({
                ...criteria,
                state: stateKey,
              })
            }
          >
            {stateKey}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>
      <FilterContainerPanel marginY="2">
        Level Limit Break
        {UserLevelLBStateKeys.map(stateKey => (
          <ChoiceInput
            key={stateKey}
            type="radio"
            name="userunit-levelLB"
            checked={criteria?.lbState === stateKey}
            onChange={e =>
              onChange({
                ...criteria,
                lbState: stateKey,
              })
            }
          >
            {stateKey}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>
      <FilterContainerPanel marginY="2">
        Level (post LLB)
        {UserLevelStateKeys.map(stateKey => (
          <ChoiceInput
            key={stateKey}
            type="radio"
            name="userunit-llb"
            checked={criteria?.postLbState === stateKey}
            onChange={e =>
              onChange({
                ...criteria,
                postLbState: stateKey,
              })
            }
          >
            {stateKey}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>
    </>
  )
}

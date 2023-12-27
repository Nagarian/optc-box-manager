import ChoiceInput from 'components/forms/ChoiceInput'
import { Text } from 'components/Title'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { UserUnit } from 'models/userBox'
import { BooleanFilterMapper } from 'services/filterHelper'
import { FilterContainerPanel } from '../FilterContainer'

export const LimitBreakStateKeys = [
  'locked',
  'unlocked',
  'unmaxed',
  'maxed',
] as const
export type LimitBreakState = typeof LimitBreakStateKeys[number]

export const RainbowStateKeys = ['to rainbow', 'rainbow'] as const
export type RainbowState = typeof RainbowStateKeys[number]

export type ByUserLimitBreakCriteria = {
  lbState?: LimitBreakState
  keyLbState?: LimitBreakState
  rainbowState?: RainbowState
}

function lbStateToCriteria (
  userUnit: UserUnit,
  state: LimitBreakState,
): boolean {
  if (!userUnit.limitBreak) {
    return false
  }

  const { lvl, lvlMax } = userUnit.limitBreak

  switch (state) {
    case 'locked':
      return lvl === 0
    case 'unlocked':
      return lvl > 0
    case 'unmaxed':
      return lvl < lvlMax
    case 'maxed':
      return lvl >= lvlMax
    default:
      return false
  }
}

function keyLbStateToCriteria (
  userUnit: UserUnit,
  state: LimitBreakState,
): boolean {
  if (!userUnit.limitBreak || !userUnit.limitBreak.keyLvlMax) {
    return false
  }

  const { lvl, lvlMax, keyLvlMax } = userUnit.limitBreak

  const unlocked = lvl > lvlMax

  switch (state) {
    case 'locked':
      return !unlocked
    case 'unlocked':
      return unlocked
    case 'unmaxed':
      return unlocked && lvl < keyLvlMax
    case 'maxed':
      return lvl === keyLvlMax
    default:
      return false
  }
}

function isRainbowCriteria (userUnit: UserUnit) {
  if (!userUnit.limitBreak) {
    return false
  }

  const { lvl, lvlMax, keyLvlMax } = userUnit.limitBreak

  if (lvl < lvlMax) {
    return false
  }

  const potentialsMaxed = userUnit.potentials
    .filter(p => !p.keyState)
    .every(p => p.lvl === 5)
  if (lvl >= lvlMax && potentialsMaxed) {
    return true
  }

  const allPotentialMaxed = userUnit.potentials.every(p => p.lvl === 5)
  return lvl === keyLvlMax && allPotentialMaxed
}

export const ByUserLimitBreakFilter = (criteria: ByUserLimitBreakCriteria) =>
  BooleanFilterMapper(
    [
      criteria.lbState,
      (userUnit: UserUnit) => lbStateToCriteria(userUnit, criteria.lbState!),
    ],
    [
      criteria.keyLbState,
      (userUnit: UserUnit) =>
        keyLbStateToCriteria(userUnit, criteria.keyLbState!),
    ],
    [
      criteria.rainbowState,
      (userUnit: UserUnit) => {
        if (!userUnit.limitBreak) {
          return false
        }

        switch (criteria.rainbowState!) {
          case 'rainbow':
            return isRainbowCriteria(userUnit)
          case 'to rainbow':
            return !isRainbowCriteria(userUnit)
          default:
            return false
        }
      },
    ],
  )

export function ByUserLimitBreakInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserLimitBreakCriteria>) {
  return (
    <>
      <FilterContainerPanel marginY="2">
        <Text>Limit Break</Text>
        {LimitBreakStateKeys.map(state => (
          <ChoiceInput key={state}
            type="radio"
            name="uu-lbstate"
            checked={criteria?.lbState === state}
            onChange={e =>
              onChange({
                ...criteria,
                lbState: state,
              })
            }
          >
            {state}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>

      <FilterContainerPanel marginY="2">
        <Text>Keyed Limit Break</Text>
        {LimitBreakStateKeys.map(state => (
          <ChoiceInput key={state}
            type="radio"
            name="uu-keyLbState"
            checked={criteria?.keyLbState === state}
            onChange={e =>
              onChange({
                ...criteria,
                keyLbState: state,
              })
            }
          >
            {state}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>

      <FilterContainerPanel marginY="3">
        <Text>Rainbow</Text>
        {RainbowStateKeys.map(state => (
          <ChoiceInput key={state}
            type="radio"
            name="uu-lb-rainbow"
            checked={criteria?.rainbowState === state}
            onChange={e =>
              onChange({
                ...criteria,
                rainbowState: state,
              })
            }
          >
            {state}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>
    </>
  )
}

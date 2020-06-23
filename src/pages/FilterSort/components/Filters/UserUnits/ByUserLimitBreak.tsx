import { Text } from 'components/Title'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { UserUnit } from 'models/userBox'
import React from 'react'
import { BooleanFilterMapper } from 'services/filterHelper'
import { FilterContainerPanel } from '../FilterContainer'

export const LimitBreakStateKeys = [
  'locked',
  'unlocked',
  'unmaxed',
  'maxed',
  'rainbow',
] as const
export type LimitBreakState = typeof LimitBreakStateKeys[number]

export type ByUserLimitBreakCriteria = {
  lbState?: LimitBreakState
  keyLbState?: LimitBreakState
}

function lbStateToCriteria (userUnit: UserUnit, state: LimitBreakState): boolean {
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
    case 'rainbow':
      return (
        lvl >= lvlMax &&
        userUnit.potentials.filter(p => !p.keyState).every(p => p.lvl === 5)
      )
    default:
      return false
  }
}

function keyLbStateToCriteria (userUnit: UserUnit, state: LimitBreakState): boolean {
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
    case 'rainbow':
      return (
        lvl === keyLvlMax &&
        userUnit.potentials.every(p => p.lvl === 5)
      )
    default:
      return false
  }
}

export const ByUserLimitBreakFilter = (criteria: ByUserLimitBreakCriteria) =>
  BooleanFilterMapper(
    [
      criteria.lbState,
      (userUnit: UserUnit) => lbStateToCriteria(userUnit, criteria.lbState!),
    ],
    [criteria.keyLbState, (userUnit: UserUnit) => keyLbStateToCriteria(userUnit, criteria.keyLbState!)],
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
          <label key={state}>
            <input
              type="radio"
              name="uu-lbstate"
              checked={criteria?.lbState === state ?? false}
              onChange={e =>
                onChange({
                  ...criteria,
                  lbState: state,
                })
              }
            />
            {state}
          </label>
        ))}
      </FilterContainerPanel>

      <FilterContainerPanel marginY="2">
        <Text>Keyed Limit Break</Text>
        {LimitBreakStateKeys.map(state => (
          <label key={state}>
            <input
              type="radio"
              name="uu-keyLbState"
              checked={criteria?.keyLbState === state ?? false}
              onChange={e =>
                onChange({
                  ...criteria,
                  keyLbState: state,
                })
              }
            />
            {state}
          </label>
        ))}
      </FilterContainerPanel>
    </>
  )
}

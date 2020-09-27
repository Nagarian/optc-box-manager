import { PirateFestIcon } from 'components/Icon'
import { SearchFilterCriteria, SearchFilterCriteriaInputProps } from 'models/search'
import { UserUnit } from 'models/userBox'
import React from 'react'
import { BooleanFilterMapper } from 'services/filterHelper'
import { FilterContainerPanel } from '../FilterContainer'

export const UserPirateFestStateKeys = ['ongoing', 'maxed'] as const
export type UserPirateFestState = typeof UserPirateFestStateKeys[number]

export interface ByUserPirateFestCriteria extends SearchFilterCriteria {
  specialLvlState?: UserPirateFestState
  abilityLvlState?: UserPirateFestState
}

const festFilter = (
  value: number | undefined,
  max: number,
  state: UserPirateFestState,
) => {
  if (!value) return false

  switch (state) {
    case 'ongoing':
      return value > 0 && value < max
    case 'maxed':
      return value === max
    case undefined:
      return false
  }
}

export const ByUserPirateFestFilter = (criteria: ByUserPirateFestCriteria) =>
  BooleanFilterMapper<UserUnit>(
    [
      criteria.abilityLvlState,
      (userUnit) => festFilter(userUnit.pirateFest?.abilityLvl, 5, criteria.abilityLvlState!),
    ],
    [
      criteria.specialLvlState,
      (userUnit) => festFilter(userUnit.pirateFest?.specialLvl, 10, criteria.specialLvlState!),
    ],
  )

export function ByUserPirateFestInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserPirateFestCriteria>) {
  return (
    <>
      <FilterContainerPanel>
        <PirateFestIcon size="2" title="Pirate Rumble Special" />
        Special
        {UserPirateFestStateKeys.map(stateKey => (
          <label key={stateKey}>
            <input
              type="radio"
              name="userunit-festSpecial"
              checked={criteria?.specialLvlState === stateKey}
              onChange={e =>
                onChange({
                  ...criteria,
                  specialLvlState: stateKey,
                })
              }
            />
            {stateKey}
          </label>
        ))}
      </FilterContainerPanel>
      <FilterContainerPanel>
        <PirateFestIcon size="2" title="Pirate Rumble Ability" />
        Ability
        {UserPirateFestStateKeys.map(stateKey => (
          <label key={stateKey}>
            <input
              type="radio"
              name="userunit-festAbility"
              checked={criteria?.abilityLvlState === stateKey}
              onChange={e =>
                onChange({
                  ...criteria,
                  abilityLvlState: stateKey,
                })
              }
            />
            {stateKey}
          </label>
        ))}
      </FilterContainerPanel>
    </>
  )
}

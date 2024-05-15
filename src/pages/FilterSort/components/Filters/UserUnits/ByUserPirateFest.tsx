import ChoiceInput from 'components/forms/ChoiceInput'
import {
  PirateFestAbilityIcon,
  PirateFestBothIcon,
  PirateFestSpecialIcon,
} from 'components/Icon'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { UserUnit } from 'models/userBox'
import { BooleanFilterMapper } from 'services/filterHelper'
import { FilterContainerPanel } from '../FilterContainer'

export const UserPirateFestStateKeys = ['ongoing', 'maxed'] as const
export type UserPirateFestState = (typeof UserPirateFestStateKeys)[number]

export interface ByUserPirateFestCriteria {
  specialLvlState?: UserPirateFestState
  abilityLvlState?: UserPirateFestState
  gpLvlState?: UserPirateFestState
}

const festFilter = (
  value: number | undefined,
  max: number,
  state?: UserPirateFestState,
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
      userUnit =>
        festFilter(
          userUnit.pirateFest?.abilityLvl,
          5,
          criteria.abilityLvlState,
        ),
    ],
    [
      criteria.specialLvlState,
      userUnit =>
        festFilter(
          userUnit.pirateFest?.specialLvl,
          10,
          criteria.specialLvlState,
        ),
    ],
    [
      criteria.gpLvlState,
      userUnit =>
        festFilter(userUnit.pirateFest?.gplvl, 5, criteria.gpLvlState),
    ],
  )

export function ByUserPirateFestInput({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserPirateFestCriteria>) {
  return (
    <>
      <FilterContainerPanel>
        <PirateFestSpecialIcon size="2" title="Pirate Rumble Special" />
        Special level
        {UserPirateFestStateKeys.map(stateKey => (
          <ChoiceInput
            key={stateKey}
            type="radio"
            name="userunit-festSpecial"
            checked={criteria?.specialLvlState === stateKey}
            onChange={e =>
              onChange({
                ...criteria,
                specialLvlState: stateKey,
              })
            }
          >
            {stateKey}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>
      <FilterContainerPanel>
        <PirateFestAbilityIcon size="2" title="Pirate Rumble Ability" />
        Ability level
        {UserPirateFestStateKeys.map(stateKey => (
          <ChoiceInput
            key={stateKey}
            type="radio"
            name="userunit-festAbility"
            checked={criteria?.abilityLvlState === stateKey}
            onChange={e =>
              onChange({
                ...criteria,
                abilityLvlState: stateKey,
              })
            }
          >
            {stateKey}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>
      <FilterContainerPanel>
        <PirateFestBothIcon size="2" title="Pirate Rumble Ability" />
        GP level
        {UserPirateFestStateKeys.map(stateKey => (
          <ChoiceInput
            key={stateKey}
            type="radio"
            name="userunit-festGP"
            checked={criteria?.gpLvlState === stateKey}
            onChange={e =>
              onChange({
                ...criteria,
                gpLvlState: stateKey,
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

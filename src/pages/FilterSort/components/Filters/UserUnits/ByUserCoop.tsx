import Box from 'components/Box'
import ChoiceInput from 'components/forms/ChoiceInput'
import { CoopCaptainIcon, CoopSpecialIcon, LuckIcon } from 'components/Icon'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { UserUnit } from 'models/userBox'
import { BooleanFilterMapper } from 'services/filterHelper'
import { FilterContainerPanel } from '../FilterContainer'

export const UserCoopLuckStateKeys = ['ongoing', 'maxed'] as const
export type UserCoopLuckState = (typeof UserCoopLuckStateKeys)[number]

export const UserCoopAbilityStateKeys = [
  'locked',
  'unlocked',
  'unmaxed',
  'maxed',
] as const
export type UserCoopAbilityState = (typeof UserCoopAbilityStateKeys)[number]

export interface ByUserCoopCriteria {
  luckState?: UserCoopLuckState
  captainState?: UserCoopAbilityState
  specialState?: UserCoopAbilityState
}

const luckFilter = (value: number, max: number, state?: UserCoopLuckState) => {
  switch (state) {
    case 'ongoing':
      return value < max
    case 'maxed':
      return value >= max
    case undefined:
      return true
  }
}

const coopAbilityFilter = (
  value: number,
  max: number,
  state?: UserCoopAbilityState,
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

export const ByUserCoopFilter = (criteria: ByUserCoopCriteria) =>
  BooleanFilterMapper<UserUnit>(
    [
      criteria.luckState,
      userUnit => luckFilter(userUnit.coop.luck, 100, criteria.luckState),
    ],
    [
      criteria.captainState,
      userUnit =>
        coopAbilityFilter(userUnit.coop.captain, 5, criteria.captainState),
    ],
    [
      criteria.specialState,
      userUnit =>
        coopAbilityFilter(userUnit.coop.special, 5, criteria.specialState),
    ],
  )

export function ByUserCoopInput({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserCoopCriteria>) {
  return (
    <>
      <FilterContainerPanel marginY="2">
        <Box
          as="span"
          display="grid"
          gridAutoFlow="column"
          placeItems="center"
          gap="3"
        >
          <LuckIcon size="2" />
          Luck
        </Box>
        {UserCoopLuckStateKeys.map(stateKey => (
          <ChoiceInput
            key={stateKey}
            type="radio"
            name="userunit-luckState"
            checked={criteria?.luckState === stateKey}
            onChange={e =>
              onChange({
                ...criteria,
                luckState: stateKey,
              })
            }
          >
            {stateKey}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>
      <FilterContainerPanel marginY="2">
        <CoopCaptainIcon size="2" />
        Coop captain
        {UserCoopAbilityStateKeys.map(stateKey => (
          <ChoiceInput
            key={stateKey}
            type="radio"
            name="userunit-coop-captain"
            checked={criteria?.captainState === stateKey}
            onChange={e =>
              onChange({
                ...criteria,
                captainState: stateKey,
              })
            }
          >
            {stateKey}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>
      <FilterContainerPanel marginY="2">
        <CoopSpecialIcon size="2" />
        Coop special
        {UserCoopAbilityStateKeys.map(stateKey => (
          <ChoiceInput
            key={stateKey}
            type="radio"
            name="userunit-coop-special"
            checked={criteria?.specialState === stateKey}
            onChange={e =>
              onChange({
                ...criteria,
                specialState: stateKey,
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

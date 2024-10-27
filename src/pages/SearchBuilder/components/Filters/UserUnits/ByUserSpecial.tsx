import { ChoiceInput } from 'components/forms/ChoiceInput'
import { SpecialLvlIcon } from 'components/Icon'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { UserUnit } from 'models/userBox'
import {
  SearchRecapItem,
  SearchRecapItemCriteriaProps,
} from '../../BoxDisplayers/SearchRecap/SearchRecapItem'
import { FilterContainerPanel } from '../FilterContainer'

export const UserSpecialStateKeys = ['ongoing', 'maxed'] as const
export type UserSpecialState = (typeof UserSpecialStateKeys)[number]

export interface ByUserSpecialCriteria {
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

export const ByUserSpecialFilter =
  (criteria: ByUserSpecialCriteria) => (userUnit: UserUnit) =>
    !!userUnit.special &&
    specialFilter(userUnit.special.lvl, userUnit.special.lvlMax, criteria.state)

export function ByUserSpecialInput({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserSpecialCriteria>) {
  return (
    <FilterContainerPanel>
      <SpecialLvlIcon size="2" />
      Special level
      {UserSpecialStateKeys.map(stateKey => (
        <ChoiceInput
          key={stateKey}
          type="radio"
          name="userunit-special"
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

export function ByUserSpecialBoxDisplayer({
  criteria,
}: SearchRecapItemCriteriaProps<ByUserSpecialCriteria>) {
  if (!criteria) {
    return undefined
  }

  return (
    <SearchRecapItem title="special">
      <SearchRecapItem title="lvl" icon={SpecialLvlIcon}>
        {criteria.state}
      </SearchRecapItem>
    </SearchRecapItem>
  )
}

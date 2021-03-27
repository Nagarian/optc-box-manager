import ChoiceInput from 'components/forms/ChoiceInput'
import { InkIcon } from 'components/Icon'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { UserUnit } from 'models/userBox'
import { FilterContainerPanel } from '../FilterContainer'

export const InkStateKeys = [
  'locked',
  'level1',
  'level2',
] as const
export type InkState = typeof InkStateKeys[number]

export interface ByUserInkCriteria {
  state: InkState
}

const compareLvlToState = (state: InkState, lvl: number) => {
  switch (state) {
    case 'locked':
      return lvl === 0
    case 'level1':
      return lvl === 1
    case 'level2':
      return lvl === 2
    default:
      return true
  }
}

export const ByUserInkFilter = (criteria: ByUserInkCriteria) => (
  userUnit: UserUnit,
) =>
  !!userUnit?.ink && compareLvlToState(criteria.state, userUnit.ink.lvl)

export function ByUserInkInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserInkCriteria>) {
  return (
    <FilterContainerPanel>
      <InkIcon size="2" />
        Ink level
      {InkStateKeys.map(stateKey => (
        <ChoiceInput key={stateKey}
          type="radio"
          name="userunit-Ink"
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

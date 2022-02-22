import PotentialAbility from 'components/PotentialAbility'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { PotentialKey, Potentials } from 'models/units'
import { UserUnit } from 'models/userBox'
import ImageInput from 'components/forms/ImageInput'
import { FilterContainerPanel } from '../FilterContainer'
import { Text } from 'components/Title'
import ChoiceInput from 'components/forms/ChoiceInput'

export const PotentialStateKeys = [
  'locked',
  'unlocked',
  'ongoing',
  'maxed',
] as const
export type PotentialState = typeof PotentialStateKeys[number]

export type ByUserPotentialCriteria = {
  [key in PotentialKey]?: PotentialState
}

const compareLvlToState = (state: PotentialState, lvl: number) => {
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

export const ByUserPotentialFilter = (criteria: ByUserPotentialCriteria) => (
  userUnit: UserUnit,
) =>
  Object.entries(criteria).some(([potentialKey, potentialState]) =>
    userUnit.potentials.some(
      p => p.type === potentialKey && compareLvlToState(potentialState!, p.lvl),
    ),
  )

export function ByUserPotentialInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserPotentialCriteria>) {
  const selectedPotential =
    criteria && (Object.keys(criteria)[0] as PotentialKey | undefined)
  const selectedState =
    criteria && selectedPotential && criteria[selectedPotential]

  return (
    <>
      <FilterContainerPanel marginBottom="2">
        <Text>State</Text>
        {PotentialStateKeys.map(stateKey => (
          <ChoiceInput key={stateKey}
            type="radio"
            name="userunit-potential-state-chooser"
            checked={selectedState === stateKey}
            onChange={e =>
              onChange({
                [selectedPotential ?? 'Enrage/Reduce Increase Damage Taken duration']: stateKey,
              })
            }
          >
            {stateKey}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>

      {Potentials.map(potential => (
        <ImageInput
          key={potential}
          type="radio"
          name="userunit-potential-chooser"
          checked={selectedPotential === potential}
          onChange={e =>
            onChange({
              [potential]: selectedState ?? 'ongoing',
            })
          }
        >
          <PotentialAbility type={potential} size="3" />
        </ImageInput>
      ))}
    </>
  )
}

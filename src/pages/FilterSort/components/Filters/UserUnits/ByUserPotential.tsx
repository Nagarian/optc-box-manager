import PotentialAbility from 'components/PotentialAbility'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { PotentialKey, Potentials } from 'models/units'
import { UserUnit } from 'models/userBox'
import React from 'react'
import { FilterContainerPanel } from '../FilterContainer'

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

type PotentialStateInputProps = {
  potential: PotentialKey
  state?: PotentialState
  onChange: (state: PotentialState) => void
}
function PotentialStateInput ({
  potential,
  state,
  onChange,
}: PotentialStateInputProps) {
  return (
    <FilterContainerPanel>
      <PotentialAbility type={potential} />
      {PotentialStateKeys.map(stateKey => (
        <label key={stateKey}>
          <input
            type="radio"
            name={`userunit-potentials-${potential}`}
            checked={state === stateKey}
            onChange={e => onChange(stateKey)}
          />
          {stateKey}
        </label>
      ))}
    </FilterContainerPanel>
  )
}

export function ByUserPotentialInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserPotentialCriteria>) {
  return (
    <>
      {Potentials.map(potential => (
        <PotentialStateInput
          key={potential}
          potential={potential}
          state={criteria?.[potential]}
          onChange={state =>
            onChange({
              ...criteria,
              [potential]: state,
            })
          }
        />
      ))}
    </>
  )
}

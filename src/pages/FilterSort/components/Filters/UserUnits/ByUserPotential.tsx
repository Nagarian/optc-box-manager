import PotentialAbility from 'components/PotentialAbility'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { PotentialKey, Potentials } from 'models/units'
import { UserUnit } from 'models/userBox'
import React from 'react'
import { BooleanFilterMapper } from 'services/filterHelper'
import { FilterContainerPanel } from '../FilterContainer'

export const PotentialStateKeys = [
  'locked',
  'unlocked',
  'ongoing',
  'maxed',
] as const
export type PotentialState = typeof PotentialStateKeys[number]

export type ByUserPotentialCriteria = {
  with?: {
    [key in PotentialKey]?: PotentialState
  }
  isRainbow?: boolean
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

export const ByUserPotentialFilter = (criteria: ByUserPotentialCriteria) =>
  BooleanFilterMapper(
    [
      criteria.with,
      (userUnit: UserUnit) =>
        Object.entries(criteria.with ?? {}).some(([potentialKey, potentialState]) =>
          userUnit.potentials.some(
            p =>
              p.type === potentialKey &&
              compareLvlToState(potentialState!, p.lvl),
          ),
        ),
    ],
    [
      criteria.isRainbow,
      (userUnit: UserUnit) => userUnit.potentials.length > 0 && userUnit.potentials.every(p => p.lvl === 5),
    ],
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
      <label>
        <input
          type="checkbox"
          name="uu-israinbow"
          checked={criteria?.isRainbow ?? false}
          onChange={e => onChange({
            ...criteria,
            isRainbow: e.target.checked,
          })}
        />
          is Rainbow
      </label>
      {Potentials.map(potential => (
        <PotentialStateInput
          key={potential}
          potential={potential}
          state={criteria?.with?.[potential]}
          onChange={state =>
            onChange({
              ...criteria,
              with: {
                ...criteria?.with,
                [potential]: state,
              },
            })
          }
        />
      ))}
    </>
  )
}

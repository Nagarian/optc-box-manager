import Box from 'components/Box'
import { UserUnitFilterCriteria } from 'models/search'
import { UserUnit } from 'models/userBox'
import React from 'react'
import FilterContainer from '../FilterContainer'

export const CottonCandyStateKeys = ['none', 'ongoing', 'maxed'] as const
export type CottonCandyState = typeof CottonCandyStateKeys[number]

export const CottonCandyTypeKeys = ['atk', 'hp', 'rcv'] as const
export type CottonCandyType = typeof CottonCandyTypeKeys[number]

export type ByCottonCandyCriteria = UserUnitFilterCriteria & {
  [type in CottonCandyType]?: CottonCandyState
}

const ccFilter = (value: number, state?: CottonCandyState) => {
  switch (state) {
    case 'none':
      return value === 0
    case 'ongoing':
      return value > 0 && value < 100
    case 'maxed':
      return value === 100
    case undefined:
      return true
  }
}

export const ByCottonCandyFilter = (criteria: ByCottonCandyCriteria) => (
  userUnit: UserUnit,
) =>
  ccFilter(userUnit.cc.atk, criteria.atk) &&
  ccFilter(userUnit.cc.hp, criteria.hp) &&
  ccFilter(userUnit.cc.rcv, criteria.rcv)

export type ByCottonCandyInputProps = {
  criteria?: ByCottonCandyCriteria
  onChange: (criteria?: ByCottonCandyCriteria) => void
}

type CottonCandyStateInputProps = {
  type: 'atk' | 'hp' | 'rcv'
  state?: CottonCandyState
  onChange: (state: CottonCandyState) => void
}
function CottonCandyStateInput ({
  type,
  state,
  onChange,
}: CottonCandyStateInputProps) {
  return (
    <Box display="flex">
      {type}
      {CottonCandyStateKeys.map(stateKey => (
        <label key={stateKey}>
          <input
            type="radio"
            name={`userunit-cc-${type}`}
            checked={state === stateKey}
            onChange={e => onChange(stateKey)}
          />
          {stateKey}
        </label>
      ))}
    </Box>
  )
}

export function ByCottonCandyInput ({
  criteria,
  onChange,
}: ByCottonCandyInputProps) {
  return (
    <FilterContainer title="Cotton Candy" onReset={() => onChange(undefined)}>
      {CottonCandyTypeKeys.map(type => (
        <CottonCandyStateInput
          key={type}
          type={type}
          state={criteria?.[type]}
          onChange={state =>
            onChange({
              ...criteria,
              [type]: state,
            })
          }
        />
      ))}
    </FilterContainer>
  )
}

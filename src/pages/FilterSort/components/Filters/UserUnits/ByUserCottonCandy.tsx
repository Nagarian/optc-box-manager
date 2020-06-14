import { CottonCandyIcon } from 'components/Icon'
import {
  SearchFilterCriteria,
  SearchFilterCriteriaInputProps,
} from 'models/search'
import { UserUnit } from 'models/userBox'
import React from 'react'
import { FilterContainerPanel } from '../FilterContainer'

export const CottonCandyStateKeys = ['none', 'unmaxed', 'maxed'] as const
export type CottonCandyState = typeof CottonCandyStateKeys[number]

export const CottonCandyTypeKeys = ['atk', 'hp', 'rcv'] as const
export type CottonCandyType = typeof CottonCandyTypeKeys[number]

export type ByUserCottonCandyCriteria = SearchFilterCriteria & {
  all: CottonCandyState
  by?: {
    [type in CottonCandyType]?: CottonCandyState
  }
}

const ccFilter = (value: number, state?: CottonCandyState, max = 100) => {
  switch (state) {
    case 'none':
      return value === 0
    case 'unmaxed':
      return value < max
    case 'maxed':
      return value === max
    default:
      return true
  }
}

export const ByUserCottonCandyFilter = (
  { all, by = {} }: ByUserCottonCandyCriteria,
) => ({ cc: { atk, hp, rcv } }: UserUnit) =>
  ccFilter(atk, by.atk) &&
  ccFilter(hp, by.hp) &&
  ccFilter(rcv, by.rcv) &&
  ccFilter(atk + hp + rcv, all, 200)

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
  const color = 'specific.cc' + type[0].toUpperCase() + type.slice(1)
  return (
    <FilterContainerPanel>
      <CottonCandyIcon color={color} size={2} title={type} />
      {type.toUpperCase()}
      {CottonCandyStateKeys.map(stateKey => (
        <label key={stateKey}>
          <input
            type="radio"
            name={`userunit-cc-${type}`}
            checked={state === stateKey ?? false}
            onChange={e => onChange(stateKey)}
          />
          {stateKey}
        </label>
      ))}
    </FilterContainerPanel>
  )
}

export function ByUserCottonCandyInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserCottonCandyCriteria>) {
  return (
    <>
      <FilterContainerPanel>
        <CottonCandyIcon size={2} title="All" />
        All +200
        {CottonCandyStateKeys.map(stateKey => (
          <label key={stateKey}>
            <input
              type="radio"
              name="userunit-cc-all"
              checked={criteria?.all === stateKey ?? false}
              onChange={e => onChange({
                ...criteria,
                all: stateKey,
              })}
            />
            {stateKey}
          </label>
        ))}
      </FilterContainerPanel>
      {CottonCandyTypeKeys.map(type => (
        <CottonCandyStateInput
          key={type}
          type={type}
          state={criteria?.by?.[type]}
          onChange={state =>
            onChange({
              ...criteria,
              by: {
                ...criteria?.by,
                [type]: state,
              },
            })
          }
        />
      ))}
    </>
  )
}

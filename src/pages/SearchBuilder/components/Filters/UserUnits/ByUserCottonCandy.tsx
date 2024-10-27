import ChoiceInput from 'components/forms/ChoiceInput'
import { CottonCandyIcon } from 'components/Icon'
import { UserSettingEnhanced, useUserSettings } from 'hooks/useUserSettings'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { CottonCandyType, CottonCandyTypeKeys, UserUnit } from 'models/userBox'
import { BooleanFilterMapper } from 'services/filterHelper'
import {
  SearchRecapItem,
  SearchRecapItemCriteriaProps,
} from '../../BoxDisplayers/SearchRecap/SearchRecapItem'
import { FilterContainerPanel } from '../FilterContainer'

export const CottonCandyStateKeys = ['none', 'unmaxed', 'maxed'] as const
export type CottonCandyState = (typeof CottonCandyStateKeys)[number]

export type ByUserCottonCandyCriteria = {
  all?: CottonCandyState
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
  { ccLimit }: UserSettingEnhanced,
) =>
  BooleanFilterMapper<UserUnit>(
    [
      all,
      ({ cc: { atk, hp, rcv } }) => ccFilter(atk + hp + rcv, all, ccLimit.all),
    ],
    [by.hp, ({ cc: { hp } }) => ccFilter(hp, by.hp, ccLimit.hp)],
    [by.atk, ({ cc: { atk } }) => ccFilter(atk, by.atk, ccLimit.atk)],
    [by.rcv, ({ cc: { rcv } }) => ccFilter(rcv, by.rcv, ccLimit.rcv)],
  )

type CottonCandyStateInputProps = {
  type: 'atk' | 'hp' | 'rcv'
  state?: CottonCandyState
  currentMax: number
  onChange: (state: CottonCandyState) => void
}
function CottonCandyStateInput({
  type,
  state,
  currentMax,
  onChange,
}: CottonCandyStateInputProps) {
  const color = 'specific.cc' + type[0].toUpperCase() + type.slice(1)
  return (
    <FilterContainerPanel>
      <CottonCandyIcon color={color} size={2} />
      {type.toUpperCase()} + {currentMax}
      {CottonCandyStateKeys.map(stateKey => (
        <ChoiceInput
          key={stateKey}
          type="radio"
          name={`userunit-cc-${type}`}
          checked={state === stateKey}
          onChange={e => onChange(stateKey)}
        >
          {stateKey}
        </ChoiceInput>
      ))}
    </FilterContainerPanel>
  )
}

export function ByUserCottonCandyInput({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserCottonCandyCriteria>) {
  const { ccLimit } = useUserSettings()
  return (
    <>
      <FilterContainerPanel>
        <CottonCandyIcon size={2} />
        All +{ccLimit.all}
        {CottonCandyStateKeys.map(stateKey => (
          <ChoiceInput
            key={stateKey}
            type="radio"
            name="userunit-cc-all"
            checked={criteria?.all === stateKey}
            onChange={e =>
              onChange({
                ...criteria,
                all: stateKey,
              })
            }
          >
            {stateKey}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>
      {CottonCandyTypeKeys.map(type => (
        <CottonCandyStateInput
          key={type}
          type={type}
          state={criteria?.by?.[type]}
          currentMax={ccLimit[type]}
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

export function ByUserCottonCandyBoxDisplayer({
  criteria,
}: SearchRecapItemCriteriaProps<ByUserCottonCandyCriteria>) {
  if (!criteria) {
    return undefined
  }

  return (
    <SearchRecapItem title="cotton candy">
      <SearchRecapItem icon={CottonCandyIcon} title="All">
        {criteria.all}
      </SearchRecapItem>
      <SearchRecapItem
        icon={CottonCandyIcon}
        title="ATK"
        color="specific.ccAtk"
      >
        {criteria.by?.atk}
      </SearchRecapItem>
      <SearchRecapItem icon={CottonCandyIcon} title="HP" color="specific.ccHp">
        {criteria.by?.hp}
      </SearchRecapItem>
      <SearchRecapItem
        icon={CottonCandyIcon}
        title="RCV"
        color="specific.ccRcv"
      >
        {criteria.by?.rcv}
      </SearchRecapItem>
    </SearchRecapItem>
  )
}

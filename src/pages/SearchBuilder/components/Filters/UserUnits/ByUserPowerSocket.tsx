import { Box } from 'components/Box'
import { ChoiceInput } from 'components/forms/ChoiceInput'
import { ImageInput } from 'components/forms/ImageInput'
import { PowerSocket } from 'components/PowerSocket'
import { Text } from 'components/Title'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { PowerSocketKey, PowerSockets } from 'models/units'
import { UserUnit } from 'models/userBox'
import { BooleanFilterMapper } from 'services/filterHelper'
import {
  SearchRecapItem,
  SearchRecapItemCriteriaProps,
} from '../../BoxDisplayers/SearchRecap/SearchRecapItem'
import { FilterContainerPanel } from '../FilterContainer'

const PowerSocketStateKeys = ['hasnt', 'has', 'ongoing', 'maxed'] as const
type PowerSocketState = (typeof PowerSocketStateKeys)[number]

const AllPowerSocketStateKeys = ['has empty', 'ongoing', 'maxed'] as const
type AllPowerSocketState = (typeof AllPowerSocketStateKeys)[number]

export type ByUserPowerSocketCriteria = {
  all?: AllPowerSocketState
  state?: {
    [key in PowerSocketKey]?: PowerSocketState
  }
}
export const ByUserPowerSocketFilter = (criteria: ByUserPowerSocketCriteria) =>
  BooleanFilterMapper(
    [
      criteria.all === 'has empty',
      (userUnit: UserUnit) =>
        userUnit.sockets.length > 0 && userUnit.sockets.some(s => s.lvl === 0),
    ],
    [
      criteria.all === 'ongoing',
      (userUnit: UserUnit) =>
        userUnit.sockets.length > 0 &&
        userUnit.sockets.some(s => s.lvl < 5 && s.lvl > 0),
    ],
    [
      criteria.all === 'maxed',
      (userUnit: UserUnit) =>
        userUnit.sockets.length > 0 && userUnit.sockets.every(s => s.lvl === 5),
    ],
    [
      criteria.state,
      ({ sockets }: UserUnit) =>
        criteria.state
          ? Object.entries(criteria.state).every(([socketType, state]) => {
              switch (state) {
                case 'hasnt':
                  return sockets.every(s => s.type !== socketType)
                case 'has':
                  return sockets.some(s => s.type === socketType)
                case 'ongoing':
                  return sockets.some(s => s.type === socketType && s.lvl < 5)
                case 'maxed':
                  return sockets.some(s => s.type === socketType && s.lvl === 5)
                default:
                  return false
              }
            })
          : false,
    ],
  )

export function ByUserPowerSocketInput({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUserPowerSocketCriteria>) {
  const selectedPowerSocket =
    criteria?.state &&
    (Object.keys(criteria.state)[0] as PowerSocketKey | undefined)

  const selectedState =
    criteria?.state &&
    selectedPowerSocket &&
    criteria.state[selectedPowerSocket]

  const trigger = (
    socketType: PowerSocketKey | null,
    state: PowerSocketState | null,
  ) => {
    if (!socketType && !selectedPowerSocket) {
      return
    }

    const newState = Object.keys(criteria?.state ?? {}).reduce(
      (acc, key) => ({
        ...acc,
        [key]: state ?? selectedState,
      }),
      {},
    ) as Record<PowerSocketKey, PowerSocketState>

    if (socketType) {
      newState[socketType] = state ?? selectedState ?? 'has'
    }

    onChange({
      ...criteria,
      state: newState,
    })
  }

  return (
    <>
      <FilterContainerPanel marginBottom="2">
        <Text>All</Text>
        {AllPowerSocketStateKeys.map(stateKey => (
          <ChoiceInput
            key={stateKey}
            type="radio"
            name="userunit-allpowersocket-state"
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

      <FilterContainerPanel marginBottom="2">
        <Text>State</Text>
        {PowerSocketStateKeys.map(stateKey => (
          <ChoiceInput
            key={stateKey}
            type="radio"
            name="userunit-powersocket-state-chooser"
            checked={selectedState === stateKey}
            onChange={e => trigger(null, stateKey)}
          >
            {stateKey}
          </ChoiceInput>
        ))}
      </FilterContainerPanel>

      {PowerSockets.map(socketType => (
        <ImageInput
          key={socketType}
          type="checkbox"
          name="userunit-powersocket-chooser"
          checked={!!criteria?.state?.[socketType]}
          onChange={e => trigger(socketType, null)}
        >
          <PowerSocket type={socketType} size="3" />
        </ImageInput>
      ))}
    </>
  )
}

export function ByUserPowerSocketBoxDisplayer({
  criteria,
}: SearchRecapItemCriteriaProps<ByUserPowerSocketCriteria>) {
  if (!criteria) {
    return undefined
  }

  return (
    <SearchRecapItem title="sockets">
      <SearchRecapItem title="all">{criteria.all}</SearchRecapItem>
      {criteria.state &&
        Object.entries(criteria.state).map(([socketType, state]) => (
          <Box
            as="p"
            key={socketType}
            display="inline-flex"
            alignItems="center"
            gap="1"
          >
            <PowerSocket type={socketType as PowerSocketKey} size="2.5em" />
            {state}
          </Box>
        ))}
    </SearchRecapItem>
  )
}

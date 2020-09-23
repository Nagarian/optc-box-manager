import Box from 'components/Box'
import InfoDisplayer from 'components/CharacterBox/components/InfoDisplayer'
import { PirateFestIcon } from 'components/Icon'
import Progression from 'components/Progression'
import { Text } from 'components/Title'
import React from 'react'
import { SearchDisplayerInputProps, SearchDisplayerProps } from '.'
import { FilterContainerPanel } from '../Filters/FilterContainer'

const PirateFestDisplayerOptionTypes = ['both', 'special', 'ability'] as const
type PirateFestDisplayerOptionType = typeof PirateFestDisplayerOptionTypes[number]

export type PirateFestDisplayerOption = {
  type: PirateFestDisplayerOptionType
}

export default function PirateFestDisplayer ({
  userUnit: {
    pirateFest,
  },
  options,
}: SearchDisplayerProps<PirateFestDisplayerOption>) {
  if (!pirateFest || !options) return null

  if (options.type === 'both') {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <Box
          as="span"
          display="flex"
          flexDirection="column"
        >
          <PirateFestIcon size="1" />
          <Text color="white">{pirateFest.specialLvl}</Text>
        </Box>
        <Box
          as="span"
          display="flex"
          flexDirection="column"
        >
          <PirateFestIcon size="1" />
          <Text color="white">{pirateFest.abilityLvl}</Text>
        </Box>
      </InfoDisplayer>
    )
  }

  if (options.type === 'ability' && pirateFest.abilityLvl) {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <PirateFestIcon size="1" />
        <Progression value={pirateFest.abilityLvl} max={5} color="white" />
      </InfoDisplayer>
    )
  }

  if (options.type === 'special' && pirateFest.specialLvl) {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <PirateFestIcon size="1" />
        <Progression value={pirateFest.specialLvl} max={10} color="white" />
      </InfoDisplayer>
    )
  }

  return null
}

export function PirateFestDisplayerInput ({
  options,
  onChange,
}: SearchDisplayerInputProps<PirateFestDisplayerOption>) {
  return (
    <FilterContainerPanel margin="4">
      {PirateFestDisplayerOptionTypes.map(stateKey => (
        <label key={stateKey}>
          <input
            type="radio"
            name="displayer-fest"
            checked={options?.type === stateKey ?? false}
            onChange={e => onChange({
              type: stateKey,
            })}
          />
          {stateKey}
        </label>
      ))}
    </FilterContainerPanel>
  )
}

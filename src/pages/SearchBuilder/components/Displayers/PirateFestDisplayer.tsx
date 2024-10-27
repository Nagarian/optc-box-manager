import { Box } from 'components/Box'
import { InfoDisplayer } from 'components/CharacterBox/components/InfoDisplayer'
import { ChoiceInput } from 'components/forms/ChoiceInput'
import {
  PirateFestAbilityIcon,
  PirateFestBothIcon,
  PirateFestSpecialIcon,
} from 'components/Icon'
import { Progression } from 'components/Progression'
import { Text } from 'components/Title'
import { SearchOptionInputProps } from 'models/search'
import { FilterContainerPanel } from '../Filters/FilterContainer'
import { SearchDisplayerProps } from '.'

const PirateFestDisplayerOptionTypes = [
  'all',
  'special',
  'ability',
  'gp',
] as const
export type PirateFestDisplayerOptionType =
  (typeof PirateFestDisplayerOptionTypes)[number]

export type PirateFestDisplayerOption = {
  type: PirateFestDisplayerOptionType
}

export function PirateFestDisplayer({
  userUnit: { pirateFest },
  options,
}: SearchDisplayerProps<PirateFestDisplayerOption>) {
  if (!pirateFest || !options) return null

  if (options.type === 'all') {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom" anchorZ="top">
        <Box as="span" display="flex" flexDirection="column">
          <PirateFestSpecialIcon size="1" />
          <Text color="white">{pirateFest.specialLvl}</Text>
        </Box>
        <Box as="span" display="flex" flexDirection="column">
          <PirateFestAbilityIcon size="1" />
          <Text color="white">{pirateFest.abilityLvl}</Text>
        </Box>
        {pirateFest.gplvl && (
          <Box as="span" display="flex" flexDirection="column">
            <PirateFestBothIcon size="1" />
            <Text color="white">{pirateFest.gplvl}</Text>
          </Box>
        )}
      </InfoDisplayer>
    )
  }

  if (options.type === 'ability' && pirateFest.abilityLvl) {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <PirateFestAbilityIcon size="1" />
        <Progression value={pirateFest.abilityLvl} max={5} color="white" />
      </InfoDisplayer>
    )
  }

  if (options.type === 'special' && pirateFest.specialLvl) {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <PirateFestSpecialIcon size="1" />
        <Progression value={pirateFest.specialLvl} max={10} color="white" />
      </InfoDisplayer>
    )
  }

  if (options.type === 'gp' && pirateFest.gplvl) {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <PirateFestBothIcon size="1" />
        <Progression value={pirateFest.gplvl} max={5} color="white" />
      </InfoDisplayer>
    )
  }

  return null
}

export function PirateFestDisplayerInput({
  options,
  onChange,
}: SearchOptionInputProps<PirateFestDisplayerOption>) {
  return (
    <FilterContainerPanel>
      {PirateFestDisplayerOptionTypes.map(stateKey => (
        <ChoiceInput
          key={stateKey}
          type="radio"
          name="displayer-fest"
          checked={options?.type === stateKey}
          onChange={e =>
            onChange({
              type: stateKey,
            })
          }
        >
          {stateKey}
        </ChoiceInput>
      ))}
    </FilterContainerPanel>
  )
}

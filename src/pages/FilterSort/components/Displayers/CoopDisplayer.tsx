import Box from 'components/Box'
import InfoDisplayer from 'components/CharacterBox/components/InfoDisplayer'
import ChoiceInput from 'components/forms/ChoiceInput'
import { CoopCaptainIcon, CoopSpecialIcon, LockIcon } from 'components/Icon'
import { Luck } from 'components/Luck'
import Progression from 'components/Progression'
import { Text } from 'components/Title'
import { FilterContainerPanel } from '../Filters/FilterContainer'
import { SearchDisplayerInputProps, SearchDisplayerProps } from '.'

const coopDisplayerOptionTypes = ['luck', 'captain', 'special', 'both'] as const
export type CoopDisplayerOptionType = (typeof coopDisplayerOptionTypes)[number]

export type CoopDisplayerOption = {
  type: CoopDisplayerOptionType
}

export default function CoopDisplayer({
  userUnit: {
    coop: { captain, luck, special },
  },
  options,
}: SearchDisplayerProps<CoopDisplayerOption>) {
  if (!options) return null

  if (options.type === 'luck') {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <Luck lvl={luck} />
      </InfoDisplayer>
    )
  }

  if (options.type === 'both') {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom" anchorZ="top">
        <Box as="span" display="flex" flexDirection="column">
          <CoopCaptainIcon size="1" />
          <Text color="white">{special}</Text>
        </Box>
        <Box as="span" display="flex" flexDirection="column">
          <CoopSpecialIcon size="1" />
          <Text color="white">{special}</Text>
        </Box>
      </InfoDisplayer>
    )
  }

  if (options.type === 'captain') {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <CoopCaptainIcon size="1" />
        {captain > 0 ? (
          <Progression value={captain} max={5} />
        ) : (
          <LockIcon size="0" mt="1" />
        )}
      </InfoDisplayer>
    )
  }

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom">
      <CoopSpecialIcon size="1" />
      {special > 0 ? (
        <Progression value={special} max={5} />
      ) : (
        <LockIcon size="0" mt="1" />
      )}
    </InfoDisplayer>
  )
}

export function CoopDisplayerInput({
  options,
  onChange,
}: SearchDisplayerInputProps<CoopDisplayerOption>) {
  return (
    <FilterContainerPanel margin="4">
      {coopDisplayerOptionTypes.map(stateKey => (
        <ChoiceInput
          key={stateKey}
          type="radio"
          name="displayer-coop"
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

import InfoDisplayer from 'components/CharacterBox/components/InfoDisplayer'
import ChoiceInput from 'components/forms/ChoiceInput'
import { LevelTextIcon } from 'components/Icon'
import { LevelLB } from 'components/LevelLB'
import Progression from 'components/Progression'
import { Text } from 'components/Title'
import { SearchDisplayerInputProps, SearchDisplayerProps } from '.'
import { FilterContainerPanel } from '../Filters/FilterContainer'

const LevelDisplayerOptionTypes = [
  'level',
  'level max',
  'progression',
  'level LB',
] as const
export type LevelDisplayerOptionType = typeof LevelDisplayerOptionTypes[number]

export type LevelDisplayerOption = {
  type: LevelDisplayerOptionType
}

export default function LevelDisplayer ({
  userUnit: { level },
  options,
}: SearchDisplayerProps<LevelDisplayerOption>) {
  if (!level || !options) return null

  if (options.type === 'level') {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <LevelTextIcon />
        <Text color={level.lvl > 99 ? 'red' : 'white'}>{level.lvl}</Text>
      </InfoDisplayer>
    )
  }

  if (options.type === 'level max') {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <LevelTextIcon />
        <Text color={level.lvl > 99 ? 'red' : 'white'}>{level.lvlMax}</Text>
      </InfoDisplayer>
    )
  }

  if (options.type === 'progression') {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <LevelTextIcon />
        <Progression
          value={level.lvl}
          max={level.lvlMax}
          color="white"
          isExtended={level.lvl > 99}
        />
      </InfoDisplayer>
    )
  }

  if (
    options.type === 'level LB' &&
    level.limitLvl !== undefined &&
    level.limitStepLvl !== undefined
  ) {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <LevelLB
          limitLvl={level.limitLvl}
          limitStepLvl={level.limitStepLvl}
        />
      </InfoDisplayer>
    )
  }

  return null
}

export function LevelDisplayerInput ({
  options,
  onChange,
}: SearchDisplayerInputProps<LevelDisplayerOption>) {
  return (
    <FilterContainerPanel margin="4">
      {LevelDisplayerOptionTypes.map(stateKey => (
        <ChoiceInput
          key={stateKey}
          type="radio"
          name="displayer-fest"
          checked={options?.type === stateKey ?? false}
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

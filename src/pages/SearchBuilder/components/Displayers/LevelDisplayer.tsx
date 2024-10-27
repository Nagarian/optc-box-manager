import InfoDisplayer from 'components/CharacterBox/components/InfoDisplayer'
import ChoiceInput from 'components/forms/ChoiceInput'
import { LevelTextIcon } from 'components/Icon'
import { LevelLB } from 'components/LevelLB'
import Progression from 'components/Progression'
import { Text } from 'components/Title'
import { SearchOptionInputProps } from 'models/search'
import { FilterContainerPanel } from '../Filters/FilterContainer'
import { SearchDisplayerProps } from '.'

const LevelDisplayerOptionTypes = [
  'level',
  'level max',
  'progression',
  'level LB',
] as const
export type LevelDisplayerOptionType =
  (typeof LevelDisplayerOptionTypes)[number]

export type LevelDisplayerOption = {
  type: LevelDisplayerOptionType
}

export default function LevelDisplayer({
  userUnit: { level },
  options,
}: SearchDisplayerProps<LevelDisplayerOption>) {
  if (!level || !options) return null

  if (options.type === 'level max') {
    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <LevelTextIcon />
        <Text color={level.lvlMax > 99 ? 'red' : 'white'}>{level.lvlMax}</Text>
      </InfoDisplayer>
    )
  }

  if (options.type === 'level LB') {
    if (level.limitLvl === undefined || level.limitStepLvl === undefined) {
      return null
    }

    return (
      <InfoDisplayer anchorX="middle" anchorY="bottom">
        <LevelLB limitLvl={level.limitLvl} limitStepLvl={level.limitStepLvl} />
      </InfoDisplayer>
    )
  }

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom">
      <LevelTextIcon />
      <Progression
        value={level.lvl}
        max={level.lvlMax}
        color="white"
        variant={options.type === 'progression' ? 'normal' : 'no-max'}
        isExtended={level.lvl > 99}
      />
    </InfoDisplayer>
  )
}

export function LevelDisplayerInput({
  options,
  onChange,
}: SearchOptionInputProps<LevelDisplayerOption>) {
  return (
    <FilterContainerPanel>
      {LevelDisplayerOptionTypes.map(stateKey => (
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

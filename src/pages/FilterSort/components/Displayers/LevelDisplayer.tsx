import styled from '@emotion/styled'
import InfoDisplayer from 'components/CharacterBox/components/InfoDisplayer'
import ChoiceInput from 'components/forms/ChoiceInput'
import { LevelTextIcon } from 'components/Icon'
import Progression from 'components/Progression'
import { Text } from 'components/Title'
import { SearchDisplayerInputProps, SearchDisplayerProps } from '.'
import { FilterContainerPanel } from '../Filters/FilterContainer'
import LevelLimitBreakImg from './images/level-limitbreak.png'

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

const stepMax = [1, 1, 2, 2, 3]
const stepLevelMax = [0, 0, 0, 1, 0, 1, 0, 1, 2]

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
      <LevelLimitBreakDisplayer anchorX="middle" anchorY="bottom">
        <Text color={level.limitLvl === 5 ? 'primaryText' : 'white'} mr="1">
          {level.limitLvl}
        </Text>
        <Progression
          value={stepLevelMax[level.limitStepLvl]}
          max={stepMax[level.limitLvl]}
          color="white"
        />
      </LevelLimitBreakDisplayer>
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

const LevelLimitBreakDisplayer = styled(InfoDisplayer)`
  background-image: url(${LevelLimitBreakImg});
  background-size: contain;
`

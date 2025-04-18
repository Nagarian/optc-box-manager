import { Box } from 'components/Box'
import { ImageInput } from 'components/forms/ImageInput'
import { InfoDisplayer } from 'components/InfoDisplayer'
import { PotentialAbility } from 'components/PotentialAbility'
import { Progression } from 'components/Progression'
import { Text } from 'components/Title'
import { SearchOptionInputProps } from 'models/search'
import { PotentialKey, Potentials } from 'models/units'
import { SearchDisplayerProps } from '.'

export function PotentialsDisplayer({
  userUnit: { potentials },
}: SearchDisplayerProps<never>) {
  if (!Potentials.length) return null

  return (
    <>
      <InfoDisplayer anchorX="left" anchorY="bottom" anchorZ="top">
        {potentials.map(potential => (
          <Box
            as="span"
            display="flex"
            flexDirection="column"
            key={potential.type}
          >
            <PotentialAbility size="1" hideChrome type={potential.type} />
            <Text color="white">{potential.lvl}</Text>
          </Box>
        ))}
      </InfoDisplayer>
    </>
  )
}

export type SpecificPotentialDisplayerOption = {
  type: PotentialKey
}

export function SpecificPotentialDisplayer({
  userUnit: { potentials },
  options,
}: SearchDisplayerProps<SpecificPotentialDisplayerOption>) {
  if (!potentials || !options?.type) return null
  const userPotential = potentials.find(p => p.type === options.type)
  if (!userPotential) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom" anchorZ="top">
      <PotentialAbility size="1" type={userPotential.type} hideChrome />
      <Progression value={userPotential.lvl} max={5} color="white" />
    </InfoDisplayer>
  )
}

export function SpecificPotentialDisplayerInput({
  options,
  onChange,
}: SearchOptionInputProps<SpecificPotentialDisplayerOption>) {
  return (
    <Box display="flex" flexWrap="wrap">
      {Potentials.map(potential => (
        <ImageInput
          key={potential}
          type="radio"
          name="potentials-displayer"
          checked={options?.type === potential}
          onChange={e =>
            onChange({
              type: potential,
            })
          }
        >
          <PotentialAbility type={potential} size="3" />
        </ImageInput>
      ))}
    </Box>
  )
}

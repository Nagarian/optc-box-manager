import Box from 'components/Box'
import PotentialAbility from 'components/PotentialAbility'
import Progression from 'components/Progression'
import { Text } from 'components/Title'
import { PotentialKey, Potentials } from 'models/units'
import { UserUnitPotentialAbility } from 'models/userBox'
import React from 'react'
import InfoDisplayer from './InfoDisplayer'

type PotentialsDisplayerProps = {
  potentials?: UserUnitPotentialAbility[]
}
export default function PotentialsDisplayer ({
  potentials,
}: PotentialsDisplayerProps) {
  if (!potentials || !Potentials.length) return null

  return (
    <>
      <InfoDisplayer anchorX="left" anchorY="bottom">
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

export function PotentialDisplayer ({
  potentials,
  type,
}: PotentialsDisplayerProps & { type: PotentialKey }) {
  if (!potentials) return null
  const userPotential = potentials.find(p => p.type === type)
  if (!userPotential) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom">
      <PotentialAbility size="1" type={userPotential.type} hideChrome />
      <Progression value={userPotential.lvl} max={5} color="white" />
    </InfoDisplayer>
  )
}

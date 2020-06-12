import { SpecialLvlIcon } from 'components/Icon'
import Progression from 'components/Progression'
import { UserUnitSpecial } from 'models/userBox'
import React from 'react'
import InfoDisplayer from './InfoDisplayer'

type SpecialLevelDisplayerProps = {
  special?: UserUnitSpecial
}
export default function SpecialLevelDisplayer ({
  special,
}: SpecialLevelDisplayerProps) {
  if (!special) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom">
      <SpecialLvlIcon size="1" />
      <Progression value={special.lvl} max={special.lvlMax} color="white" />
    </InfoDisplayer>
  )
}

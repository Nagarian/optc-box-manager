import InfoDisplayer from 'components/CharacterBox/components/InfoDisplayer'
import { SpecialLvlIcon } from 'components/Icon'
import Progression from 'components/Progression'
import React from 'react'
import { SearchDisplayerProps } from '.'

export default function SpecialLevelDisplayer ({
  userUnit: {
    special,
  },
}: SearchDisplayerProps) {
  if (!special) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom">
      <SpecialLvlIcon size="1" />
      <Progression value={special.lvl} max={special.lvlMax} color="white" />
    </InfoDisplayer>
  )
}

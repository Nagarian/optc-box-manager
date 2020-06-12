import { SupportIcon } from 'components/Icon'
import Progression from 'components/Progression'
import React from 'react'
import { SearchDisplayerProps } from '.'
import InfoDisplayer from '../../../../components/CharacterBox/components/InfoDisplayer'

export default function SupportDisplayer ({
  userUnit: {
    support,
  },
}: SearchDisplayerProps) {
  if (!support || support.lvl === 0) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom">
      <SupportIcon size="1" />
      <Progression value={support.lvl} max={5} color="white" />
    </InfoDisplayer>
  )
}

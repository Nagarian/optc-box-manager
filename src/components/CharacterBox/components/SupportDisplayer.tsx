import { SupportIcon } from 'components/Icon'
import Progression from 'components/Progression'
import { UserUnitSupport } from 'models/userBox'
import React from 'react'
import InfoDisplayer from './InfoDisplayer'

type SupportDisplayerProps = {
  support?: UserUnitSupport
}
export default function SupportDisplayer ({
  support,
}: SupportDisplayerProps) {
  if (!support || support.lvl === 0) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom">
      <SupportIcon size="1" />
      <Progression value={support.lvl} max={5} color="white" />
    </InfoDisplayer>
  )
}

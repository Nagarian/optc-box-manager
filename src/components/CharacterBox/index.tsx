import React from 'react'
import { ExtendedUnit } from 'models/units'
import Image from 'components/Image'

type CharacterBoxProps = {
  unit: ExtendedUnit
}

export default function CharacterBox ({
  unit,
}: CharacterBoxProps) {
  return (
    <Image
      src={unit.images.thumbnail}
      alt={unit.name}
      title={unit.name}
      width="60"
      height="60"
    />
  )
}

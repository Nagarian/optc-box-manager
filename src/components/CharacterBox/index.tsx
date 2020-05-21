import Button from 'components/Button'
import Image from 'components/Image'
import { ExtendedUnit } from 'models/units'
import React from 'react'

type CharacterBoxProps = {
  unit: ExtendedUnit
  onClick?: (unit: ExtendedUnit) => void
}

export default function CharacterBox ({ unit, onClick }: CharacterBoxProps) {
  return (
    <Button
      backgroundColor="primary"
      px="0"
      py="0"
      // m="1"
      onClick={() => onClick?.(unit)}
    >
      <Image
        src={unit.images.thumbnail}
        alt={unit.name}
        title={unit.name}
        size="4"
      />
    </Button>
  )
}

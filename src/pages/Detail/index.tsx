import Popup from 'components/Popup'
import { Title } from 'components/Title'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import React from 'react'
import { ImageFull } from './styled'

type DetailProps = {
  userUnit?: UserUnit
  unit: ExtendedUnit
  onCancel: () => void
  onValidate: (updated: UserUnit) => void
}

export default function Detail ({
  onCancel,
  onValidate,
  unit,
  userUnit,
}: DetailProps) {
  if (!userUnit) {
    return null
  }

  const { potentials, special, support, cc } = userUnit

  return (
    <Popup onCancel={onCancel} onValidate={() => onValidate(userUnit)}>
      <ImageFull
        src={unit.images.full}
        alt={unit.name}
      />
      <Title fontSize="0">{unit.name}</Title>
    </Popup>
  )
}

import CottonCandyInput from 'components/forms/CottonCandyInput'
import Popup from 'components/Popup'
import { SubTitle, Title } from 'components/Title'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import React, { useState } from 'react'
import { ImageFull } from './styled'

type DetailProps = {
  userUnit: UserUnit
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
  const { potentials, special, support, cc } = userUnit

  const [rcv, setRcv] = useState<number>(cc.rcv)
  const [hp, setHp] = useState<number>(cc.hp)
  const [atk, setAtk] = useState<number>(cc.atk)

  return (
    <Popup
      onCancel={onCancel}
      onValidate={() =>
        onValidate({
          ...userUnit!,
          cc: {
            rcv,
            hp,
            atk,
          },
        })
      }
    >
      <ImageFull src={unit.images.full} alt={unit.name} />
      <Title fontSize="0">{unit.name}</Title>

      <SubTitle>Cotton Candies</SubTitle>
      <label>
        <CottonCandyInput
          name="atk"
          variant="atk"
          value={atk}
          onChange={e => setAtk(Number(e.target.value))}
        />
        {atk}
      </label>
      <label>
        <CottonCandyInput
          name="rcv"
          variant="hp"
          value={hp}
          onChange={e => setHp(Number(e.target.value))}
        />
        {hp}
      </label>
      <label>
        <CottonCandyInput
          name="rcv"
          variant="rcv"
          value={rcv}
          onChange={e => setRcv(Number(e.target.value))}
        />
        {rcv}
      </label>
    </Popup>
  )
}

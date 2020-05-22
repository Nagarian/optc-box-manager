import CottonCandyInput from 'components/forms/CottonCandyInput'
import PotentialAbilityInput from 'components/forms/PotentialAbilityInput'
import SupportInput from 'components/forms/SupportInput'
import Popup from 'components/Popup'
import { SubTitle, Title } from 'components/Title'
import { ExtendedUnit } from 'models/units'
import { UserUnit, UserUnitPotentialAbility } from 'models/userBox'
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
  const { potentials, special, support: sup, cc } = userUnit

  const [rcv, setRcv] = useState<number>(cc.rcv)
  const [hp, setHp] = useState<number>(cc.hp)
  const [atk, setAtk] = useState<number>(cc.atk)
  const [support, setSupport] = useState<number | undefined>(sup?.lvl)

  const [potential1, setPotential1] = useState<UserUnitPotentialAbility>(
    potentials[0],
  )
  const [potential2, setPotential2] = useState<UserUnitPotentialAbility>(
    potentials[1],
  )
  const [potential3, setPotential3] = useState<UserUnitPotentialAbility>(
    potentials[2],
  )

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
          potentials: [potential1, potential2, potential3].filter(Boolean),
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

      <SubTitle>Potential Abilities</SubTitle>
      {potential1 && (
        <label>
          <PotentialAbilityInput
            name={potential1.type}
            value={potential1.lvl}
            variant={potential1.type}
            onChange={e =>
              setPotential1({
                lvl: Number(e.target.value),
                type: potential1.type,
              })
            }
          />
          {potential1.lvl}
        </label>
      )}
      {potential2 && (
        <label>
          <PotentialAbilityInput
            name={potential2.type}
            value={potential2.lvl}
            variant={potential2.type}
            onChange={e =>
              setPotential2({
                lvl: Number(e.target.value),
                type: potential2.type,
              })
            }
          />
          {potential2.lvl}
        </label>
      )}
      {potential3 && (
        <label>
          <PotentialAbilityInput
            name={potential3.type}
            value={potential3.lvl}
            variant={potential3.type}
            onChange={e =>
              setPotential3({
                lvl: Number(e.target.value),
                type: potential3.type,
              })
            }
          />
          {potential3.lvl}
        </label>
      )}

      <SubTitle>Support</SubTitle>
      {support !== undefined && (
        <label>
          <SupportInput
            name="support"
            value={support}
            onChange={e => setSupport(Number(e.target.value))}
          />
          {support}
        </label>
      )}

    </Popup>
  )
}

import Button from 'components/Button'
import ExpansionPanel from 'components/ExpansionPanel'
import CottonCandyInput from 'components/forms/CottonCandyInput'
import PotentialAbilityInput from 'components/forms/PotentialAbilityInput'
import SpecialLevelInput from 'components/forms/SpecialLevelInput'
import SupportInput from 'components/forms/SupportInput'
import Popup from 'components/Popup'
import { ExtendedUnit } from 'models/units'
import { UserUnit, UserUnitPotentialAbility } from 'models/userBox'
import React, { useState } from 'react'
import RecapBox from './components/RecapBox'

type DetailProps = {
  userUnit: UserUnit
  unit: ExtendedUnit
  onCancel: () => void
  onValidate: (updated: UserUnit) => void
  onDelete: (id: string) => void
}

export default function Detail ({
  onCancel,
  onValidate,
  unit,
  userUnit,
  onDelete,
}: DetailProps) {
  const { potentials, special, support: sup, cc } = userUnit

  const [specialLvl, setSpecialLvl] = useState<number | undefined>(special?.lvl)
  const [support, setSupport] = useState<number | undefined>(sup?.lvl)

  const [rcv, setRcv] = useState<number>(cc.rcv)
  const [hp, setHp] = useState<number>(cc.hp)
  const [atk, setAtk] = useState<number>(cc.atk)

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
          support:
            support !== undefined
              ? {
                lvl: support!,
              }
              : undefined,
          special:
            specialLvl !== undefined
              ? {
                lvl: specialLvl!,
                lvlMax: special!.lvlMax,
              }
              : undefined,
        })
      }
    >
      {/* <ImageFull src={unit.images.full} alt={unit.name} /> */}
      <RecapBox unit={unit} userUnit={userUnit} />

      {special !== undefined && special.lvlMax > 1 && (
        <ExpansionPanel title="Special">
          <label>
            <SpecialLevelInput
              name="support"
              max={special!.lvlMax}
              value={specialLvl!}
              onChange={e => setSpecialLvl(Number(e.target.value))}
            />
            {specialLvl}
          </label>
        </ExpansionPanel>
      )}

      <ExpansionPanel title="Cotton Candies">
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
      </ExpansionPanel>

      {support !== undefined && (
        <ExpansionPanel title="Support">
          <label>
            <SupportInput
              name="support"
              value={support}
              onChange={e => setSupport(Number(e.target.value))}
            />
            {support}
          </label>
          <p>{unit.detail.support[0].Characters}</p>
          {unit.detail.support[0].description.map((desc, i) => (
            <p key={i}>
              {i}: {desc}
            </p>
          ))}
        </ExpansionPanel>
      )}

      <ExpansionPanel title="Potential Abilities">
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
      </ExpansionPanel>

      <Button variant="danger" onClick={() => onDelete(userUnit.id)}>
        Supprimer
      </Button>
    </Popup>
  )
}

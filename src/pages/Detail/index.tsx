import Button from 'components/Button'
import ExpansionPanel from 'components/ExpansionPanel'
import PotentialAbilityInput from 'components/forms/PotentialAbilityInput'
import SpecialLevelInput from 'components/forms/SpecialLevelInput'
import SupportInput from 'components/forms/SupportInput'
import Popup from 'components/Popup'
import { ExtendedUnit } from 'models/units'
import { UserUnit, UserUnitPotentialAbility } from 'models/userBox'
import React, { useState } from 'react'
import CottonCandyEdit from './components/CottonCandyEdit'
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
  const { potentials, special, support: sup } = userUnit
  const [userUnitUpdated, setUserUnitUpdated] = useState<UserUnit>(userUnit)

  const [specialLvl, setSpecialLvl] = useState<number | undefined>(special?.lvl)
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
          cc: userUnitUpdated.cc,
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
      {/* <ImageFull src={unit.images.full} alt={unit.name} display={['none', 'inline-block']}/> */}
      <RecapBox unit={unit} userUnit={userUnitUpdated} marginBottom="3" />

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
        <CottonCandyEdit
          cc={userUnitUpdated.cc}
          onChange={cc => setUserUnitUpdated({
            ...userUnitUpdated,
            cc,
          })}
        />
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

      <Button variant="danger" my="1" onClick={() => onDelete(userUnit.id)}>
        Supprimer
      </Button>
    </Popup>
  )
}

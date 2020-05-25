import Button from 'components/Button'
import ExpansionPanel from 'components/ExpansionPanel'
import PotentialAbilityInput from 'components/forms/PotentialAbilityInput'
import SupportInput from 'components/forms/SupportInput'
import Popup from 'components/Popup'
import { ExtendedUnit } from 'models/units'
import { UserUnit, UserUnitPotentialAbility } from 'models/userBox'
import React, { useState } from 'react'
import CottonCandyEdit from './components/CottonCandyEdit'
import RecapBox from './components/RecapBox'
import SpecialLvlEdit from './components/SpecialLvlEdit'

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
  const { potentials, support: sup } = userUnit
  const [userUnitUpdated, setUserUnitUpdated] = useState<UserUnit>(userUnit)
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
          special: userUnitUpdated.special,
        })
      }
    >
      {/* <ImageFull src={unit.images.full} alt={unit.name} display={['none', 'inline-block']}/> */}
      <RecapBox unit={unit} userUnit={userUnitUpdated} marginBottom="3" />

      <SpecialLvlEdit
        special={userUnitUpdated.special}
        onChange={special =>
          setUserUnitUpdated({
            ...userUnitUpdated,
            special,
          })
        }
      />

      <CottonCandyEdit
        cc={userUnitUpdated.cc}
        onChange={cc =>
          setUserUnitUpdated({
            ...userUnitUpdated,
            cc,
          })
        }
      />

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

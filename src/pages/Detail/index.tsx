import Button from 'components/Button'
import Popup from 'components/Popup'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import React, { useState } from 'react'
import CottonCandyEdit from './components/CottonCandyEdit'
import PotentialEdit from './components/PotentialEdit'
import RecapBox from './components/RecapBox'
import SpecialLvlEdit from './components/SpecialLvlEdit'
import SupportEdit from './components/SupportEdit'

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
  userUnit: original,
  onDelete,
}: DetailProps) {
  const [userUnit, setUserUnit] = useState<UserUnit>(original)

  return (
    <Popup onCancel={onCancel} onValidate={() => onValidate(userUnit)}>
      {/* <ImageFull src={unit.images.full} alt={unit.name} display={['none', 'inline-block']}/> */}
      <RecapBox unit={unit} userUnit={userUnit} marginBottom="3" />

      <SpecialLvlEdit
        special={userUnit.special}
        onChange={special => setUserUnit({ ...userUnit, special })}
      />

      <CottonCandyEdit
        cc={userUnit.cc}
        onChange={cc => setUserUnit({ ...userUnit, cc })}
      />

      <SupportEdit
        support={userUnit.support}
        detail={unit.detail.support?.[0]}
        onChange={support => setUserUnit({ ...userUnit, support })}
      />

      <PotentialEdit
        potentials={userUnit.potentials}
        details={unit.detail.potential}
        onChange={potentials => setUserUnit({ ...userUnit, potentials })}
      />

      <Button variant="danger" my="1" onClick={() => onDelete(userUnit.id)}>
        Supprimer
      </Button>
    </Popup>
  )
}

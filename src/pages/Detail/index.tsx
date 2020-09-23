import Box from 'components/Box'
import Button from 'components/Button'
import CharacterBox from 'components/CharacterBox'
import ExpansionPanel from 'components/ExpansionPanel'
import Popup from 'components/Popup'
import { ExtendedUnit } from 'models/units'
import { UserUnit, UserUnitLimitBreak } from 'models/userBox'
import React, { useState } from 'react'
import { Evolve } from 'services/userUnits'
import CottonCandyEdit from './components/CottonCandyEdit'
import PotentialEdit from './components/PotentialEdit'
import RecapBox from './components/RecapBox'
import SpecialLvlEdit from './components/SpecialLvlEdit'
import SupportEdit from './components/SupportEdit'
import LimitBreakEdit from './components/LimitBreakEdit'
import { getLimitType } from 'services/limit'
import PirateFestEdit from './components/PirateFestEdit'

type DetailProps = {
  userUnit: UserUnit
  units: ExtendedUnit[]
  onCancel: () => void
  onValidate: (updated: UserUnit) => void
  onDelete?: (id: string) => void
}

export default function Detail ({
  onCancel,
  onValidate,
  units,
  userUnit: original,
  onDelete,
}: DetailProps) {
  const [userUnit, setUserUnit] = useState<UserUnit>(original)
  const { unit } = userUnit
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

  const evolutions = (!unit.evolution?.evolution
    ? []
    : Array.isArray(unit.evolution.evolution)
      ? unit.evolution.evolution.map(id => units.find(u => u.id === id))
      : [units.find(u => u.id === unit.evolution!.evolution)]
  ).filter(Boolean) as ExtendedUnit[]

  const onLimitBreakChange = (limitBreak: UserUnitLimitBreak) => {
    const potentialUnlockedLength = unit.detail
      .limit!.slice(0, limitBreak.lvl)
      .map(lb => getLimitType(lb))
      .filter(type => type === 'potential').length

    const potentials = userUnit.potentials
      .slice(0, potentialUnlockedLength)
      .filter(p => p.lvl === 0).length
      ? userUnit.potentials.map((p, i) =>
        i < potentialUnlockedLength && p.lvl === 0
          ? { ...p, lvl: 1 }
          : i >= potentialUnlockedLength && p.lvl === 1
            ? { ...p, lvl: 0 }
            : p,
      )
      : userUnit.potentials

    setUserUnit({
      ...userUnit,
      limitBreak,
      potentials,
    })
  }

  return (
    <Popup onCancel={onCancel} onValidate={() => onValidate(userUnit)}>
      {/* <ImageFull src={unit.images.full} alt={unit.name} display={['none', 'inline-block']}/> */}
      <RecapBox userUnit={userUnit} marginBottom="3" />

      <SpecialLvlEdit
        special={userUnit.special}
        detail={unit.detail}
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

      <LimitBreakEdit
        limitBreak={userUnit.limitBreak}
        detail={unit.detail}
        onChange={onLimitBreakChange}
      />

      <PotentialEdit
        potentials={userUnit.potentials}
        details={unit.detail.potential ?? []}
        onChange={potentials => setUserUnit({ ...userUnit, potentials })}
      />

      <PirateFestEdit
        detail={unit.detail}
        pirateFest={userUnit.pirateFest}
        onChange={pirateFest => setUserUnit({ ...userUnit, pirateFest })}
      />

      {!!evolutions.length && (
        <ExpansionPanel title="Evolution">
          <Box display="flex" justifyContent="space-evenly">
            {evolutions.map(evolveUnit => (
              <CharacterBox
                key={evolveUnit.id}
                unit={evolveUnit}
                onClick={() => setUserUnit(Evolve(userUnit, evolveUnit))}
              />
            ))}
          </Box>
        </ExpansionPanel>
      )}

      <Button
        href={`https://optc-db.github.io/characters/#/view/${unit.id}`}
        variant="link"
      >
        See on OPTC-DB
      </Button>

      {!!onDelete && (
        <Button
          variant="danger"
          my="1"
          onClick={() => setShowConfirmation(true)}
        >
          Delete
        </Button>
      )}

      {showConfirmation && (
        <Popup
          title="Are you sure to delete it ?"
          onValidate={() => {
            setShowConfirmation(false)
            onDelete!(userUnit.id)
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </Popup>
  )
}

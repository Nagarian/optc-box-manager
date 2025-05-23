import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { CharacterBox } from 'components/CharacterBox'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { DeleteIcon, EvolveIcon, OpenInDBIcon } from 'components/Icon'
import { Popup } from 'components/Popup'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import { useMemo, useState } from 'react'
import { ConsumeUnitDupe, Evolve, resync } from 'services/userUnits'
import { CoopEdit } from './components/CoopEdit'
import { CottonCandyEdit } from './components/CottonCandyEdit'
import { InkEdit } from './components/InkEdit'
import { LevelEdit } from './components/LevelEdit'
import { LimitBreakEdit } from './components/LimitBreakEdit'
import { PirateFestEdit } from './components/PirateFestEdit'
import { PotentialEdit } from './components/PotentialEdit'
import { PowerSocketEdit } from './components/PowerSocketEdit'
import { RecapBox } from './components/RecapBox'
import { SpecialLvlEdit } from './components/SpecialLvlEdit'
import { SupportEdit } from './components/SupportEdit'

type DetailProps = {
  userUnit: UserUnit
  units: ExtendedUnit[]
  onCancel: () => void
  onValidate: (updated: UserUnit) => void
  onDelete?: (id: string) => void
  isSugoCleaner?: boolean
  consumeLegend?: boolean
}

export function Detail({
  onCancel,
  onValidate,
  units,
  userUnit: original,
  onDelete,
  isSugoCleaner = false,
  consumeLegend = false,
}: DetailProps) {
  const [userUnit, setUserUnit] = useState<UserUnit>(() =>
    isSugoCleaner ? ConsumeUnitDupe(original, consumeLegend) : original,
  )
  const { unit } = userUnit
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const evolutions = useMemo(
    () =>
      (!unit.evolution?.evolution
        ? []
        : Array.isArray(unit.evolution.evolution)
          ? unit.evolution.evolution.map(id => units.find(u => u.id === id))
          : [units.find(u => u.id === unit.evolution?.evolution)]
      ).filter(Boolean) as ExtendedUnit[],
    [unit.evolution, units],
  )

  return (
    <Popup
      onCancel={onCancel}
      onValidate={() => onValidate(resync(userUnit))}
      customAction={
        <>
          {!!onDelete && (
            <Button
              variant="danger"
              onClick={() => setShowConfirmation(true)}
              icon={DeleteIcon}
              title="Delete"
            />
          )}
          <Button
            href={`https://2shankz.github.io/optc-db.github.io/characters/#/view/${unit.dbId}`}
            variant="secondary"
            icon={OpenInDBIcon}
            title="See on OPTC-DB"
          />
        </>
      }
    >
      <RecapBox userUnit={userUnit} original={original} marginBottom="3" />

      <Box display="flex" flexWrap="wrap">
        <LevelEdit
          level={userUnit.level}
          unit={unit}
          onChange={level => setUserUnit({ ...userUnit, level })}
        />

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
          onChange={limitBreak => setUserUnit({ ...userUnit, limitBreak })}
        />

        <PotentialEdit
          potentials={userUnit.potentials}
          details={unit.detail.potential ?? []}
          onChange={potentials => setUserUnit({ ...userUnit, potentials })}
        />

        <PowerSocketEdit
          powerSockets={userUnit.sockets}
          unit={unit}
          onChange={sockets => setUserUnit({ ...userUnit, sockets })}
        />

        <PirateFestEdit
          detail={unit.detail}
          pirateFest={userUnit.pirateFest}
          onChange={pirateFest => setUserUnit({ ...userUnit, pirateFest })}
        />

        <CoopEdit
          coop={userUnit.coop}
          unit={unit}
          onChange={coop => setUserUnit({ ...userUnit, coop })}
        />

        <InkEdit
          ink={userUnit.ink}
          onChange={ink => setUserUnit({ ...userUnit, ink })}
        />

        {!!evolutions.length && (
          <ExpansionPanel title="Evolution" icon={EvolveIcon}>
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
      </Box>

      {showConfirmation && (
        <Popup
          title="Are you sure to delete it ?"
          onValidate={() => {
            setShowConfirmation(false)
            onDelete?.(userUnit.id)
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </Popup>
  )
}

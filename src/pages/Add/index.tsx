import React, { useMemo } from 'react'
import { DBUnit } from 'services/units'
import CharacterBox from 'components/CharacterBox'

export default function Add () {
  const units = useMemo(
    () =>
      DBUnit.getAllUnits().filter(
        (unit) => !unit.evolution && unit.stars > 4 && unit.flags.global,
      ),
    [],
  )

  return (
    <>
      {units.map((unit) => (
        <CharacterBox key={unit.number} unit={unit} />
      ))}
    </>
  )
}

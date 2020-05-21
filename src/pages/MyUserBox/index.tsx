import Box from 'components/Box'
import Button from 'components/Button'
import { AddSvg } from 'components/Icon'
import SearchPanel from 'components/SearchPanel'
import { ExtendedUnit } from 'models/units'
import { UserBox } from 'models/userBox'
import React from 'react'

type UserBoxProps = {
  userBox: UserBox
  onAddUnit: () => void
  onShowDetail: (unit: ExtendedUnit) => void
  units: ExtendedUnit[]
}

export default function MyUserBox ({
  userBox,
  onAddUnit,
  onShowDetail,
  units,
}: UserBoxProps) {
  const myUnits = units.filter(unit =>
    userBox.some(uu => uu.unitId === unit.id),
  )

  if (userBox.length === 0) {
    return (
      <Box display="flex" alignItems="center" flexDirection="column">
        It's seem pretty lonely here, try adding some units !
        <Button onClick={() => onAddUnit()} icon={AddSvg} />
      </Box>
    )
  }

  return (
    <SearchPanel units={myUnits} onUnitClick={unit => onShowDetail(unit)} />
  )
}

import Box from 'components/Box'
import Button from 'components/Button'
import { AddIcon } from 'components/Icon'
import SearchPanel from 'components/SearchPanel'
import { Search } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { UserBox } from 'models/userBox'
import React from 'react'

type UserBoxProps = {
  userBox: UserBox
  search?: Search
  onAddUnit: () => void
  onShowDetail: (unit: ExtendedUnit) => void
}

export default function MyUserBox ({
  userBox,
  search,
  onAddUnit,
  onShowDetail,
}: UserBoxProps) {
  if (userBox.length === 0) {
    return (
      <Box display="flex" alignItems="center" flexDirection="column">
        It's seem pretty lonely here, try adding some units !
        <Button onClick={() => onAddUnit()} icon={AddIcon} />
      </Box>
    )
  }

  return (
    <SearchPanel units={userBox.map(u => u.unit)} onUnitClick={unit => onShowDetail(unit)} search={search} />
  )
}

import Box from 'components/Box'
import Button from 'components/Button'
import CharacterBox from 'components/CharacterBox'
import { AddIcon } from 'components/Icon'
import Pagination from 'components/Pagination'
import { ResultList } from 'components/SearchPanel'
import { useUnitSort } from 'components/SearchPanel/UnitSort'
import usePagination from 'hooks/usePagination'
import { useSearch } from 'hooks/useSearch'
import { Search } from 'models/search'
import { UserBox, UserUnit } from 'models/userBox'
import React from 'react'

type UserBoxProps = {
  userBox: UserBox
  search?: Search
  onAddUnit: () => void
  onShowDetail: (userUnit: UserUnit) => void
}

export default function MyUserBox ({
  userBox,
  search,
  onAddUnit,
  onShowDetail,
}: UserBoxProps) {
  const { userUnitFilters } = useSearch(search)
  const { sorts } = useUnitSort('Default')
  const filtered = userBox.filter(userUnitFilters)
  const { slice, paginationProps, setPage } = usePagination(filtered.length, 100)

  if (userBox.length === 0) {
    return (
      <Box display="flex" alignItems="center" flexDirection="column">
        It's seem pretty lonely here, try adding some units !
        <Button onClick={() => onAddUnit()} icon={AddIcon} />
      </Box>
    )
  }

  return (
    <>
      <ResultList>
        {filtered.slice(...slice).map(userUnit => (
          <CharacterBox key={userUnit.id} userUnit={userUnit} onClick={() => onShowDetail(userUnit)} />
        ))}
      </ResultList>
      <Pagination {...paginationProps} onPageChange={page => setPage(page)} />
    </>
  )
}

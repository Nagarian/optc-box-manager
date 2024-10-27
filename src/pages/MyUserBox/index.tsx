import Box from 'components/Box'
import CharacterBox from 'components/CharacterBox'
import { GatherIslandIcon, NewsCooIcon } from 'components/Icon'
import Pagination from 'components/Pagination'
import { ResultList } from 'components/SearchPanel'
import { SubTitle } from 'components/Title'
import usePagination from 'hooks/usePagination'
import { useSearch } from 'hooks/useSearch'
import { Search } from 'models/search'
import { UserBox, UserUnit } from 'models/userBox'
import { SearchBoxDisplayerBuilder } from 'pages/SearchBuilder/components/BoxDisplayers'
import { FlexProps, SpaceProps } from 'styled-system'

type UserBoxProps = {
  userBox: UserBox
  search?: Search
  onAddUnit?: () => void
  onShowDetail: (userUnit: UserUnit) => void
}

export default function MyUserBox({
  userBox,
  search,
  onAddUnit,
  onShowDetail,
  ...rest
}: UserBoxProps & SpaceProps & FlexProps) {
  const { userUnitFilters, userUnitSort } = useSearch(search)
  const filtered = userBox.filter(userUnitFilters).sort(userUnitSort)
  const { slice, paginationProps, setPage, pageScrollRef } = usePagination(
    filtered.length,
    100,
  )

  const BoxDisplayer = search?.boxDisplayer?.type
    ? SearchBoxDisplayerBuilder[search.boxDisplayer.type].displayer
    : undefined

  if (!filtered.length && userBox.length) {
    return (
      <>
        <Box display="grid" alignContent="center" placeItems="center" p="2">
          <GatherIslandIcon size="9" color="primaryText" />
          <SubTitle>
            There are no units in your box that match your current search, you
            should try to modify your filters !
          </SubTitle>
        </Box>
        {BoxDisplayer && <BoxDisplayer search={search} userBox={userBox} />}
      </>
    )
  }

  if (filtered.length === 0 && !!onAddUnit) {
    return (
      <Box display="grid" alignContent="center" placeItems="center" p="2">
        <NewsCooIcon size="9" color="primaryText" />
        <SubTitle>
          It looks quite empty here, you should try to add some units or go to
          the setting to restore a backup!
        </SubTitle>
      </Box>
    )
  }

  return (
    <>
      <ResultList ref={pageScrollRef} {...rest}>
        {filtered.slice(...slice).map(userUnit => (
          <CharacterBox
            key={userUnit.id}
            userUnit={userUnit}
            displayer={search?.displayer}
            onClick={onShowDetail}
          />
        ))}
      </ResultList>
      {BoxDisplayer && <BoxDisplayer search={search} userBox={userBox} />}
      <Pagination {...paginationProps} onPageChange={page => setPage(page)} />
    </>
  )
}

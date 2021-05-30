import styled from '@emotion/styled'
import CharacterBox from 'components/CharacterBox'
import Pagination from 'components/Pagination'
import usePagination from 'hooks/usePagination'
import { useSearch } from 'hooks/useSearch'
import { Search } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { flex, FlexProps, space, SpaceProps } from 'styled-system'

export const ResultList = styled.div<SpaceProps & FlexProps>`
  ${flex}
  ${space}
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  overflow-y: auto;
`

type SearchPanelProps = {
  units: ExtendedUnit[]
  search?: Search
  onUnitClick: (unit: ExtendedUnit) => void
}

export default function SearchPanel ({
  units,
  search,
  onUnitClick,
  ...rest
}: SearchPanelProps & SpaceProps & FlexProps) {
  const { unitFilters, unitSort } = useSearch(search)
  const filtered = units.filter(unitFilters).sort(unitSort)
  const { slice, paginationProps, setPage, pageScrollRef } = usePagination(filtered.length, 100)

  return (
    <>
      <ResultList {...rest} ref={pageScrollRef}>
        {filtered.slice(...slice).map(unit => (
          <CharacterBox key={unit.id} unit={unit} onClick={onUnitClick} />
        ))}
      </ResultList>
      <Pagination {...paginationProps} onPageChange={page => setPage(page)} />
    </>
  )
}

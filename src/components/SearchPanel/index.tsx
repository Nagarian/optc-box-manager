import styled from '@emotion/styled'
import Button from 'components/Button'
import CharacterBox from 'components/CharacterBox'
import { AddIcon } from 'components/Icon'
import Pagination from 'components/Pagination'
import usePagination from 'hooks/usePagination'
import { useSearch } from 'hooks/useSearch'
import { Search } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { flex, FlexProps, SizeProps, space, SpaceProps } from 'styled-system'

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
  onAdd?: () => void
}

export default function SearchPanel({
  units,
  search,
  onUnitClick,
  onAdd,
  size,
  ...rest
}: SearchPanelProps & SpaceProps & FlexProps & SizeProps) {
  const { unitFilters, unitSort } = useSearch(search)
  const filtered = units.filter(unitFilters).sort(unitSort)
  const { slice, paginationProps, setPage, pageScrollRef } = usePagination(
    filtered.length,
    100,
  )

  return (
    <>
      <ResultList {...rest} ref={pageScrollRef}>
        {filtered.slice(...slice).map((unit, i) => (
          <CharacterBox
            key={`${unit.id}-${i}`}
            unit={unit}
            size={size}
            onClick={onUnitClick}
          />
        ))}

        {!!onAdd && (
          <Button
            onClick={onAdd}
            title="Add units"
            icon={AddIcon}
            size="1"
            alignSelf="center"
            margin="2"
          />
        )}
      </ResultList>
      <Pagination {...paginationProps} onPageChange={page => setPage(page)} />
    </>
  )
}

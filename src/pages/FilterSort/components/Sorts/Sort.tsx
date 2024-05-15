import styled from '@emotion/styled'
import Box from 'components/Box'
import Button from 'components/Button'
import { SubTitle } from 'components/Title'
import { SearchSortCriteria } from 'models/search'
import { SearchSortBuilder, UnitSortTypeKeys, UserUnitSortTypeKeys } from '.'
import SearchSortItem from './components/SearchSortItem'

export type SortProps = {
  unitOnly: boolean
  searchSort: SearchSortCriteria[]
  onChange: (searchSort: SearchSortCriteria[]) => void
}
export default function Sort({
  unitOnly,
  searchSort = [],
  onChange,
}: SortProps) {
  const SortItemRender = (criteria: SearchSortCriteria) => (
    <Button
      key={criteria.by}
      onClick={() => onChange(searchSort.concat(criteria))}
      fontSize="1"
      margin="1"
    >
      {SearchSortBuilder[criteria.by].label}
    </Button>
  )

  return (
    <Box minHeight="0" display="flex">
      <Panel>
        <Button
          onClick={() =>
            onChange(
              searchSort.concat([
                { by: 'byType', order: 'asc' },
                { by: 'byRarity', order: 'desc' },
                { by: 'byFamily', order: 'asc' },
                { by: 'byId', order: 'asc' },
              ]),
            )
          }
          fontSize="1"
          margin="1"
        >
          {'Default'}
        </Button>

        <Button
          onClick={() =>
            onChange(searchSort.concat([{ by: 'byId', order: 'desc' }]))
          }
          fontSize="1"
          margin="1"
        >
          {`"Newest"`}
        </Button>

        <hr />
        <SubTitle>{'Unit sort'}</SubTitle>
        {UnitSortTypeKeys.map(s => SortItemRender({ by: s, order: 'asc' }))}

        {!unitOnly && (
          <>
            <hr />
            <SubTitle>{'My Box sort'}</SubTitle>
            {UserUnitSortTypeKeys.map(s =>
              SortItemRender({ by: s, order: 'desc' }),
            )}
          </>
        )}
      </Panel>

      <Box display="flex" flexDirection="column" flex="1">
        <Box display="flex" flexDirection="column" overflowY="auto" flex="1">
          {searchSort.map((criteria, i) => (
            <SearchSortItem
              key={i}
              criteria={criteria}
              sortBuilder={SearchSortBuilder[criteria.by]}
              onUpdate={(oldCriteria, newCriteria) =>
                onChange(
                  searchSort.map(ss => (ss !== oldCriteria ? ss : newCriteria)),
                )
              }
              onDelete={() =>
                onChange(searchSort.filter(ss => ss !== criteria))
              }
            />
          ))}
        </Box>
        <Button
          variant="danger"
          onClick={() => onChange([])}
          alignSelf="center"
        >
          {'Clear'}
        </Button>
      </Box>
    </Box>
  )
}

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-width: 10rem;
  max-width: 40%;

  > button {
    flex: 0 0 auto;
  }
`

import Box from 'components/Box'
import Button from 'components/Button'
import { CancelIcon, FilterSortIcon } from 'components/Icon'
import { Title } from 'components/Title'
import { SearchSortCriteria } from 'models/search'
import React from 'react'
import { SearchSortTypeKeys } from '.'

export type SortProps = {
  unitOnly: boolean
  searchSort: SearchSortCriteria[]
  onChange: (searchSort: SearchSortCriteria[]) => void
}
export default function Sort ({
  unitOnly,
  searchSort = [],
  onChange,
}: SortProps) {
  return (
    <Box minHeight="60vh">
      <Title>Sort</Title>
      <Box display="flex" flexDirection="column" overflowY="auto">
        {SearchSortTypeKeys.map(sortType => (
          <Button
            onClick={() =>
              onChange(searchSort.concat({ by: sortType, order: 'desc' }))
            }
          >
            {sortType}
          </Button>
        ))}
      </Box>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" overflowY="auto" flex="1">
          {searchSort.map((criteria, i) => (
            <Box key={i} display="flex">
              <Box flex="1">{criteria.by}</Box>
              <Button
                icon={FilterSortIcon}
                onClick={() =>
                  onChange(
                    searchSort.map(ss =>
                      ss !== criteria
                        ? ss
                        : {
                          by: criteria.by,
                          order: criteria.order === 'asc' ? 'desc' : 'asc',
                        },
                    ),
                  )
                }
              />
              <Button
                icon={CancelIcon}
                onClick={() =>
                  onChange(searchSort.filter(ss => ss !== criteria))
                }
              />
            </Box>
          ))}
        </Box>
        <Button variant="danger">Clear</Button>
      </Box>
    </Box>
  )
}

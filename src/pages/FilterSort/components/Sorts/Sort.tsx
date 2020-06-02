import Box from 'components/Box'
import Button from 'components/Button'
import { CancelIcon, FilterSortIcon } from 'components/Icon'
import { SearchSortCriteria } from 'models/search'
import React from 'react'
import { SearchSortBuilder, UnitSortTypeKeys, UserUnitSortTypeKeys } from '.'

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
    <Box minHeight="60vh" display="flex">
      {/* <Title>Sort</Title> */}
      <Box display="flex" flexDirection="column" overflowY="auto">
        <Button
          onClick={() =>
            onChange([
              { by: 'byType', order: 'asc' },
              { by: 'byRarity', order: 'desc' },
              { by: 'byFamily', order: 'asc' },
              { by: 'byId', order: 'asc' },
            ])
          }
        >
          Default (Favorite like)
        </Button>
        <Button
          onClick={() =>
            onChange([
              { by: 'byId', order: 'desc' },
            ])
          }
        >
          " Newest "
        </Button>
        <hr/>
        {UnitSortTypeKeys.map(sortType => (
          <Button
            key={sortType}
            onClick={() =>
              onChange(searchSort.concat({ by: sortType, order: 'desc' }))
            }
          >
            {SearchSortBuilder[sortType].label}
          </Button>
        ))}
        {!unitOnly &&
          UserUnitSortTypeKeys.map(sortType => (
            <Button
              key={sortType}
              onClick={() =>
                onChange(searchSort.concat({ by: sortType, order: 'desc' }))
              }
            >
              {SearchSortBuilder[sortType].label}
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
        <Button variant="danger" onClick={() => onChange([])}>
          Clear
        </Button>
      </Box>
    </Box>
  )
}

import Box from 'components/Box'
import { Title } from 'components/Title'
import React from 'react'
import FilterContainer from './FilterContainer'
import { SearchFilterUserUnits, SearchFilterUserUnitsKeys, UserUnitFilterBuilder } from './UserUnits'

export type UserUnitFiltersProps = {
  userUnitFilter: SearchFilterUserUnits
  onChange: (userUnitFilter: SearchFilterUserUnits) => void
}
export default function UserUnitFilters ({
  userUnitFilter,
  onChange,
}: UserUnitFiltersProps) {
  return (
    <Box overflowY="auto">
      <Title>My Box Filters</Title>
      {SearchFilterUserUnitsKeys.map(key => ({
        key,
        ...UserUnitFilterBuilder[key],
      })).map(({ key, title, input: Input }) => (
        <FilterContainer
          title={title}
          onReset={() =>
            onChange({
              ...userUnitFilter,
              [key]: undefined,
            })
          }
          disableReset={!userUnitFilter[key]}
        >
          <Input
            criteria={userUnitFilter[key]}
            onChange={value =>
              onChange({
                ...userUnitFilter,
                [key]: value,
              })
            }
          />
        </FilterContainer>
      ))}
    </Box>
  )
}

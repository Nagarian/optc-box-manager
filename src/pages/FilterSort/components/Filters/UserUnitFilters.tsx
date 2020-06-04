import Box from 'components/Box'
import { Title } from 'components/Title'
import React from 'react'
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
      })).map(({ key, input: Input }) => (
        <Input
          criteria={userUnitFilter[key]}
          onChange={value =>
            onChange({
              ...userUnitFilter,
              [key]: value,
            })
          }
        />
      ))}
    </Box>
  )
}

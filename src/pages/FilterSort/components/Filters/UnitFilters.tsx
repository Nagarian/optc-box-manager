import Box from 'components/Box'
import { Title } from 'components/Title'
import React from 'react'
import { SearchFilterUnits, SearchFilterUnitsKeys, UnitFilterBuilder } from './Units'

export type UnitFiltersProps = {
  unitFilter: SearchFilterUnits
  onChange: (unitFilter: SearchFilterUnits) => void
}
export default function UnitFilters ({
  unitFilter,
  onChange,
}: UnitFiltersProps) {
  return (
    <Box overflowY="auto">
      <Title>Units Filters</Title>
      {SearchFilterUnitsKeys.map(key => ({
        key,
        ...UnitFilterBuilder[key],
      })).map(({ key, input: Input }) => (
        <Input
          criteria={unitFilter[key]}
          onChange={value =>
            onChange({
              ...unitFilter,
              [key]: value,
            })
          }
        />
      ))}
    </Box>
  )
}

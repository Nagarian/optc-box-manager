import Box from 'components/Box'
import React from 'react'
import FilterContainer from './FilterContainer'
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
      {SearchFilterUnitsKeys.map(key => ({
        key,
        ...UnitFilterBuilder[key],
      })).map(({ key, title, input: Input }) => (
        <FilterContainer
          key={key}
          title={title}
          onReset={() =>
            onChange({
              ...unitFilter,
              [key]: undefined,
            })
          }
          disableReset={!unitFilter[key]}
        >
          <Input
            criteria={unitFilter[key]}
            onChange={value =>
              onChange({
                ...unitFilter,
                [key]: value,
              })
            }
          />
        </FilterContainer>
      ))}
    </Box>
  )
}

import { Box } from 'components/Box'
import { FilterContainer } from './FilterContainer'
import { SearchFilterUnits, UnitFilterBuilder } from './Units'

export type UnitFiltersProps = {
  unitFilter: SearchFilterUnits
  onChange: (unitFilter: SearchFilterUnits) => void
}
export function UnitFilters({ unitFilter, onChange }: UnitFiltersProps) {
  return (
    <Box overflowY="auto">
      {Object.values(UnitFilterBuilder).map(({ key, input: Input, title }) => (
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
            criteria={unitFilter[key] as any}
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

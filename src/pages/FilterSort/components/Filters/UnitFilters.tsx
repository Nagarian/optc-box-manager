import Box from 'components/Box'
import { SearchFilterUnits } from 'models/search'
import FilterContainer from './FilterContainer'
import { SearchFilterUnitsKeys, UnitFilterBuilder } from './Units'

export type UnitFiltersProps = {
  unitFilter: SearchFilterUnits
  onChange: (unitFilter: SearchFilterUnits) => void
}
export default function UnitFilters({
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
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                [key]: value,
              })
            }
          />
        </FilterContainer>
      ))}
    </Box>
  )
}

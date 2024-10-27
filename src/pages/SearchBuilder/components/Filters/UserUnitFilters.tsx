import Box from 'components/Box'
import FilterContainer from './FilterContainer'
import { SearchFilterUserUnits, UserUnitFilterBuilder } from './UserUnits'

export type UserUnitFiltersProps = {
  userUnitFilter: SearchFilterUserUnits
  onChange: (userUnitFilter: SearchFilterUserUnits) => void
}
export default function UserUnitFilters({
  userUnitFilter,
  onChange,
}: UserUnitFiltersProps) {
  return (
    <Box overflowY="auto">
      {Object.values(UserUnitFilterBuilder).map(
        ({ key, title, input: Input }) => (
          <FilterContainer
            key={key}
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
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
              criteria={userUnitFilter[key] as any}
              onChange={value =>
                onChange({
                  ...userUnitFilter,
                  [key]: value,
                })
              }
            />
          </FilterContainer>
        ),
      )}
    </Box>
  )
}

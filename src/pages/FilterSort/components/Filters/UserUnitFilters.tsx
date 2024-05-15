import Box from 'components/Box'
import { SearchFilterUserUnits } from 'models/search'
import FilterContainer from './FilterContainer'
import { SearchFilterUserUnitsKeys, UserUnitFilterBuilder } from './UserUnits'

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
      {SearchFilterUserUnitsKeys.map(key => ({
        key,
        ...UserUnitFilterBuilder[key],
      })).map(({ key, title, input: Input }) => (
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
            criteria={userUnitFilter[key]}
            onChange={value =>
              onChange({
                ...userUnitFilter,
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

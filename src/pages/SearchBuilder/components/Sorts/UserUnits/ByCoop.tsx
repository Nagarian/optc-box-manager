import { Box } from 'components/Box'
import { SearchOptionInputProps } from 'models/search'
import { SearchSortWithOptionFunction, UserUnitSort } from '..'

const CoopOptions = ['luck', 'captain lvl', 'special lvl'] as const

export type CoopSortOption = {
  type: (typeof CoopOptions)[number]
}

export const byCoopWithOption: SearchSortWithOptionFunction<
  CoopSortOption,
  UserUnitSort
> = option => {
  switch (option?.type) {
    case 'captain lvl':
      return (userUnit1, userUnit2) =>
        userUnit1.coop.captain - userUnit2.coop.captain
    case 'special lvl':
      return (userUnit1, userUnit2) =>
        userUnit1.coop.special - userUnit2.coop.special
    case 'luck':
    default:
      return (userUnit1, userUnit2) => userUnit1.coop.luck - userUnit2.coop.luck
  }
}

export const byCoopSortLabel = (option?: CoopSortOption) => option?.type

export function CoopSortInput({
  options,
  onChange,
}: SearchOptionInputProps<CoopSortOption>) {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
      {CoopOptions.map(type => (
        <label key={type}>
          <input
            type="radio"
            name="coop-sort"
            checked={options?.type === type}
            onChange={e =>
              onChange({
                type,
              })
            }
          />
          {type}
        </label>
      ))}
    </Box>
  )
}

import Box from 'components/Box'
import {
  SearchSortInputProps,
  SearchSortWithOptionFunction,
  UserUnitSort,
} from 'models/search'

const CoopOptions = ['luck', 'captain lvl', 'special lvl'] as const

export type CoopSortOption = {
  type: (typeof CoopOptions)[number]
}

export const byCoopWithOption: SearchSortWithOptionFunction<CoopSortOption> = (
  option,
): UserUnitSort => {
  switch (option.type) {
    case 'captain lvl':
      return (userUnit1, userUnit2) =>
        userUnit1.coop.captain - userUnit2.coop.captain
    case 'special lvl':
      return (userUnit1, userUnit2) =>
        userUnit1.coop.special - userUnit2.coop.special
    case 'luck':
    default:
      return byCoop
  }
}

export const byCoop: UserUnitSort = (userUnit1, userUnit2) =>
  userUnit1.coop.luck - userUnit2.coop.luck

export const byCoopSortLabel = (option: CoopSortOption) => option.type

export function CoopSortInput({
  options,
  onChange,
}: SearchSortInputProps<CoopSortOption>) {
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

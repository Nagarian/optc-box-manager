import Box from 'components/Box'
import { SearchOptionInputProps } from 'models/search'
import { SearchSortWithOptionFunction, UserUnitSort } from '..'

const LevelOptions = ['lvl', 'lvl Max', 'lvl LB'] as const

export type LevelSortOption = {
  type: (typeof LevelOptions)[number]
}

export const byLevelWithOption: SearchSortWithOptionFunction<
  LevelSortOption,
  UserUnitSort
> = option => {
  switch (option?.type) {
    case 'lvl Max':
      return (userUnit1, userUnit2) =>
        userUnit1.level.lvlMax - userUnit2.level.lvlMax
    case 'lvl LB':
      return (userUnit1, userUnit2) =>
        (userUnit1.level.limitStepLvl ?? -1) -
        (userUnit2.level.limitStepLvl ?? -1)
    case 'lvl':
    default:
      return byLevel
  }
}

export const byLevel: UserUnitSort = (userUnit1, userUnit2) =>
  userUnit1.level.lvl - userUnit2.level.lvl

export const byLevelSortLabel = (option?: LevelSortOption) => option?.type

export function LevelSortInput({
  options,
  onChange,
}: SearchOptionInputProps<LevelSortOption>) {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
      {LevelOptions.map(type => (
        <label key={type}>
          <input
            type="radio"
            name="lvl-sort"
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

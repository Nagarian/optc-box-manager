import Box from 'components/Box'
import {
  SearchSortInputProps,
  SearchSortWithOptionFunction,
  UserUnitSort,
} from 'models/search'
import {
  CottonCandyType,
  CottonCandyTypeKeys,
  UserUnitCottonCandy,
} from 'models/userBox'

const ccSum = ({ atk, hp, rcv }: UserUnitCottonCandy) => atk + hp + rcv

export const byCottonCandy: UserUnitSort = (userUnit1, userUnit2) =>
  ccSum(userUnit1.cc) - ccSum(userUnit2.cc)

export type SpecificCottonCandySortOption = {
  cc: CottonCandyType
}

export const bySpecificCottonCandy: SearchSortWithOptionFunction<
  SpecificCottonCandySortOption
> = (option): UserUnitSort => {
  switch (option.cc) {
    case 'atk':
      return (userUnit1, userUnit2) => userUnit1.cc.atk - userUnit2.cc.atk
    case 'hp':
      return (userUnit1, userUnit2) => userUnit1.cc.hp - userUnit2.cc.hp
    case 'rcv':
      return (userUnit1, userUnit2) => userUnit1.cc.rcv - userUnit2.cc.rcv
    default:
      return byCottonCandy
  }
}

export const bySpecificCottonCandyLabel = (
  option: SpecificCottonCandySortOption,
) => option.cc

export function SpecificCottonCandySortInput({
  options,
  onChange,
}: SearchSortInputProps<SpecificCottonCandySortOption>) {
  return (
    <Box display="flex" flexWrap="wrap">
      {CottonCandyTypeKeys.map(type => (
        <label key={type}>
          <input
            type="radio"
            name="cc-sort"
            checked={options?.cc === type}
            onChange={e =>
              onChange({
                cc: type,
              })
            }
          />
          {type}
        </label>
      ))}
    </Box>
  )
}

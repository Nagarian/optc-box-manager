import React from 'react'
import {
  UserUnitSort,
  SearchSortWithOptionFunction,
  SearchSortInputProps,
} from 'models/search'
import {
  UserUnitCottonCandy,
  CottonCandyType,
  CottonCandyTypeKeys,
} from 'models/userBox'
import Box from 'components/Box'

const ccSum = ({ atk, hp, rcv }: UserUnitCottonCandy) => atk + hp + rcv

export const byCottonCandy: UserUnitSort = (userUnit1, userUnit2) =>
  ccSum(userUnit1.cc) - ccSum(userUnit2.cc)

export const bySpecificCottonCandy: SearchSortWithOptionFunction<SpecificCottonCandySortOption> = (
  option,
): UserUnitSort => {
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

export type SpecificCottonCandySortOption = {
  cc: CottonCandyType
}

export function SpecificCottonCandySortInput ({
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
            checked={options?.cc === type ?? false}
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

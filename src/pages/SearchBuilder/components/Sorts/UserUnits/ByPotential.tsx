import { Box } from 'components/Box'
import { ImageInput } from 'components/forms/ImageInput'
import { PotentialAbility } from 'components/PotentialAbility'
import { SearchOptionInputProps } from 'models/search'
import { PotentialKey, Potentials } from 'models/units'
import { SearchSortWithOptionFunction, UserUnitSort } from '..'

export const byPotentialLvl: UserUnitSort = (userUnit1, userUnit2) =>
  userUnit1.potentials.reduce((acc, current) => acc + current.lvl, 0) -
  userUnit2.potentials.reduce((acc, current) => acc + current.lvl, 0)

export type SpecificPotentialSortOption = {
  type: PotentialKey
}

export const bySpecificPotentialLvl: SearchSortWithOptionFunction<
  SpecificPotentialSortOption,
  UserUnitSort
> = option =>
  !option
    ? byPotentialLvl
    : (userUnit1, userUnit2) =>
        (userUnit1.potentials.find(({ type }) => type === option.type)?.lvl ??
          -1) -
        (userUnit2.potentials.find(({ type }) => type === option.type)?.lvl ??
          -1)

export const bySpecificPotentialLabel = (
  option?: SpecificPotentialSortOption,
) => option && <PotentialAbility type={option.type} size="2.5em" />

export function SpecificPotentialSortInput({
  options,
  onChange,
}: SearchOptionInputProps<SpecificPotentialSortOption>) {
  return (
    <Box display="flex" flexWrap="wrap">
      {Potentials.map(potential => (
        <ImageInput
          key={potential}
          type="radio"
          name="potentials-sort"
          checked={options?.type === potential}
          onChange={e =>
            onChange({
              type: potential,
            })
          }
        >
          <PotentialAbility type={potential} size="3" />
        </ImageInput>
      ))}
    </Box>
  )
}

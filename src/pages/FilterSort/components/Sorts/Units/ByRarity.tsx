import styled from '@emotion/styled'
import Box from 'components/Box'
import {
  SearchSortInputProps,
  SearchSortWithOptionFunction,
  UnitSort,
} from 'models/search'
import { UnitStar } from 'models/units'

const ParseStar = (star: UnitStar): number => {
  switch (star) {
    case '4+':
      return 4.5
    case '5+':
      return 5.5
    case '6+':
      return 6.6
    default:
      return star as number
  }
}

export const byRaritySimple: UnitSort = (unit1, unit2) =>
  ParseStar(unit1.stars) - ParseStar(unit2.stars)

const ParseStarTrunctated = (star: UnitStar): number => {
  switch (star) {
    case '4+':
      return 4
    case '5+':
      return 5
    case '6+':
      return 6
    default:
      return star as number
  }
}

export const byRarityTruncated: UnitSort = (unit1, unit2) =>
  ParseStarTrunctated(unit1.stars) - ParseStarTrunctated(unit2.stars)

export type RaritySortOption = {
  truncated: boolean
}

export const byRarity: SearchSortWithOptionFunction<RaritySortOption> = (
  option,
): UnitSort => {
  return option.truncated ? byRarityTruncated : byRaritySimple
}

const Displayer = styled.span`
  white-space: nowrap;
`

export const byRarityLabel = (option: RaritySortOption) => (
  <Displayer>{option.truncated ? '⭐+ = ⭐' : '⭐+ ≠ ⭐'}</Displayer>
)

export function RaritySortOptionInput ({
  options,
  onChange,
}: SearchSortInputProps<RaritySortOption>) {
  return (
    <Box display="flex" flexWrap="wrap">
      <label>
        <input
          type="checkbox"
          name="rarity-sort-option"
          checked={options?.truncated ?? false}
          onChange={e =>
            onChange({
              truncated: e.target.checked,
            })
          }
        />
        Treat Evolved and Super-Evolved as equals
      </label>
    </Box>
  )
}

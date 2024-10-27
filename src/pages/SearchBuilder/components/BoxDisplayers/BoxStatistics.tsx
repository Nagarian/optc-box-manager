import { Box } from 'components/Box'
import { ChoiceInput } from 'components/forms/ChoiceInput'
import { Progression } from 'components/Progression'
import { Text } from 'components/Title'
import { useOptcDb } from 'hooks/useOptcDb'
import { useSearch } from 'hooks/useSearch'
import { SearchOptionInputProps } from 'models/search'
import { FilterContainerPanel } from '../Filters/FilterContainer'
import { SearchBoxDisplayerProps } from '.'

const BoxStatisticsOptionTypes = ['dbCompletion', 'boxSearch'] as const
export type BoxStatisticsOptionType = (typeof BoxStatisticsOptionTypes)[number]

export type BoxStatisticsOption = {
  type: BoxStatisticsOptionType
}

export function BoxStatistics({
  search,
  userBox,
}: SearchBoxDisplayerProps<BoxStatisticsOption>) {
  const { db } = useOptcDb()
  const { unitFilters, userUnitFilters } = useSearch(search)
  const type =
    (search?.boxDisplayer?.options as BoxStatisticsOption)?.type ?? 'boxSearch'

  const [current, max] =
    type == 'boxSearch'
      ? [
          userBox.filter(userUnitFilters).map(u => u.unit.id).length,
          userBox.length,
        ]
      : [
          new Set(userBox.filter(userUnitFilters).map(u => u.unit.id)).size,
          new Set(db.filter(unitFilters).map(u => u.id)).size,
        ]

  return (
    <Box display="flex" placeContent="space-between" gap="2" padding="2">
      <Text>{labels[type]}</Text>
      <Progression value={current} max={max} variant="spaced" skipMax />
    </Box>
  )
}

const labels: Record<BoxStatisticsOptionType, string> = {
  dbCompletion: 'DB completion',
  boxSearch: 'Search results',
}

export function BoxStatisticsInput({
  options,
  onChange,
}: SearchOptionInputProps<BoxStatisticsOption>) {
  return (
    <FilterContainerPanel>
      {BoxStatisticsOptionTypes.map(stateKey => (
        <ChoiceInput
          key={stateKey}
          type="radio"
          name="box-displayer-box"
          checked={options?.type === stateKey}
          onChange={e =>
            onChange({
              type: stateKey,
            })
          }
        >
          {labels[stateKey]}
        </ChoiceInput>
      ))}
    </FilterContainerPanel>
  )
}

import { ImageInput } from 'components/forms/ImageInput'
import { Text } from 'components/Title'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedUnit, Rarity, UnitStar } from 'models/units'
import {
  SearchRecapItem,
  SearchRecapItemCriteriaProps,
} from '../../BoxDisplayers/SearchRecap/SearchRecapItem'

export interface ByRarityCriteria {
  values: UnitStar[]
}

export const ByRarityFilter =
  (criteria: ByRarityCriteria) => (unit: ExtendedUnit) =>
    criteria.values.includes(unit.stars)

export function ByRarityInput({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByRarityCriteria>) {
  const values = criteria?.values ?? []
  const triggerChange = (value: UnitStar, check: boolean) => {
    const newValues = check
      ? values.concat(value)
      : values.filter(v => v !== value)

    onChange(
      newValues.length
        ? {
            values: newValues,
          }
        : undefined,
    )
  }

  return (
    <>
      {Rarity.map(value => (
        <ImageInput
          key={value}
          type="checkbox"
          name="rarity-filter"
          checked={values.includes(value)}
          onChange={e => triggerChange(value, e.target.checked)}
        >
          <Text fontSize="2" margin="2">
            {`⭐${value}`}
          </Text>
        </ImageInput>
      ))}
    </>
  )
}

export function ByRarityBoxDisplayer({
  criteria,
}: SearchRecapItemCriteriaProps<ByRarityCriteria>) {
  if (!criteria?.values.length) {
    return undefined
  }

  return (
    <SearchRecapItem title="rarity">
      {`⭐${criteria.values.join(', ')}`}
    </SearchRecapItem>
  )
}

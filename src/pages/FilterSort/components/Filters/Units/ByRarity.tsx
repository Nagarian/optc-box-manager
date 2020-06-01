import ImageInput from 'components/forms/ImageInput'
import { Text } from 'components/Title'
import { UnitFilterCriteria } from 'models/search'
import { ExtendedUnit, Rarity, UnitStar } from 'models/units'
import React from 'react'
import FilterContainer from '../FilterContainer'

export interface ByRarityCriteria extends UnitFilterCriteria {
  values: UnitStar[]
}

export const ByRarityFilter = (criteria: ByRarityCriteria) => (
  unit: ExtendedUnit,
) => criteria.values.includes(unit.stars)

export type ByRarityInputProps = {
  criteria?: ByRarityCriteria
  onChange: (criteria?: ByRarityCriteria) => void
}

export function ByRarityInput ({
  criteria = { values: [] },
  onChange,
}: ByRarityInputProps) {
  const triggerChange = (value: UnitStar, check: boolean) => {
    const values = check
      ? criteria.values.concat(value)
      : criteria.values.filter(v => v !== value)

    onChange(
      values.length
        ? {
          values,
        }
        : undefined,
    )
  }

  return (
    <FilterContainer
      title="Rarity"
      onReset={() => onChange(undefined)}
      disableReset={!criteria.values.length}
    >
      {Rarity.map(value => (
        <ImageInput
          key={value}
          type="checkbox"
          name="rarity-filter"
          checked={criteria.values.includes(value)}
          onChange={e => triggerChange(value, e.target.checked)}
        >
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <Text fontSize="2" margin="2">
            ⭐{value}
          </Text>
        </ImageInput>
      ))}
    </FilterContainer>
  )
}

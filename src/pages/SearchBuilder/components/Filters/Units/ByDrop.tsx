import styled from '@emotion/styled'
import { Box } from 'components/Box'
import { ChoiceInput } from 'components/forms/ChoiceInput'
import { SubTitle, Text } from 'components/Title'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedDrop, ExtendedDropKeys, ExtendedUnit } from 'models/units'
import { BooleanFilterMapper } from 'services/filterHelper'
import {
  SearchRecapItem,
  SearchRecapItemCriteriaProps,
} from '../../BoxDisplayers/SearchRecap/SearchRecapItem'

export interface ByDropCriteria {
  dropLocations?: ExtendedDrop[]
}

export const ByDropFilter = (criteria: ByDropCriteria) =>
  BooleanFilterMapper([
    criteria.dropLocations?.length,
    (unit: ExtendedUnit) =>
      criteria.dropLocations?.some(dl => unit.dropLocations.includes(dl)) ??
      false,
  ])

export function ByDropInput({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByDropCriteria>) {
  const dropLocations = criteria?.dropLocations ?? []
  const triggerCategoryChange = (
    dropLocation: ExtendedDrop,
    check: boolean,
  ) => {
    const newValues = check
      ? dropLocations.concat(dropLocation)
      : dropLocations.filter(v => v !== dropLocation)

    onChange({
      ...criteria,
      dropLocations: newValues,
    })
  }

  return (
    <Box>
      <SubTitle fontSize="2">Drop Location</SubTitle>
      <LabelDisplayer>
        {ExtendedDropKeys.map(dropKey => (
          <ChoiceInput
            key={dropKey}
            type="checkbox"
            name="unit-dropLocation"
            checked={criteria?.dropLocations?.includes(dropKey) ?? false}
            onChange={e => triggerCategoryChange(dropKey, e.target.checked)}
          >
            {dropKey}
          </ChoiceInput>
        ))}
      </LabelDisplayer>
    </Box>
  )
}

const LabelDisplayer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  > label {
    padding: 0.5rem 0;
  }
`

export function ByDropBoxDisplayer({
  criteria,
}: SearchRecapItemCriteriaProps<ByDropCriteria>) {
  if (!criteria?.dropLocations?.length) {
    return undefined
  }

  return (
    <SearchRecapItem title="drop location">
      {criteria.dropLocations.join(', ')}
    </SearchRecapItem>
  )
}

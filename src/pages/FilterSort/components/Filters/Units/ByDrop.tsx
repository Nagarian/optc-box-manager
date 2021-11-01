import styled from '@emotion/styled'
import Box from 'components/Box'
import ChoiceInput from 'components/forms/ChoiceInput'
import { SubTitle } from 'components/Title'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedDrop, ExtendedDropKeys, ExtendedUnit } from 'models/units'
import { BooleanFilterMapper } from 'services/filterHelper'

export type BookDrop = {
  eventIds: string[]
  unitIds: number[]
}

export interface ByDropCriteria {
  dropLocations?: ExtendedDrop[]
  bookDrop?: BookDrop
}

export const ByDropFilter = (criteria: ByDropCriteria) =>
  BooleanFilterMapper(
    [
      criteria.bookDrop?.unitIds?.length,
      (unit: ExtendedUnit) => criteria.bookDrop!.unitIds.includes(unit.dbId),
    ],
    [
      criteria.dropLocations?.length,
      (unit: ExtendedUnit) =>
        criteria.dropLocations!.some(dl => unit.dropLocations.includes(dl)),
    ],
  )

export function ByDropInput ({
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

import Box from 'components/Box'
import ImageInput from 'components/forms/ImageInput'
import Image from 'components/Image'
import { SubTitle, Text } from 'components/Title'
import {
  SearchFilterCriteria,
  SearchFilterCriteriaInputProps,
} from 'models/search'
import {
  ExtendedUnit,
  ExtendedDropKeys,
  ExtendedDrop,
  UnitType,
  UnitTypes,
} from 'models/units'
import React from 'react'
import { BookQuestDrops } from 'services/drops'
import { BooleanFilterMapper } from 'services/filterHelper'
import styled from 'styled-components'

export interface ByDropCriteria extends SearchFilterCriteria {
  dropLocations?: ExtendedDrop[]
  bookDrop?: BookDrop
}

export type BookDrop = {
  eventIds: string[]
  unitIds: number[]
}

export const ByDropFilter = (criteria: ByDropCriteria) =>
  BooleanFilterMapper(
    [
      criteria.bookDrop?.unitIds?.length,
      (unit: ExtendedUnit) => criteria.bookDrop!.unitIds.includes(unit.id),
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
          <label key={dropKey}>
            <input
              type="checkbox"
              name="unit-dropLocation"
              checked={criteria?.dropLocations?.includes(dropKey) ?? false}
              onChange={e => triggerCategoryChange(dropKey, e.target.checked)}
            />
            {dropKey}
          </label>
        ))}
      </LabelDisplayer>

      <SubTitle fontSize="2">Manuals Quests</SubTitle>
      {UnitTypes.map(type => (
        <ByBookQuest
          key={type}
          type={type}
          onChange={selected =>
            onChange({
              ...criteria,
              bookDrop: {
                eventIds: selected,
                unitIds: BookQuestDrops.filter(q =>
                  selected.includes(q.id),
                ).flatMap(q => q.manual),
              },
            })
          }
          selected={criteria?.bookDrop?.eventIds ?? []}
        />
      ))}
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

function ByBookQuest ({
  selected,
  type,
  onChange,
}: {
  type: UnitType
  selected: string[]
  onChange: (selected: string[]) => void
}) {
  return (
    <>
      <Text my="1">
        {type} Manual Acquirement Quests
      </Text>
      <Box display="flex" overflowX="auto">
        {BookQuestDrops.filter(quest => quest.category === type).map(
          dropEvent => (
            <ImageInput
              key={dropEvent.id}
              type="checkbox"
              name="bookDrop"
              checked={selected.includes(dropEvent.id)}
              onChange={() =>
                onChange(
                  selected.includes(dropEvent.id)
                    ? selected.filter(s => s !== dropEvent.id)
                    : [...selected, dropEvent.id],
                )
              }
            >
              <Image
                src={dropEvent.icon}
                alt={dropEvent.name}
                title={dropEvent.name}
                size="3"
              />
            </ImageInput>
          ),
        )}
      </Box>
    </>
  )
}

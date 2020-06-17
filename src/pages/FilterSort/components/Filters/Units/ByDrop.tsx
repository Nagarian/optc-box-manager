import Box from 'components/Box'
import ImageInput from 'components/forms/ImageInput'
import Image from 'components/Image'
import { SubTitle, Text } from 'components/Title'
import {
  SearchFilterCriteria,
  SearchFilterCriteriaInputProps,
} from 'models/search'
import { ExtendedUnit, ExtendedDropKeys, ExtendedDrop } from 'models/units'
import React, { useEffect, useState } from 'react'
import { FortnightDrops } from 'services/drops'
import { EventDrop } from 'models/drops'
import { BooleanFilterMapper } from 'services/filterHelper'

export interface ByDropCriteria extends SearchFilterCriteria {
  dropLocations?: ExtendedDrop[]
  fn?: {
    eventId: string
    unitIds: number[]
  }
}

export const ByDropFilter = (criteria: ByDropCriteria) =>
  BooleanFilterMapper(
    [
      criteria.fn?.unitIds?.length,
      (unit: ExtendedUnit) => criteria.fn!.unitIds.includes(unit.id),
    ],
    [
      criteria.dropLocations?.length,
      (unit: ExtendedUnit) =>
        criteria.dropLocations!.includes(unit.dropLocation),
    ],
  )

export function ByDropInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByDropCriteria>) {
  const [selected, setSelected] = useState<EventDrop>()

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

  useEffect(() => {
    setSelected(
      criteria?.fn?.eventId
        ? FortnightDrops.find(fn => fn.id === criteria!.fn!.eventId)
        : undefined,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criteria?.fn])

  return (
    <Box>
      <SubTitle fontSize="2">Drop Location</SubTitle>
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

      <SubTitle fontSize="2">Fortnight</SubTitle>
      <Box display="flex" overflowX="auto">
        {FortnightDrops.map((dropEvent, i) => (
          <ImageInput
            key={`${dropEvent.id}-${i}`}
            type="radio"
            name="fn-drops"
            checked={dropEvent === selected}
            onChange={() =>
              onChange({
                ...criteria,
                fn: {
                  eventId: dropEvent.id,
                  unitIds: dropEvent.manual.concat(dropEvent.units),
                },
              })
            }
          >
            <Image
              src={dropEvent.icon}
              alt={dropEvent.name}
              title={dropEvent.name}
              size="3"
            />
          </ImageInput>
        ))}
      </Box>

      {selected && <Text>{selected.name}</Text>}
    </Box>
  )
}

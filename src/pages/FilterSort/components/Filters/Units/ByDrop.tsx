import Box from 'components/Box'
import ImageInput from 'components/forms/ImageInput'
import Image from 'components/Image'
import { SubTitle, Text } from 'components/Title'
import {
  SearchFilterCriteria,
  SearchFilterCriteriaInputProps,
} from 'models/search'
import { ExtendedUnit } from 'models/units'
import React, { useEffect, useState } from 'react'
import { FortnightDrops } from 'services/drops'
import { EventDrop } from 'models/drops'

export interface ByDropCriteria extends SearchFilterCriteria {
  eventId: string
  unitIds: number[]
}

export const ByDropFilter = (criteria: ByDropCriteria) => (
  unit: ExtendedUnit,
) => criteria.unitIds.includes(unit.id)

export function ByDropInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByDropCriteria>) {
  const [selected, setSelected] = useState<EventDrop>()

  useEffect(() => {
    setSelected(criteria && FortnightDrops.find(fn => fn.id === criteria.eventId))
  }, [criteria])

  return (
    <Box>
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
                eventId: dropEvent.id,
                unitIds: dropEvent.manual.concat(dropEvent.units),
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

      {selected &&
        <Text>{selected.name}</Text>
      }
    </Box>
  )
}

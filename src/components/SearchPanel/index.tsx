import CharacterBox from 'components/CharacterBox'
import { useUnitFilters } from 'components/filters'
import { ExtendedUnit } from 'models/units'
import React from 'react'
import styled from 'styled-components'
import { flex, FlexProps, space, SpaceProps } from 'styled-system'

const ResultList = styled.div<SpaceProps & FlexProps>`
  ${flex}
  ${space}
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  overflow-y: auto;
`

type SearchPanelProps = {
  units: ExtendedUnit[]
  onUnitClick: (unit: ExtendedUnit) => void
}

export default function SearchPanel ({
  units,
  onUnitClick,
  ...rest
}: SearchPanelProps & SpaceProps & FlexProps) {
  const { filters } = useUnitFilters()

  return (
    <ResultList {...rest}>
      {units
        .filter(filters)
        .sort((u1, u2) => u2.id - u1.id)
        .slice(0, 50)
        .map(unit => (
          <CharacterBox
            key={unit.id}
            unit={unit}
            onClick={onUnitClick}
          />
        ))}
    </ResultList>
  )
}

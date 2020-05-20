import Button from 'components/Button'
import CharacterBox from 'components/CharacterBox'
import { useUnitFilters } from 'components/filters'
import { SubTitle, Title } from 'components/Title'
import { ExtendedUnit } from 'models/units'
import React, { useEffect, useRef, useState } from 'react'
import { Container, FormActionPanel, ResultList, SelectedList } from './styled'

type AddProps = {
  onCancel: () => void
  onSubmit: (selectUnits: ExtendedUnit[]) => void
  units: ExtendedUnit[]
}

export default function Add ({ onCancel, onSubmit, units }: AddProps) {
  const [selectedUnits, setSelectedUnits] = useState<ExtendedUnit[]>([])
  const { filters } = useUnitFilters()
  const selectedPanelRef = useRef<HTMLDivElement>(null)

  const toggle = (unit: ExtendedUnit, include: boolean) => {
    const newSelected = include
      ? [...selectedUnits, unit]
      : selectedUnits.filter(u => u.id !== unit.id)

    setSelectedUnits(newSelected)
  }

  useEffect(() => {
    if (selectedPanelRef.current) {
      selectedPanelRef.current.scrollTo({ left: selectedPanelRef.current.scrollWidth, behavior: 'smooth' })
    }
  }, [selectedUnits])

  return (
    <Container>
      <Title>Select your new units</Title>

      <ResultList>
        {units
          .filter(filters)
          .sort((u1, u2) => u2.id - u1.id)
          .map(unit => (
            <CharacterBox
              key={unit.id}
              unit={unit}
              onClick={u => toggle(u, !selectedUnits.includes(u))}
            />
          ))}
      </ResultList>

      {selectedUnits.length > 0 && (
        <>
          <SubTitle>Selected Units (click to remove it)</SubTitle>
          <SelectedList ref={selectedPanelRef}>
            {selectedUnits.map(unit => (
              <CharacterBox
                key={unit.id}
                unit={unit}
                onClick={() => toggle(unit, false)}
              />
            ))}
          </SelectedList>
        </>
      )}

      <hr />

      <FormActionPanel>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSubmit(selectedUnits)}>
          Confirm
        </Button>
      </FormActionPanel>
    </Container>
  )
}

import Button from 'components/Button'
import CharacterBox from 'components/CharacterBox'
import { useUnitFilters } from 'components/filters'
import { SubTitle, Title } from 'components/Title'
import { ExtendedUnit } from 'models/units'
import React, { useMemo, useState } from 'react'
import { DBUnit } from 'services/units'
import { Container, FormActionPanel, ResultList, SelectedList } from './styled'

type AddProps = {
  onCancel: () => void
  onSubmit: (selectUnits: ExtendedUnit[]) => void
}

export default function Add ({
  onCancel,
  onSubmit,
}: AddProps) {
  const units = useMemo(() => DBUnit.getAllUnits(), [])
  const [selectedUnits, setSelectedUnits] = useState<ExtendedUnit[]>([])
  const { filters } = useUnitFilters()

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
              onClick={u =>
                !selectedUnits.includes(u) &&
                setSelectedUnits([...selectedUnits, u])
              }
            />
          ))}
      </ResultList>

      {selectedUnits.length > 0 && (
        <>
          <SubTitle>Selected Units (click to remove it)</SubTitle>
          <SelectedList>
            {selectedUnits.map(unit => (
              <CharacterBox
                key={unit.id}
                unit={unit}
                onClick={unselected =>
                  setSelectedUnits(
                    selectedUnits.filter(u => u.id !== unselected.id),
                  )
                }
              />
            ))}
          </SelectedList>
        </>
      )}

      <hr />

      <FormActionPanel>
        <Button variant="secondary" onClick={() => onCancel()}>Cancel</Button>
        <Button variant="primary" onClick={() => onSubmit(selectedUnits)}>Confirm</Button>
      </FormActionPanel>
    </Container>
  )
}

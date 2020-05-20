import React, { useMemo, useState, useEffect } from 'react'
import { DBUnit } from 'services/units'
import CharacterBox from 'components/CharacterBox'
import { ExtendedUnit, UnitStar } from 'models/units'
import Button from 'components/Button'
import { Container, ResultList, SelectedList, FormActionPanel } from './styled'
import { Title, SubTitle } from 'components/Title'
import { useRainbowInput } from 'components/forms/RainbowInput'

type UnitFilter = (unit: ExtendedUnit) => boolean

const Filters = {
  hideUnEvolved: (unit: ExtendedUnit) => !unit.evolution,
  filterStar: (criteria: UnitStar[]) => (unit: ExtendedUnit) =>
    criteria.includes(unit.stars),
  globalOnly: (unit: ExtendedUnit) => !!unit.flags?.global,
}

export default function Add () {
  const units = useMemo(() => DBUnit.getAllUnits(), [])
  const [selectedUnits, setSelectedUnits] = useState<ExtendedUnit[]>([])
  const [filters, setFilters] = useState<UnitFilter[]>([])
  const [showAddSetting, setShowAddSetting] = useState<boolean>(false)
  const { IsRainbowedInput } = useRainbowInput()

  useEffect(() => {
    setFilters([
      Filters.hideUnEvolved,
      Filters.filterStar([4, 5, 6, '4+', '5+', '6+']),
    ])
  }, [])

  return (
    <Container>
      <Title>Select your new units</Title>

      <ResultList show={!showAddSetting}>
        {units
          .filter(unit => filters.some(f => f(unit)))
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

      {showAddSetting && (
        <>
          <SubTitle>Configure default value for all added units</SubTitle>
          <div>
            <IsRainbowedInput />
          </div>
        </>
      )}

      <hr />

      <FormActionPanel>
        <Button variant="secondary">Cancel</Button>
        <Button
          variant="secondary"
          onClick={() => setShowAddSetting(!showAddSetting)}
        >
          {showAddSetting ? 'Add new units' : 'Change Default value'}
        </Button>
        <Button variant="primary">Confirm</Button>
      </FormActionPanel>
    </Container>
  )
}

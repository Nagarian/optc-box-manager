import Button from 'components/Button'
import CharacterBox from 'components/CharacterBox'
import { FilterSortIcon } from 'components/Icon'
import Popup from 'components/Popup'
import SearchPanel from 'components/SearchPanel'
import { SubTitle } from 'components/Title'
import { DefaultSearch } from 'hooks/useSearch'
import { Search } from 'models/search'
import { ExtendedUnit } from 'models/units'
import FilterSort from 'pages/FilterSort'
import React, { useEffect, useRef, useState } from 'react'
import { SelectedList } from './styled'

type AddProps = {
  onCancel: () => void
  onSubmit: (selectUnits: ExtendedUnit[]) => void
  units: ExtendedUnit[]
}

export default function Add ({ onCancel, onSubmit, units }: AddProps) {
  const [selectedUnits, setSelectedUnits] = useState<ExtendedUnit[]>([])
  const selectedPanelRef = useRef<HTMLDivElement>(null)

  const toggle = (unit: ExtendedUnit, include: boolean) => {
    const newSelected = include
      ? [...selectedUnits, unit]
      : selectedUnits.filter(u => u.id !== unit.id)

    setSelectedUnits(newSelected)
  }

  useEffect(() => {
    if (selectedPanelRef.current) {
      selectedPanelRef.current.scrollTo({
        left: selectedPanelRef.current.scrollWidth,
        behavior: 'smooth',
      })
    }
  }, [selectedUnits])

  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [search, setSearch] = useState<Search>(DefaultSearch)

  return (
    <Popup
      title="Select your new units"
      onCancel={onCancel}
      onValidate={() => onSubmit(selectedUnits)}
      customAction={
        <Button
          onClick={() => setShowSettings(true)}
          icon={FilterSortIcon}
          title="Filter/Sort"
        />
      }
    >
      <SearchPanel
        search={search}
        units={units.filter(u => !selectedUnits.some(su => su.id === u.id))}
        onUnitClick={u => toggle(u, !selectedUnits.includes(u))}
        my="2"
        mx={[0, 2]}
        flex="1"
      />

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

      {showSettings && (
        <FilterSort
          unitOnly
          onCancel={() => setShowSettings(false)}
          search={search}
          onSubmit={s => {
            console.log(s)
            setSearch(s)
            setShowSettings(false)
          }}
        />
      )}
    </Popup>
  )
}

import Button from 'components/Button'
import CharacterBox from 'components/CharacterBox'
import { FilterSortIcon } from 'components/Icon'
import Popup from 'components/Popup'
import SearchPanel from 'components/SearchPanel'
import { SubTitle } from 'components/Title'
import { mergeSearch, useSavedSearch } from 'hooks/useSearch'
import { Search } from 'models/search'
import { ExtendedUnit } from 'models/units'
import FilterSort from 'pages/FilterSort'
import { BySearchBoxInput } from 'pages/FilterSort/components/Filters/Units/BySearchBox'
import { byId } from 'pages/FilterSort/components/Sorts/Units/ByCommon'
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
  const { search, setSearch } = useSavedSearch('addSettingSearch')

  return (
    <Popup
      title="Select your new units"
      onCancel={onCancel}
      onValidate={() => onSubmit([...selectedUnits].sort(byId))}
      customAction={
        <Button
          onClick={() => setShowSettings(true)}
          icon={FilterSortIcon}
          title="Filter/Sort"
        />
      }
    >

      <BySearchBoxInput
        criteria={search?.filters.units?.bySearchBox}
        onChange={criteria =>
          setSearch(
            mergeSearch(search, {
              filters: { units: { bySearchBox: criteria } },
            } as Search),
          )
        }
      />
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
            setSearch(s)
            setShowSettings(false)
          }}
        />
      )}
    </Popup>
  )
}

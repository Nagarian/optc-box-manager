import Button from 'components/Button'
import CharacterBox from 'components/CharacterBox'
import { FilterSortIcon } from 'components/Icon'
import Popup from 'components/Popup'
import SearchPanel from 'components/SearchPanel'
import { SubTitle } from 'components/Title'
import { DefaultSearch, mergeSearch, useSavedSearch } from 'hooks/useSearch'
import { Search } from 'models/search'
import { ExtendedUnit } from 'models/units'
import FilterSort from 'pages/FilterSort'
import {
  BySearchBoxCriteria,
  BySearchBoxInput,
} from 'pages/FilterSort/components/Filters/Units/BySearchBox'
import { ImageAnalyzer } from 'pages/FilterSort/components/ImageAnalyzer'
import { useEffect, useRef, useState } from 'react'
import { SelectedList } from './styled'

type AddProps = {
  saveKey?: string
  defaultSearch?: Search
  onCancel: () => void
  onSubmit: (selectUnits: ExtendedUnit[]) => void
  units: ExtendedUnit[]
  allowDuplicatedUnit?: boolean
}

export default function Add ({
  onCancel,
  onSubmit,
  units,
  saveKey = 'addSettingSearch',
  defaultSearch = DefaultSearch,
  allowDuplicatedUnit = false,
}: AddProps) {
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
  const { search, setSearch } = useSavedSearch(saveKey, defaultSearch)

  return (
    <Popup
      title="Select your new units"
      onCancel={onCancel}
      onValidate={() => onSubmit([...selectedUnits])}
      customAction={
        <>
          <Button
            onClick={() => setShowSettings(true)}
            icon={FilterSortIcon}
            title="Filter/Sort"
          />

          <ImageAnalyzer
            onCharacterSelected={ids =>
              setSelectedUnits(u => [
                ...u,
                ...ids.map(id => units.find(uu => uu.id === id)!).filter(u => !!u),
              ])
            }
          />
        </>
      }
    >
      <BySearchBoxInput
        criteria={search?.filters.units?.bySearchBox as BySearchBoxCriteria}
        onChange={criteria =>
          setSearch(
            mergeSearch(search, {
              filters: { units: { bySearchBox: criteria } },
            } as any),
          )
        }
      />
      <SearchPanel
        search={search}
        units={
          allowDuplicatedUnit
            ? units
            : units.filter(u => !selectedUnits.some(su => su.id === u.id))
        }
        onUnitClick={u =>
          toggle(u, allowDuplicatedUnit ? true : !selectedUnits.includes(u))
        }
        my="2"
        mx={[0, 2]}
      />

      {selectedUnits.length > 0 && (
        <>
          <SubTitle>Selected Units (click to remove it)</SubTitle>
          <SelectedList ref={selectedPanelRef}>
            {selectedUnits.map((unit, i) => (
              <CharacterBox
                key={`${unit.id}-${i}`}
                unit={unit}
                onClick={() =>
                  setSelectedUnits(selectedUnits.filter((u, j) => j !== i))
                }
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

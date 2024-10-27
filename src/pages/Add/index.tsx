import { Button } from 'components/Button'
import { CharacterBox } from 'components/CharacterBox'
import {
  DuplicateHideIcon,
  DuplicateShowIcon,
  SearchBuilderIcon,
} from 'components/Icon'
import { Popup } from 'components/Popup'
import { SearchPanel } from 'components/SearchPanel'
import { SubTitle } from 'components/Title'
import { DefaultSearch, mergeSearch, useSavedSearch } from 'hooks/useSearch'
import { useUserBox } from 'hooks/useUserBox'
import { Search } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { ImageAnalyzer } from 'pages/ImageAnalyzer'
import { SearchBuilder } from 'pages/SearchBuilder'
import {
  BySearchBoxCriteria,
  BySearchBoxInput,
} from 'pages/SearchBuilder/components/Filters/Units/BySearchBox'
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

export function Add({
  onCancel,
  onSubmit,
  units,
  saveKey = 'addSettingSearch',
  defaultSearch = DefaultSearch,
  allowDuplicatedUnit = false,
}: AddProps) {
  const [selectedUnits, setSelectedUnits] = useState<ExtendedUnit[]>([])
  const [showDuplicatedUnit, setShowDuplicatedUnit] =
    useState<boolean>(allowDuplicatedUnit)
  const selectedPanelRef = useRef<HTMLDivElement>(null)
  const { userBox } = useUserBox()

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

  const [showSearchBuilder, setShowSearchBuilder] = useState<boolean>(false)
  const { search, setSearch } = useSavedSearch(saveKey, defaultSearch)

  return (
    <Popup
      title="Select your new units"
      onCancel={onCancel}
      onValidate={() => onSubmit([...selectedUnits])}
      customAction={
        <>
          <Button
            onClick={() => setShowSearchBuilder(true)}
            icon={SearchBuilderIcon}
            title="Search builder"
          />

          {!allowDuplicatedUnit && (
            <Button
              onClick={() => {
                setShowDuplicatedUnit(s => !s)
              }}
              icon={showDuplicatedUnit ? DuplicateHideIcon : DuplicateShowIcon}
              title={
                showDuplicatedUnit
                  ? 'Disallow duplicated units'
                  : 'Allow duplicated units'
              }
            />
          )}

          <ImageAnalyzer
            onCharacterSelected={ids =>
              setSelectedUnits(u => [
                ...u,
                ...ids
                  .map(id => units.find(uu => uu.id === id) as ExtendedUnit)
                  .filter(u => !!u),
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
            }),
          )
        }
      />
      <SearchPanel
        search={search}
        units={
          showDuplicatedUnit
            ? units
            : units
                .filter(unit => !userBox.some(uu => uu.unit.id === unit.id))
                .filter(u => !selectedUnits.some(su => su.id === u.id))
        }
        onUnitClick={u =>
          toggle(u, showDuplicatedUnit ? true : !selectedUnits.includes(u))
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

      {showSearchBuilder && (
        <SearchBuilder
          unitOnly
          onCancel={() => setShowSearchBuilder(false)}
          search={search}
          resetSaveKey={saveKey}
          onSubmit={s => {
            setSearch(s)
            setShowSearchBuilder(false)
          }}
        />
      )}
    </Popup>
  )
}

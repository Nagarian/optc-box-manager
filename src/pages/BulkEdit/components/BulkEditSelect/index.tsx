import { Button } from 'components/Button'
import { CharacterBox } from 'components/CharacterBox'
import {
  ResetApplyIcon,
  ResetRemoveIcon,
  SearchBuilderIcon,
} from 'components/Icon'
import { Popup } from 'components/Popup'
import { SubTitle } from 'components/Title'
import { useSearch } from 'hooks/useSearch'
import { Search } from 'models/search'
import { UserUnit } from 'models/userBox'
import { MyUserBox } from 'pages/MyUserBox'
import { SearchBuilder } from 'pages/SearchBuilder'
import { useEffect, useRef, useState } from 'react'
import { SelectedList } from './styled'

type BulkEditSelectProps = {
  relatedSearch: Search
  onCancel: () => void
  onSubmit: (editedUserUnits: UserUnit[]) => void
  userUnits: UserUnit[]
}

export function BulkEditSelect({
  relatedSearch,
  onCancel,
  onSubmit,
  userUnits,
}: BulkEditSelectProps) {
  const [selected, setSelected] = useState<UserUnit[]>([])
  const selectedPanelRef = useRef<HTMLDivElement>(null)

  const toggle = (userUnit: UserUnit, include: boolean) => {
    const newSelected = include
      ? [...selected, userUnit]
      : selected.filter(u => u.id !== userUnit.id)

    setSelected(newSelected)
  }

  useEffect(() => {
    if (selectedPanelRef.current) {
      selectedPanelRef.current.scrollTo({
        left: selectedPanelRef.current.scrollWidth,
        behavior: 'smooth',
      })
    }
  }, [selected])

  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [s, setSearch] = useState<Search>(relatedSearch)
  const { search } = useSearch(s)

  return (
    <Popup
      title="Select your units - Step 2"
      onCancel={onCancel}
      onValidate={() => onSubmit(selected)}
      customAction={
        <>
          <Button
            onClick={() => setShowSettings(true)}
            icon={SearchBuilderIcon}
            title="Search builder"
          />
          {userUnits.filter(u => !selected.some(su => su.id === u.id))
            .length ? (
            <Button
              onClick={() =>
                setSelected([
                  ...selected,
                  ...userUnits.filter(
                    u => !selected.some(su => su.id === u.id),
                  ),
                ])
              }
              icon={ResetApplyIcon}
              title="Select All"
            />
          ) : (
            <Button
              onClick={() => setSelected([])}
              icon={ResetRemoveIcon}
              title="Unselect All"
            />
          )}
        </>
      }
    >
      <MyUserBox
        search={search}
        userBox={userUnits.filter(u => !selected.some(su => su.id === u.id))}
        onShowDetail={uu => toggle(uu, !selected.includes(uu))}
        my="2"
        mx={[0, 2]}
        flex="1"
      />

      {selected.length > 0 && (
        <>
          <SubTitle>Selected Units (click to remove it)</SubTitle>
          <SelectedList ref={selectedPanelRef}>
            {selected.map(userUnit => (
              <CharacterBox
                key={userUnit.id}
                userUnit={userUnit}
                onClick={() => toggle(userUnit, false)}
              />
            ))}
          </SelectedList>
        </>
      )}

      {showSettings && (
        <SearchBuilder
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

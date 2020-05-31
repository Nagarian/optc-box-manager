import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import Button from 'components/Button'
import { AddIcon, FilterSortIcon, SettingsIcon } from 'components/Icon'
import { useSavedSearch } from 'hooks/useSearch'
import useUserBox from 'hooks/useUserBox'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import Add from 'pages/Add'
import Detail from 'pages/Detail'
import FilterSort from 'pages/FilterSort'
import MyUserBox from 'pages/MyUserBox'
import Settings from 'pages/Settings'
import React, { useMemo, useState } from 'react'
import { DBUnit } from 'services/units'
import styled from 'styled-components'

const AppBlock = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
  min-width: ${themeGet('sizes.minimalRequired')};
  position: relative;
`

function App () {
  const unitDatabase = useMemo(() => DBUnit.getAllUnits(), [])
  const [showAddUnit, setShowAddUnit] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [showFilterSort, setShowFilterSort] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<UserUnit>()
  const { search, setSearch } = useSavedSearch()

  const myUserBox = useUserBox(unitDatabase)
  const { userBox, add, update, remove } = myUserBox

  const addSelectedUnits = (units: ExtendedUnit[]) => {
    add(...units)
    setShowAddUnit(false)
  }

  const updateUnit = (unit: UserUnit) => {
    update(unit)
    setShowDetail(undefined)
  }

  const deleteUnit = (id: string) => {
    remove(id)
    setShowDetail(undefined)
  }

  return (
    <AppBlock>
      <MyUserBox
        userBox={userBox}
        search={search}
        onAddUnit={() => setShowAddUnit(true)}
        onShowDetail={unit => setShowDetail(userBox.find(uu => uu.unit.id === unit.id)!)}
      />

      {showAddUnit && (
        <Add
          units={unitDatabase.filter(
            unit => !userBox.some(uu => uu.unit.id === unit.id),
          )}
          onCancel={() => setShowAddUnit(false)}
          onSubmit={addSelectedUnits}
        />
      )}

      {!!showDetail && (
        <Detail
          onCancel={() => setShowDetail(undefined)}
          onDelete={deleteUnit}
          onValidate={updateUnit}
          userUnit={showDetail}
        />
      )}

      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
          myUserBox={myUserBox}
        />
      )}

      {showFilterSort && (
        <FilterSort
          onCancel={() => setShowFilterSort(false)}
          onSubmit={search => {
            setSearch(search)
            setShowFilterSort(false)
          }}
          search={search}
        />
      )}

      <Box
        display="grid"
        gridAutoFlow="column"
        justifyContent="center"
        gridGap="4"
        py="2"
        boxShadow="none"
      >
        <Button onClick={() => setShowFilterSort(true)} icon={FilterSortIcon} />
        <Button onClick={() => setShowAddUnit(true)} icon={AddIcon} />
        <Button onClick={() => setShowSettings(true)} icon={SettingsIcon} />
      </Box>
    </AppBlock>
  )
}

export default App

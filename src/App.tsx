import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import Button from 'components/Button'
import { AddIcon, EditIcon, FilterSortIcon, SettingsIcon } from 'components/Icon'
import { useSavedSearch } from 'hooks/useSearch'
import useUserBox from 'hooks/useUserBox'
import { ExtendedUnit } from 'models/units'
import { UserUnit, UserUnitBulkEdit } from 'models/userBox'
import Add from 'pages/Add'
import BulkEdit from 'pages/BulkEdit'
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
  const [showBulkEdit, setShowBulkEdit] = useState<boolean>(false)
  const { search, setSearch } = useSavedSearch()

  const myUserBox = useUserBox(unitDatabase)
  const { userBox, add, update, bulkUpdate, remove } = myUserBox

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

  const editUnits = (userUnits: UserUnit[], edit: UserUnitBulkEdit) => {
    bulkUpdate(userUnits, edit)
    setShowBulkEdit(false)
  }

  return (
    <AppBlock>
      <MyUserBox
        userBox={userBox}
        search={search}
        onAddUnit={() => setShowAddUnit(true)}
        onShowDetail={userUnit => setShowDetail(userUnit)}
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

      {showBulkEdit && (
        <BulkEdit
          userUnits={userBox}
          onCancel={() => setShowBulkEdit(false)}
          onSubmit={editUnits}
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
        <Button
          onClick={() => setShowAddUnit(true)}
          icon={AddIcon}
          title="Add new units"
        />
        {userBox.length > 0 && (
          <Button
            onClick={() => setShowBulkEdit(true)}
            icon={EditIcon}
            title="Bulk edit"
          />
        )}
        <Button
          onClick={() => setShowFilterSort(true)}
          icon={FilterSortIcon}
          title="Filter/Sort"
        />
        <Button
          onClick={() => setShowSettings(true)}
          icon={SettingsIcon}
          title="Settings"
        />
      </Box>
    </AppBlock>
  )
}

export default App

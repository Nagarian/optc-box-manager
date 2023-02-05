import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import Button from 'components/Button'
import {
  AddIcon,
  EditIcon,
  FilterSortIcon,
  GatherIslandIcon,
  LogoIcon,
  SettingsIcon,
  SugoPullIcon,
} from 'components/Icon'
import { SubTitle, Title } from 'components/Title'
import { useOptcDb } from 'hooks/useOptcDb'
import { DefaultUserBoxSearch, mergeSearch, useSavedSearch } from 'hooks/useSearch'
import useUserBox from 'hooks/useUserBox'
import { ExtendedUnit } from 'models/units'
import { UserUnit, UserUnitBulkEdit } from 'models/userBox'
import Add from 'pages/Add'
import BulkEdit from 'pages/BulkEdit'
import Detail from 'pages/Detail'
import FilterSort from 'pages/FilterSort'
import {
  BySearchBoxCriteria,
  BySearchBoxInput,
} from 'pages/FilterSort/components/Filters/Units/BySearchBox'
import GatherIsland from 'pages/GatherIsland'
import MyUserBox from 'pages/MyUserBox'
import Settings from 'pages/Settings'
import SugoCleaner from 'pages/SugoCleaner'
import { useState } from 'react'

const AppBlock = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  min-width: ${themeGet('sizes.minimalRequired')};
  position: relative;
`

type DisplayedPanel =
  | 'add'
  | 'settings'
  | 'filters'
  | 'bulkedit'
  | 'sugocleaner'
  | 'gatherIsland'

function App () {
  const { db: unitDatabase } = useOptcDb()
  const [displayedPanel, setDisplayedPanel] = useState<DisplayedPanel>()
  const [showDetail, setShowDetail] = useState<UserUnit>()
  const { search, setSearch } = useSavedSearch('search', DefaultUserBoxSearch)

  const myUserBox = useUserBox()
  const {
    userBox,
    add,
    update,
    bulkUpdate,
    remove,
    isLoading,
    loadingStatus,
  } = myUserBox

  if (isLoading) {
    return (
      <AppBlock>
        <Box
          display="grid"
          placeItems="center"
          placeContent="center"
          height="inherit"
          bg="primary"
        >
          <LogoIcon size={5} m="3" />
          <Title color="primaryText">OPTC Box Manager</Title>
          <SubTitle color="primaryText">{loadingStatus}</SubTitle>
        </Box>
      </AppBlock>
    )
  }

  const closePanel = () => setDisplayedPanel(undefined)

  const addSelectedUnits = (units: ExtendedUnit[]) => {
    add(...units)
    closePanel()
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
    closePanel()
  }

  return (
    <AppBlock>
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
      <MyUserBox
        userBox={userBox}
        search={search}
        onAddUnit={() => setDisplayedPanel('add')}
        onShowDetail={userUnit => setShowDetail(userUnit)}
      />

      {displayedPanel === 'add' && (
        <Add
          units={unitDatabase}
          onCancel={closePanel}
          onSubmit={addSelectedUnits}
        />
      )}

      {!!showDetail && (
        <Detail
          onCancel={() => setShowDetail(undefined)}
          onDelete={deleteUnit}
          onValidate={updateUnit}
          userUnit={showDetail}
          units={unitDatabase}
        />
      )}

      {displayedPanel === 'settings' && (
        <Settings onClose={closePanel} myUserBox={myUserBox} />
      )}

      {displayedPanel === 'filters' && (
        <FilterSort
          onCancel={closePanel}
          resetSaveKey="box"
          onSubmit={search => {
            setSearch(search)
            closePanel()
          }}
          search={search}
        />
      )}

      {displayedPanel === 'bulkedit' && (
        <BulkEdit
          userUnits={userBox}
          onCancel={closePanel}
          onSubmit={editUnits}
        />
      )}

      {displayedPanel === 'sugocleaner' && (
        <SugoCleaner
          userBox={userBox}
          units={unitDatabase}
          onClose={closePanel}
          onUpdateUnit={updateUnit}
          onAddUnit={add}
        />
      )}

      {displayedPanel === 'gatherIsland' && (
        <GatherIsland onClose={closePanel} />
      )}

      <Box
        display="grid"
        gridAutoFlow="column"
        justifyContent="center"
        gridGap="3"
        py="2"
        boxShadow="none"
      >
        <Button
          onClick={() => setDisplayedPanel('add')}
          icon={AddIcon}
          title="Add new units"
        />
        {userBox.length > 0 && (
          <Button
            onClick={() => setDisplayedPanel('bulkedit')}
            icon={EditIcon}
            title="Bulk edit"
          />
        )}
        <Button
          onClick={() => setDisplayedPanel('filters')}
          icon={FilterSortIcon}
          title="Filter/Sort"
        />
        <Button
          onClick={() => setDisplayedPanel('sugocleaner')}
          icon={SugoPullIcon}
          title="Sugo Cleaner"
        />
        <Button
          onClick={() => setDisplayedPanel('settings')}
          icon={SettingsIcon}
          title="Extras"
        />
        <Button
          onClick={() => setDisplayedPanel('gatherIsland')}
          icon={GatherIslandIcon}
          title="Gather Island"
        />
      </Box>
    </AppBlock>
  )
}

export default App

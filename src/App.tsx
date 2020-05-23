import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import Button from 'components/Button'
import { AddIcon, SettingsIcon } from 'components/Icon'
import useUserBox from 'hooks/useUserBox'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import Add from 'pages/Add'
import Detail from 'pages/Detail'
import MyUserBox from 'pages/MyUserBox'
import Settings from 'pages/Settings'
import React, { useMemo, useState } from 'react'
import { DBUnit } from 'services/units'
import styled from 'styled-components'
import { size, SizeProps } from 'styled-system'

const AppBlock = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
  min-width: ${themeGet('sizes.minimalRequired')};
  position: relative;
`

const DummyBlock = styled('div')<SizeProps>(size)

function App () {
  const unitDatabase = useMemo(() => DBUnit.getAllUnits(), [])
  const [showAddUnit, setShowAddUnit] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<ExtendedUnit>()
  const { userBox, add, reset, update, remove } = useUserBox()

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
        units={unitDatabase}
        onAddUnit={() => setShowAddUnit(true)}
        onShowDetail={unit => setShowDetail(unit)}
      />

      {showAddUnit && (
        <Add
          units={unitDatabase.filter(
            unit => !userBox.some(uu => uu.unitId === unit.id),
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
          unit={showDetail}
          userUnit={userBox.find(uu => uu.unitId === showDetail.id)!}
        />
      )}

      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} onReset={reset} />
      )}

      <Box
        display="grid"
        gridAutoFlow="column"
        justifyContent="center"
        gridGap="4"
        py="2"
        boxShadow="none"
      >
        <DummyBlock size={2} />
        <Button onClick={() => setShowAddUnit(true)} icon={AddIcon} />
        <Button onClick={() => setShowSettings(true)} icon={SettingsIcon} />
      </Box>
    </AppBlock>
  )
}

export default App

import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import Button from 'components/Button'
import { AddSvg, SettingsSvg } from 'components/Icon'
import useUserBox from 'hooks/useUserBox'
import { ExtendedUnit } from 'models/units'
import Add from 'pages/Add'
import MyUserBox from 'pages/MyUserBox'
import Settings from 'pages/Settings'
import React, { useMemo, useState } from 'react'
import { DBUnit } from 'services/units'
import styled from 'styled-components'
import { size, SizeProps } from 'styled-system'

const AppBlock = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  height: 100vh;
  min-width: ${themeGet('sizes.minimalRequired')};
  position: relative;
`

const DummyBlock = styled('div')<SizeProps>(size)

function App () {
  const unitDatabase = useMemo(() => DBUnit.getAllUnits(), [])
  const [showAddUnit, setShowAddUnit] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const { userBox, add } = useUserBox()

  const addSelectedUnits = (units: ExtendedUnit[]) => {
    add(...units)
    setShowAddUnit(false)
  }

  return (
    <AppBlock>
      <MyUserBox
        userBox={userBox}
        units={unitDatabase}
        onAddUnit={() => setShowAddUnit(true)}
      />

      {showAddUnit && (
        <Add
          units={unitDatabase.filter(unit => !userBox.some(uu => uu.unitId === unit.id))}
          onCancel={() => setShowAddUnit(false)}
          onSubmit={addSelectedUnits}
        />
      )}

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}

      <Box
        display="grid"
        gridAutoFlow="column"
        justifyContent="center"
        gridGap="4"
        py="2"
        boxShadow="none"
      >
        <DummyBlock size={2} />
        <Button onClick={() => setShowAddUnit(true)} icon={AddSvg} />
        <Button onClick={() => setShowSettings(true)} icon={SettingsSvg} />
      </Box>
    </AppBlock>
  )
}

export default App

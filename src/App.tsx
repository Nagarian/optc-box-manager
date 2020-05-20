import { themeGet } from '@styled-system/theme-get'
import Button from 'components/Button'
import { AddSvg } from 'components/Icon'
import Popup from 'components/Popup'
import useUserBox from 'hooks/useUserBox'
import { ExtendedUnit } from 'models/units'
import Add from 'pages/Add'
import MyUserBox from 'pages/MyUserBox'
import React, { useMemo, useState } from 'react'
import { DBUnit } from 'services/units'
import styled from 'styled-components'

const AppBlock = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  height: 100vh;
  width: 100vw;
  min-width: ${themeGet('sizes.minimalRequired')};
  position: relative;
`

function App () {
  const unitDatabase = useMemo(() => DBUnit.getAllUnits(), [])
  const [showAddUnit, setShowAddUnit] = useState<boolean>(false)
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
        <Popup>
          <Add
            units={unitDatabase}
            onCancel={() => setShowAddUnit(false)}
            onSubmit={addSelectedUnits}
          />
        </Popup>
      )}

      {/* <Box
        backgroundColor="background"
        minWidth="minimalRequired"
        display="grid"
        gridTemplateRows="auto"
        gridAutoFlow="column"
        position={['fixed', 'static']}
        bottom={0}
        left={0}
        right={0}
        marginBottom={[0, 2]}
      >
        <MenuButton type="Box" label="Box" />
        <MenuButton type="Add" label="Add" />
        <MenuButton type="Settings" label="Settings" />

      </Box> */}
      <Button px="0" py="0" my="2" onClick={() => setShowAddUnit(true)}>
        <AddSvg size="2" fill="browns.1" color="oranges.0" />
      </Button>
    </AppBlock>
  )
}

export default App

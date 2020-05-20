import useUserBox from 'hooks/useUserBox'
import { ExtendedUnit } from 'models/units'
import Add from 'pages/Add'
import MyUserBox from 'pages/MyUserBox'
import React, { useMemo, useState } from 'react'
import { DBUnit } from 'services/units'
import styled from 'styled-components'
import { layout, LayoutProps, space, SpaceProps } from 'styled-system'

const AppBlock = styled.div<LayoutProps & SpaceProps>`
  ${layout}
  ${space}
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
    <AppBlock minWidth="minimalRequired" marginBottom="4">
      <MyUserBox
        userBox={userBox}
        units={unitDatabase}
        onAddUnit={() => setShowAddUnit(true)}
      />

      {showAddUnit && (
        <Add
          units={unitDatabase}
          onCancel={() => setShowAddUnit(false)}
          onSubmit={addSelectedUnits}
        />
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
    </AppBlock>
  )
}

export default App

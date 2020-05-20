import React, { useState } from 'react'
import Box from 'components/Box'
import Add from 'pages/Add'
import Button from 'components/Button'
import styled from 'styled-components'
import { layout, LayoutProps, SpaceProps, space } from 'styled-system'
import UserBox from 'pages/UserBox'

type DisplayedPanel = 'Box' | 'Add' | 'Settings'

const AppBlock = styled.div<LayoutProps & SpaceProps>`
  ${layout}
  ${space}
`

function App () {
  const [displayed, setDisplayed] = useState<DisplayedPanel>('Add')

  const MenuButton = ({
    type,
    label,
  }: {
    type: DisplayedPanel
    label: string
  }) => (
    <Button
      onClick={() => setDisplayed(type)}
      variant={displayed === type ? 'primary' : 'link'}
      py={2}
    >
      {label}
    </Button>
  )

  return (
    <AppBlock minWidth="minimalRequired" marginBottom="4">
      <Box
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
        {/* <Button px="0" py="0">
        <AddSvg size="2" fill="browns.1" color="oranges.0" />
      </Button> */}
      </Box>

      {displayed === 'Box' && <UserBox />}
      {displayed === 'Add' && <Add />}
    </AppBlock>
  )
}

export default App

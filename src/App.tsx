import React, { useState } from 'react'
import Box from 'components/Box'
import Add from 'pages/Add'
import Button from 'components/Button'
import styled from 'styled-components'
import { layout, LayoutProps } from 'styled-system'

type DisplayedPanel = 'Box' | 'Add' | 'Settings'

const AppBlock = styled.div<LayoutProps>`
  ${layout}
`

function App () {
  const [displayed, setDisplayed] = useState<DisplayedPanel>('Box')

  const MenuButton = ({ type, label }: { type: DisplayedPanel, label: string }) => (
    <Button
      onClick={() => setDisplayed(type)}
      variant={displayed === type ? 'primary' : 'link'}
    >
      {label}
    </Button>
  )

  return (
    <AppBlock minWidth="minimalRequired">
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
      >
        <MenuButton type="Box" label="Box" />
        <MenuButton type="Add" label="Add" />
        <MenuButton type="Settings" label="Settings" />
      </Box>

      {displayed === 'Add' && <Add />}
    </AppBlock>
  )
}

export default App

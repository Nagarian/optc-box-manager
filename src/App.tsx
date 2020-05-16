import React from 'react'
import Box from './components/Box'
import { units } from './services/units'

function App () {
  return (
    <Box margin="2" padding="1">
      {units.map((unit) => (
        <div>{unit.name}</div>
      ))}
    </Box>
  )
}

export default App

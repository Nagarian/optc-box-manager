import React, { useMemo } from 'react'
import Box from 'components/Box'
import { DBUnit } from 'services/units'
import Image from 'components/Image'

function App () {
  const units = useMemo(() => DBUnit.getAllUnits(), [])
  return (
    <Box margin="2" padding="1">
      {units.map((unit) => (
        <Image
          src={unit.images.thumbnail}
          alt={unit.name}
          key={unit.number}
          width="60"
          height="60"
        />
      ))}
    </Box>
  )
}

export default App

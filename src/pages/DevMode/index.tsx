import Box from 'components/Box'
import CharacterBox from 'components/CharacterBox'
import Popup from 'components/Popup'
import { Text } from 'components/Title'
import { useOptcDb } from 'hooks/useOptcDb'
import { useStorage } from 'hooks/useStorage'
import { ExtendedUnit } from 'models/units'
import { memo, ReactNode, useCallback, useState } from 'react'

type DevModeProps = {
  children: ReactNode
}
export default function DevMode ({
  children,
}: DevModeProps) {
  const [devModeEnabled] = useStorage<boolean>('devModeEnabled', false)
  const [selected, setSelected] = useState<ExtendedUnit>()
  const callback = useCallback(u => setSelected(u), [setSelected])

  if (!devModeEnabled) {
    return <>{children}</>
  }

  return (
    <Box>
      <Memoized onSelected={callback} />
      {selected && (
        <Popup onClose={() => setSelected(undefined)}>
          <Text
            as="textarea"
            fontSize="1"
            style={{ height: '100vh', resize: 'none' }}
          >
            {JSON.stringify(selected, null, 4)}
          </Text>
        </Popup>
      )}
    </Box>
  )
}

type DisplayerProps = {
  onSelected: (u: ExtendedUnit) => void
}
function Displayer ({
  onSelected,
}: DisplayerProps) {
  const { db } = useOptcDb()

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(12rem, 1fr))"
    >
      {db.map(unit => (
        <Box
          key={unit.id}
          display="grid"
          gridTemplateColumns="repeat(2,1fr)"
          placeItems="center"
        >
          <CharacterBox unit={unit} size="3" onClick={onSelected} />
          <Text>{unit.id}</Text>
        </Box>
      ))}
    </Box>
  )
}
const Memoized = memo(Displayer)

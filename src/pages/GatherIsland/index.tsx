import Popup from 'components/Popup'
import CottonCandyLimitEdit from './components/CottonCandyLimitEdit'
import React from 'react'

type GatherIslandProps = {
  onClose: () => void
}
export default function GatherIsland ({ onClose }: GatherIslandProps) {
  return (
    <Popup title="Gather Island" onClose={onClose}>
      <CottonCandyLimitEdit />
    </Popup>
  )
}

import { Popup } from 'components/Popup'
import { CottonCandyLimitEdit } from './components/CottonCandyLimitEdit'

type GatherIslandProps = {
  onClose: () => void
}
export function GatherIsland({ onClose }: GatherIslandProps) {
  return (
    <Popup title="Gather Island" onClose={onClose}>
      <CottonCandyLimitEdit />
    </Popup>
  )
}

import { UserUnitCottonCandy } from 'models/userBox'
import InfoDisplayer from './InfoDisplayer'

export type CottonCandyDisplayerProps = {
  cc?: UserUnitCottonCandy
}
export default function CottonCandyDisplayer({
  cc,
}: CottonCandyDisplayerProps) {
  if (!cc) return null
  const sum = cc.atk + cc.hp + cc.rcv
  if (!sum) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="top" color="yellow">
      +{sum}
    </InfoDisplayer>
  )
}

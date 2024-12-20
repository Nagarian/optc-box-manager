import { Box } from 'components/Box'
import { Image } from 'components/Image'
import { InfoDisplayer } from 'components/InfoDisplayer'
import {
  UserShipModification,
  UserShipModificationStatRank,
} from 'models/shipBox'
import { getShipStatRank } from 'services/userShips'
import ShipStar1 from './images/dockyard_ship_star_1.png'
import ShipStar2 from './images/dockyard_ship_star_2.png'
import ShipStar3 from './images/dockyard_ship_star_3.png'
import ShipStar4 from './images/dockyard_ship_star_4.png'
import ShipStar5 from './images/dockyard_ship_star_5.png'

type ShipModificationDisplayerProps = {
  modification?: UserShipModification
}
export function ShipModificationDisplayer({
  modification,
}: ShipModificationDisplayerProps) {
  if (!modification) {
    return null
  }

  const { atk, hp, rcv } = modification

  if (atk.rank === 0 && hp.rank === 0 && rcv.rank === 0) {
    return null
  }

  return (
    <InfoDisplayer anchorX="middle" anchorY="top">
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)">
        <Image
          src={skillLevelToImage(getShipStatRank(hp))}
          alt="HP"
          size="1.4rem"
        />
        <Image
          src={skillLevelToImage(getShipStatRank(atk))}
          alt="ATK"
          size="1.4rem"
        />
        <Image
          src={skillLevelToImage(getShipStatRank(rcv))}
          alt="RCV"
          size="1.4rem"
        />
      </Box>
    </InfoDisplayer>
  )
}

function skillLevelToImage(rank: UserShipModificationStatRank) {
  switch (rank) {
    case 1:
      return ShipStar1
    case 2:
      return ShipStar2
    case 3:
      return ShipStar3
    case 4:
      return ShipStar4
    case 5:
      return ShipStar5
    default:
      return ShipStar1
  }
}

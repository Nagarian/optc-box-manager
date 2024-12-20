import { Box } from 'components/Box'
import { Image } from 'components/Image'
import { InfoDisplayer } from 'components/InfoDisplayer'
import { Progression } from 'components/Progression'
import { UserShip } from 'models/shipBox'
import IconBase from './images/dockyard_convert_icon_base.png'
import Icon from './images/dockyard_convert_icon_on.png'
import IconBaseRed from './images/dockyard_convert_icon_red.png'
import IconRed from './images/dockyard_convert_icon_red_on.png'

type ShipLevelDisplayerProps = {
  userShip: UserShip
}
export function ShipLevelDisplayer({
  userShip: {
    level,
    ship: { levels },
  },
}: ShipLevelDisplayerProps) {
  const Base = level > 10 ? IconBaseRed : IconBase
  const IconContent = level > 10 ? IconRed : Icon

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom">
      <Box display="grid" gridTemplateColumns="1fr 1fr">
        <Image src={Base} alt="HP" size="1.4rem" gridArea="1 / 1" />
        <Image src={IconContent} alt="HP" size="1.4rem" gridArea="1 / 1" />
        <Progression
          max={levels.length}
          value={level}
          isExtended={level > 10}
          color="white"
          variant="no-max"
        />
      </Box>
    </InfoDisplayer>
  )
}

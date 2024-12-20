import styled from '@emotion/styled'
import {
  UserShipModificationStat,
  UserShipModificationStatRank,
} from 'models/shipBox'
import { layout, LayoutProps } from 'styled-system'
import { cleanStyledSystem } from 'styles'
import MedalHp1 from './images/dockyard_icon_medal_1_1.png'
import MedalAtk1 from './images/dockyard_icon_medal_1_2.png'
import MedalRcv1 from './images/dockyard_icon_medal_1_3.png'
import MedalHp2 from './images/dockyard_icon_medal_2_1.png'
import MedalAtk2 from './images/dockyard_icon_medal_2_2.png'
import MedalRcv2 from './images/dockyard_icon_medal_2_3.png'
import MedalHp3 from './images/dockyard_icon_medal_3_1.png'
import MedalAtk3 from './images/dockyard_icon_medal_3_2.png'
import MedalRcv3 from './images/dockyard_icon_medal_3_3.png'
import MedalHp4 from './images/dockyard_icon_medal_4_1.png'
import MedalAtk4 from './images/dockyard_icon_medal_4_2.png'
import MedalRcv4 from './images/dockyard_icon_medal_4_3.png'
import MedalHp5 from './images/dockyard_icon_medal_5_1.png'
import MedalAtk5 from './images/dockyard_icon_medal_5_2.png'
import MedalRcv5 from './images/dockyard_icon_medal_5_3.png'

type ShipMedalType = 'hp' | 'atk' | 'rcv'

type ShipMedalProps = {
  type: ShipMedalType
  stat: UserShipModificationStat
  isDirty?: boolean
}

export function ShipMedal({
  type,
  stat: { rank, value },
  isDirty = false,
  ...props
}: ShipMedalProps & LayoutProps) {
  return (
    <Svg viewBox="0 0 180 68" {...props}>
      <image xlinkHref={shipModificationStatToImage(type, rank)} x={0} y={0} />
      <SvgText x={110} y={40}>
        {value}
        <DirtyIndicator>{isDirty ? '*' : ''}</DirtyIndicator>
      </SvgText>
    </Svg>
  )
}

const Svg = styled('svg', cleanStyledSystem)(layout)

const SvgText = styled.text`
  fill: ${p => p.theme.colors.white};
  font-size: ${p => p.theme.fontSizes[3]};
`

const DirtyIndicator = styled.text`
  fill: ${p => p.theme.colors.red};
`

function shipModificationStatToImage(
  type: ShipMedalType,
  rank: UserShipModificationStatRank,
) {
  switch (type) {
    case 'hp':
      switch (rank) {
        case 0:
        case 1:
          return MedalHp1
        case 2:
          return MedalHp2
        case 3:
          return MedalHp3
        case 4:
          return MedalHp4
        case 5:
          return MedalHp5
      }
    // eslint-disable-next-line no-fallthrough
    case 'atk':
      switch (rank) {
        case 0:
        case 1:
          return MedalAtk1
        case 2:
          return MedalAtk2
        case 3:
          return MedalAtk3
        case 4:
          return MedalAtk4
        case 5:
          return MedalAtk5
      }
    // eslint-disable-next-line no-fallthrough
    case 'rcv':
      switch (rank) {
        case 0:
        case 1:
          return MedalRcv1
        case 2:
          return MedalRcv2
        case 3:
          return MedalRcv3
        case 4:
          return MedalRcv4
        case 5:
          return MedalRcv5
      }
    // eslint-disable-next-line no-fallthrough
    default:
      return MedalHp1
  }
}

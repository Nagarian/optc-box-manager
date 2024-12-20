import styled from '@emotion/styled'
import { Image } from 'components/Image'
import { UserShip } from 'models/shipBox'
import { gridArea, GridAreaProps, SizeProps } from 'styled-system'
import { place, PlaceProps } from 'styles'
import { ShipLevelDisplayer } from './components/ShipLevelDisplayer'
import { ShipModificationDisplayer } from './components/ShipModificationDisplayer'

type UserBoatBoxProps = {
  userShip: UserShip
  onClick?: (unit: UserShip) => void
}

export type BoatBoxStyledProps = GridAreaProps & PlaceProps & SizeProps

type BtnSpecificStyle = {
  isObtained: boolean
}

export function BoatBox({
  onClick,
  userShip,
  size = '4',
  ...rest
}: UserBoatBoxProps & BoatBoxStyledProps) {
  const {
    ship: {
      id,
      name,
      images: { thumbnail },
    },
    obtained,
  } = userShip

  return (
    <Btn
      {...rest}
      title={`${id} - ${name}`}
      onClick={() => onClick?.(userShip)}
      isObtained={obtained}
    >
      <Image src={thumbnail} alt={name} size={size} loading="lazy" />
      <ShipModificationDisplayer modification={userShip.modification} />
      <ShipLevelDisplayer userShip={userShip} />
    </Btn>
  )
}

const Btn = styled.button<BoatBoxStyledProps & BtnSpecificStyle>`
  padding: 0;
  position: relative;
  display: flex;
  filter: ${p => (p.isObtained ? undefined : 'brightness(0.5)')};
  ${gridArea}
  ${place}
`

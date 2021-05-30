import styled from '@emotion/styled'
import { UnitPirateFestStyle } from 'models/units'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import Attacker from './images/Attacker.png'
import Defender from './images/Defender.png'
import Healer from './images/Healer.png'
import Obstructer from './images/Obstructer.png'
import Supporter from './images/Supporter.png'

export function UnitPirateFestStyleToImage (type: UnitPirateFestStyle) {
  switch (type) {
    case 'ATK':
      return Attacker
    case 'DEF':
      return Defender
    case 'RCV':
      return Healer
    case 'DBF':
      return Obstructer
    case 'SPT':
      return Supporter
    default:
      return undefined
  }
}

export type PirateFestStyleIconProps = SpaceProps &
  SizeProps & {
    type: UnitPirateFestStyle
  }

const BasePirateFestStyleIcon = styled.img<SpaceProps & SizeProps>`
  object-fit: contain;
  ${space}
  ${size}
`

export function PirateFestStyleIcon ({ type, ...p }: PirateFestStyleIconProps) {
  return (
    <BasePirateFestStyleIcon
      {...p}
      src={UnitPirateFestStyleToImage(type)}
      title={type}
    />
  )
}

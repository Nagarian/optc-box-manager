import styled from '@emotion/styled'
import { UnitPirateFestStyle } from 'models/units'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import Attacker from './images/filter_style_icon_01.png'
import Defender from './images/filter_style_icon_02.png'
import Healer from './images/filter_style_icon_03.png'
import Supporter from './images/filter_style_icon_04.png'
import Obstructer from './images/filter_style_icon_05.png'

export function UnitPirateFestStyleToImage(type: UnitPirateFestStyle) {
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

export function PirateFestStyleIcon({ type, ...p }: PirateFestStyleIconProps) {
  return (
    <BasePirateFestStyleIcon
      {...p}
      src={UnitPirateFestStyleToImage(type)}
      title={type}
    />
  )
}

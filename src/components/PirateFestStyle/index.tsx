import { UnitPirateFestStyle } from 'models/units'
import styled from 'styled-components'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import Attacker from './images/Attacker.png'
import Defender from './images/Defender.png'
import Healer from './images/Healer.png'
import Obstructer from './images/Obstructer.png'
import Supporter from './images/Supporter.png'

export function UnitPirateFestStyleToImage (type: UnitPirateFestStyle) {
  switch (type) {
    case 'Attacker':
      return Attacker
    case 'Defender':
      return Defender
    case 'Healer':
      return Healer
    case 'Obstructer':
      return Obstructer
    case 'Supporter':
      return Supporter
    default:
      return undefined
  }
}

export type PirateFestStyleIconProps = SpaceProps &
  SizeProps & {
    type: UnitPirateFestStyle
  }

export const PirateFestStyleIcon = styled.img.attrs<{ type: UnitPirateFestStyle }>(p => ({
  src: UnitPirateFestStyleToImage(p.type),
  title: p.type,
})) <PirateFestStyleIconProps>`
  object-fit: contain;
  ${space}
  ${size}
`

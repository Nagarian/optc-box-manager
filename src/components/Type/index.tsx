import { UnitType } from 'models/units'
import styled from 'styled-components'
import {
  size,
  SizeProps,
  space,
  SpaceProps,
} from 'styled-system'
import DEX from './images/DEX.png'
import DUAL from './images/DUAL.png'
import INT from './images/INT.png'
import PSY from './images/PSY.png'
import QCK from './images/QCK.png'
import STR from './images/STR.png'
import VS from './images/VS.png'

export function TypeToImage (type: UnitType) {
  switch (type) {
    case 'STR':
      return STR
    case 'DEX':
      return DEX
    case 'QCK':
      return QCK
    case 'PSY':
      return PSY
    case 'INT':
      return INT
    case 'DUAL':
      return DUAL
    case 'VS':
      return VS
    default:
      return undefined
  }
}

export type TypeProps = SpaceProps &
  SizeProps & {
    value: UnitType
  }

const Type = styled.img.attrs<TypeProps>(p => ({
  src: TypeToImage(p.value),
  title: p.value,
}))<TypeProps>`
  object-fit: contain;
  ${space}
  ${size}
`
Type.defaultProps = {
  size: 2,
}

export default Type

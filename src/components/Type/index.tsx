import styled from '@emotion/styled'
import { UnitType } from 'models/units'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import DEX from './images/DEX.png'
import DUAL from './images/DUAL.png'
import INT from './images/INT.png'
import PSY from './images/PSY.png'
import QCK from './images/QCK.png'
import STR from './images/STR.png'
import VS from './images/VS.png'

export function TypeToImage(type: UnitType) {
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

const BaseType = styled.img<SpaceProps & SizeProps>`
  object-fit: contain;
  ${space}
  ${size}
`

function Type({ value, ...p }: TypeProps) {
  return <BaseType {...p} src={TypeToImage(value)} title={value} />
}

Type.defaultProps = {
  size: 2,
}

export default Type

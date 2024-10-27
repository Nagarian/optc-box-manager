import styled from '@emotion/styled'
import { UnitType } from 'models/units'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import PSY from './images/filter_attribute_heart.png'
import INT from './images/filter_attribute_intellect.png'
import DUAL from './images/filter_attribute_multiplecharacter.png'
import STR from './images/filter_attribute_power.png'
import QCK from './images/filter_attribute_speed.png'
import DEX from './images/filter_attribute_technical.png'
import VS from './images/filter_attribute_vs.png'

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

export function Type({ value, size = 2, ...p }: TypeProps) {
  return <BaseType size={size} {...p} src={TypeToImage(value)} title={value} />
}

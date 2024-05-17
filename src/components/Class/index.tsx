import styled from '@emotion/styled'
import { UnitClass } from 'models/units'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import Fighter from './images/filter_type_icn_1.png'
import Slasher from './images/filter_type_icn_2.png'
import Striker from './images/filter_type_icn_3.png'
import Shooter from './images/filter_type_icn_4.png'
import FreeSpirit from './images/filter_type_icn_5.png'
import Driven from './images/filter_type_icn_6.png'
import Cerebral from './images/filter_type_icn_7.png'
import Powerhouse from './images/filter_type_icn_8.png'

export function ClassToImage(type: UnitClass) {
  switch (type) {
    case 'Cerebral':
      return Cerebral
    case 'Driven':
      return Driven
    case 'Fighter':
      return Fighter
    case 'Free Spirit':
      return FreeSpirit
    case 'Powerhouse':
      return Powerhouse
    case 'Shooter':
      return Shooter
    case 'Slasher':
      return Slasher
    case 'Striker':
      return Striker
    default:
      return undefined
  }
}

export type UnitClassIconProps = SpaceProps &
  SizeProps & {
    type: UnitClass
  }

const ClassIcon = styled.img<SpaceProps & SizeProps>`
  object-fit: contain;
  ${space}
  ${size}
`

export function UnitClassIcon({ type, ...p }: UnitClassIconProps) {
  return <ClassIcon src={ClassToImage(type)} title={type} {...p} />
}

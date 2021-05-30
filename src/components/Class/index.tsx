import styled from '@emotion/styled'
import { UnitClass } from 'models/units'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import Cerebral from './images/cerebral.png'
import Driven from './images/driven.png'
import Fighter from './images/fighter.png'
import FreeSpirit from './images/free_spirit.png'
import Powerhouse from './images/powerhouse.png'
import Shooter from './images/shooter.png'
import Slasher from './images/slasher.png'
import Striker from './images/striker.png'

export function ClassToImage (type: UnitClass) {
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

export function UnitClassIcon ({ type, ...p }: UnitClassIconProps) {
  return <ClassIcon src={ClassToImage(type)} title={type} {...p} />
}

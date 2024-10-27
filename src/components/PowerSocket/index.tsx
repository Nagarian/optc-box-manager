import styled from '@emotion/styled'
import { Image } from 'components/Image'
import { PowerSocketKey } from 'models/units'
import { ElementType, memo } from 'react'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import { cleanStyledSystem } from 'styles'
import ImageSkill01 from './images/teamskill_icon_001.png'
import ImageSkill02 from './images/teamskill_icon_002.png'
import ImageSkill03 from './images/teamskill_icon_003.png'
import ImageSkill04 from './images/teamskill_icon_004.png'
import ImageSkill05 from './images/teamskill_icon_005.png'
import ImageSkill06 from './images/teamskill_icon_006.png'
import ImageSkill07 from './images/teamskill_icon_007.png'
import ImageSkill08 from './images/teamskill_icon_008.png'
import ImageSkill09 from './images/teamskill_icon_009.png'
import ImageSkill10 from './images/teamskill_icon_010.png'
import ImageFrame from './images/teamskill_iconframe_l.png'

export function PowerSocketToImage(type: PowerSocketKey | undefined) {
  switch (type) {
    case 'Damage Reduction':
      return ImageSkill01
    case 'Charge Specials':
      return ImageSkill02
    case 'Bind Resistance':
      return ImageSkill03
    case 'Despair Resistance':
      return ImageSkill04
    case 'Auto-Heal':
      return ImageSkill05
    case 'RCV Boost':
      return ImageSkill06
    case 'Slot Rate Boost':
      return ImageSkill07
    case 'Poison Resistance':
      return ImageSkill08
    case 'Map Damage Resistance':
      return ImageSkill09
    case 'Resilience':
      return ImageSkill10
  }
}

type PowerSocketProps = SpaceProps &
  SizeProps & {
    type?: PowerSocketKey
    hideChrome?: boolean
    isFocused?: boolean
  }

const Container = styled('div', cleanStyledSystem)<
  SizeProps & { isFocused: boolean }
>`
  ${space}
  ${size}
  display: grid;
  place-items: stretch;
  grid-template: 100% / 100%;

  > * {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
    ${p => p.isFocused && 'filter: drop-shadow(0 0 1rem);'}
  }
`

function BasePowerSocket({
  type,
  size = 3,
  hideChrome,
  isFocused,
  ...rest
}: PowerSocketProps) {
  const src = PowerSocketToImage(type)
  return (
    <Container size={size} isFocused={isFocused ?? false} {...rest}>
      {!hideChrome && <Image src={ImageFrame} />}
      {src && (
        <Image
          src={src}
          margin={!hideChrome ? '20%' : ''}
          title={type}
          alt={type}
        />
      )}
    </Container>
  )
}
export const PowerSocket = memo(BasePowerSocket)

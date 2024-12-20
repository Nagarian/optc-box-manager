import styled from '@emotion/styled'
import { Image } from 'components/Image'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import { cleanStyledSystem } from 'styles'
import Icon from './images/shipskill_icon_001.png'
import Frame from './images/shipskill_iconframe.png'

type ShipSkillProps = {
  hideChrome?: boolean
  isUnlocked?: boolean
}

export function ShipSkill({
  size = 3,
  hideChrome,
  ...rest
}: ShipSkillProps & SpaceProps & SizeProps) {
  return (
    <Container size={size} {...rest}>
      {!hideChrome && <Image src={Frame} />}
      <Image src={Icon} margin={!hideChrome ? '20%' : ''} />
    </Container>
  )
}

const Container = styled('div', cleanStyledSystem)<SizeProps & ShipSkillProps>`
  ${space}
  ${size}
  display: grid;
  place-items: stretch;
  grid-template: 100% / 100%;
  filter: ${p => p.isUnlocked === false && 'brightness(0.5)'};

  > * {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
  }
`

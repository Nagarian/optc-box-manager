import styled from '@emotion/styled'
import Image from 'components/Image'
import { PotentialKey } from 'models/units'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import { cleanStyledSystem } from 'styles'
import NoIcon from './images/panel_limitbreak_001.png'
import ImageFrame from './images/potentialskill_iconframe.png'
import ImageSkill01 from './images/potentialskill_icon_s_001.png'
import ImageSkill02 from './images/potentialskill_icon_s_002.png'
import ImageSkill03 from './images/potentialskill_icon_s_003.png'
import ImageSkill04 from './images/potentialskill_icon_s_004.png'
import ImageSkill05 from './images/potentialskill_icon_s_005.png'
import ImageSkill06 from './images/potentialskill_icon_s_006.png'
import ImageSkill07 from './images/potentialskill_icon_s_007.png'
import ImageSkill08 from './images/potentialskill_icon_s_008.png'
import ImageSkill10 from './images/potentialskill_icon_s_010.png'
import ImageSkill11 from './images/potentialskill_icon_s_011.png'
import ImageSkill12 from './images/potentialskill_icon_s_012.png'
import ImageSkill13 from './images/potentialskill_icon_s_013.png'
import ImageSkill14 from './images/potentialskill_icon_s_014.png'
import ImageSkill15 from './images/potentialskill_icon_s_015.png'
import ImageSkill16 from './images/potentialskill_icon_s_016.png'
import ImageSkill18 from './images/potentialskill_icon_s_018.png'
import ImageSkill19 from './images/potentialskill_icon_s_019.png'
import ImageSkill20 from './images/potentialskill_icon_s_020.png'
import ImageSkill21 from './images/potentialskill_icon_s_021.png'

export function PotentialAbilityToImage (type: PotentialKey) {
  switch (type) {
    case 'Reduce Slot Bind duration':
      return ImageSkill01
    case 'Reduce No Healing duration':
      return ImageSkill02
    case 'Barrier Penetration':
      return ImageSkill03
    case 'Pinch Healing':
      return ImageSkill04
    case 'Enrage':
      return ImageSkill05
    case 'Critical Hit':
      return ImageSkill06
    case 'Cooldown Reduction':
      return ImageSkill07
    case 'Double Special Activation':
      return ImageSkill08
    case '[STR] Damage Reduction':
      return ImageSkill10
    case '[DEX] Damage Reduction':
      return ImageSkill11
    case '[QCK] Damage Reduction':
      return ImageSkill12
    case '[PSY] Damage Reduction':
      return ImageSkill13
    case '[INT] Damage Reduction':
      return ImageSkill14
    case 'Reduce Sailor Despair duration':
      return ImageSkill15
    case 'Reduce Ship Bind duration':
      return ImageSkill16
    case 'Reduce Slot Barrier duration':
      return ImageSkill18
    case 'Reduce Healing Reduction duration':
      return ImageSkill19
    case 'Nutrition/Reduce Hunger duration':
      return ImageSkill20
    case 'Last Tap':
      return ImageSkill21
    default:
      return NoIcon
  }
}

type PotentialAbilityProps = SpaceProps &
  SizeProps & {
    type: PotentialKey
    hideChrome?: boolean
  }

const Container = styled('div', cleanStyledSystem)<SizeProps>`
  ${space}
  ${size}
  display: grid;
  place-items: stretch;
  grid-template: 100% / 100%;

  > * {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
  }
`

export default function PotentialAbility ({
  type,
  size = 3,
  hideChrome,
  ...rest
}: PotentialAbilityProps) {
  const src = PotentialAbilityToImage(type)
  return (
    <Container size={size} {...rest}>
      {!hideChrome && <Image src={ImageFrame} />}
      {src && (
        <Image src={src} margin={!hideChrome ? '20%' : ''} title={type} />
      )}
    </Container>
  )
}

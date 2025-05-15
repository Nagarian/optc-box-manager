import styled from '@emotion/styled'
import { Image } from 'components/Image'
import { PotentialKey } from 'models/units'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import { cleanStyledSystem } from 'styles'
import NoIcon from './images/panel_limitbreak_001.png'
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
import ImageSkill19 from './images/potentialskill_icon_s_019.png'
import ImageSkill20 from './images/potentialskill_icon_s_020.png'
import ImageSkill21 from './images/potentialskill_icon_s_021.png'
import ImageSkill22 from './images/potentialskill_icon_s_022.png'
import ImageSkill23 from './images/potentialskill_icon_s_023.png'
import ImageSkill24 from './images/potentialskill_icon_s_024.png'
import ImageSkill25 from './images/potentialskill_icon_s_025.png'
import ImageSkill26 from './images/potentialskill_icon_s_026.png'
import ImageSkill27 from './images/potentialskill_icon_s_027.png'
import ImageSkill28 from './images/potentialskill_icon_s_028.png'
import ImageSkill100 from './images/potentialskill_icon_s_100.png'
import ImageFrame from './images/potentialskill_iconframe.png'

export function PotentialAbilityToImage(type: PotentialKey) {
  switch (type) {
    case 'Reduce Slot Bind duration':
      return ImageSkill01
    case 'Reduce No Healing duration':
      return ImageSkill02
    case 'Barrier Penetration':
      return ImageSkill03
    case 'Pinch Healing':
      return ImageSkill04
    case 'Enrage/Reduce Increase Damage Taken duration':
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
      return ImageSkill20
    case 'Reduce Ship Bind duration':
      return ImageSkill19
    case 'Reduce Special Use Limit duration':
      return ImageSkill21
    case 'Reduce Slot Barrier duration':
      return ImageSkill22
    case 'Reduce Healing Reduction duration':
      return ImageSkill23
    case 'Nutrition/Reduce Hunger stacks':
      return ImageSkill24
    case 'Last Tap':
      return ImageSkill100
    case 'Super Tandem':
      return ImageSkill25
    case 'Last Tap / Super Tandem':
      return ImageSkill27
    case 'Triple Special Activation':
      return ImageSkill26
    case 'Rush':
      return ImageSkill28
    case 'Super Tandem Boost':
      return NoIcon
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

export function PotentialAbility({
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

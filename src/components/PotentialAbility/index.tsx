import React from 'react'
import Image from 'components/Image'
import { PotentialKey } from 'models/units'
import styled from 'styled-components'
import { SpaceProps, space, size, SizeProps } from 'styled-system'
import shouldForwardProp from '@styled-system/should-forward-prop'

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
import ImageFrame from './images/potentialskill_iconframe.png'

function TypeToImage (type: PotentialKey) {
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
    default:
      return undefined
  }
}

type PotentialAbilityProps = SpaceProps &
  SizeProps & {
    type: PotentialKey
  }

const Container = styled('div').withConfig({
  shouldForwardProp: (p) => shouldForwardProp(p),
})<SizeProps>`
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
  ...rest
}: PotentialAbilityProps) {
  const src = TypeToImage(type)
  return (
    <Container size={size} {...rest}>
      <Image src={ImageFrame} />
      {src && <Image src={src} margin="20%" />}
    </Container>
  )
}

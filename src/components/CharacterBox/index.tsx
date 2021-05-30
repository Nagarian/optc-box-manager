import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'
import Image from 'components/Image'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import {
  SearchDisplayerBuilder,
  SearchDisplayerCriteria,
} from 'pages/FilterSort/components/Displayers'
import { gridArea, GridAreaProps, SizeProps } from 'styled-system'
import { place, PlaceProps } from 'styles'
import CottonCandyDisplayer from './components/CottonCandyDisplayer'
import LimitBreakDisplayer from './components/LimitBreakDisplayer'
import Ink from './images/ink.png'
import InkMax from './images/inkmax.png'
import Support from './images/support.png'
import SupportMax from './images/supportmax.png'

type CharacterBoxProps = {
  unit?: ExtendedUnit
  userUnit?: UserUnit
  onClick?: (unit: ExtendedUnit) => void
  displayer?: SearchDisplayerCriteria
}

type BtnProps = {
  support?: string
  ink?: string
  rainbow?: string
}

const rainbowCss = (p: BtnProps) => css`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 0.7rem solid;
    border-image-slice: 1;
    border-image-source: ${themeGet(`colors.specific.${p.rainbow}`)(p)};
    opacity: 0.9;
  }
`

const computeBackground = ({ support, ink }: BtnProps) => {
  const background: string[] = []

  if (support) background.push(`url(${support}) center / contain no-repeat`)
  if (ink) background.push(`url(${ink}) center / contain no-repeat`)

  return background.join(',')
}

const afterCss = (p: BtnProps) => css`
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${computeBackground(p)};
  }
`

export type CharacterBoxStyledProps = GridAreaProps & PlaceProps & SizeProps

const Btn = styled.button<BtnProps & CharacterBoxStyledProps>`
  padding: 0;
  background-color: ${themeGet('primary')};
  position: relative;
  display: flex;
  ${afterCss}
  ${p => p.rainbow && rainbowCss}
  ${gridArea}
  ${place}
`

export default function CharacterBox ({
  unit: u,
  userUnit,
  onClick,
  displayer,
  size = '4',
  ...rest
}: CharacterBoxProps & CharacterBoxStyledProps) {
  const unit: ExtendedUnit = userUnit?.unit ?? u!
  const support = userUnit?.support?.lvl
  const ink = userUnit?.ink?.lvl

  const InfoDisplayer =
    displayer && SearchDisplayerBuilder[displayer.type].displayer
  return (
    <Btn
      {...rest}
      support={
        support !== undefined ? (support > 0 ? SupportMax : Support) : undefined
      }
      ink={ink === 2 ? InkMax : ink === 1 ? Ink : undefined}
      rainbow={getRainbowState(userUnit)}
      title={`${unit.id} - ${unit.name}`}
      onClick={() => onClick?.(unit)}
    >
      <Image src={unit.images.thumbnail} alt={unit.name} size={size} />
      <CottonCandyDisplayer cc={userUnit?.cc} />
      {userUnit && InfoDisplayer && (
        <InfoDisplayer userUnit={userUnit} options={displayer?.options} />
      )}

      <LimitBreakDisplayer limitBreak={userUnit?.limitBreak} />
    </Btn>
  )
}

function getRainbowState (userUnit?: UserUnit) {
  if (!userUnit || !userUnit.potentials.length || !userUnit.limitBreak) {
    return undefined
  }

  if (
    userUnit.limitBreak.keyLvlMax &&
    userUnit.limitBreak.lvl === userUnit.limitBreak.keyLvlMax &&
    userUnit.potentials.every(p => p.lvl === 5)
  ) {
    return 'rainbowPlus'
  }

  if (
    userUnit.limitBreak.lvl >= userUnit.limitBreak.lvlMax &&
    userUnit.potentials.filter(p => !p.keyState).every(p => p.lvl === 5)
  ) {
    return 'rainbow'
  }

  return undefined
}

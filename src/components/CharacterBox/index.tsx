import styled from '@emotion/styled'
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
  unit: ExtendedUnit
  userUnit?: never
  onClick?: (unit: ExtendedUnit) => void
  displayer?: SearchDisplayerCriteria
}

type UserCharacterBoxProps = {
  unit?: never
  userUnit: UserUnit
  onClick?: (unit: UserUnit) => void
  displayer?: SearchDisplayerCriteria
}

type BtnProps = {
  support?: string
  ink?: string
  rainbow?: string
}

export type CharacterBoxStyledProps = GridAreaProps & PlaceProps & SizeProps

export default function CharacterBox({
  unit: u,
  userUnit,
  onClick,
  displayer,
  size = '4',
  ...rest
}: (CharacterBoxProps | UserCharacterBoxProps) & CharacterBoxStyledProps) {
  const [unit, callback] = userUnit
    ? [userUnit.unit, () => onClick?.(userUnit)]
    : [u, () => onClick?.(u)]

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
      onClick={callback}
    >
      <Image
        src={unit.images.thumbnail}
        alt={unit.name}
        size={size}
        loading="lazy"
      />
      <CottonCandyDisplayer cc={userUnit?.cc} />
      {userUnit && InfoDisplayer && (
        <InfoDisplayer userUnit={userUnit} options={displayer?.options} />
      )}

      <LimitBreakDisplayer limitBreak={userUnit?.limitBreak} />
    </Btn>
  )
}

function getRainbowState(userUnit?: UserUnit) {
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

const computeBackground = ({ support, ink }: BtnProps) => {
  const background: string[] = []

  if (support) background.push(`url(${support}) center / contain no-repeat`)
  if (ink) background.push(`url(${ink}) center / contain no-repeat`)

  return background.join(',')
}

const Btn = styled.button<BtnProps & CharacterBoxStyledProps>`
  padding: 0;
  background-color: ${p => p.theme.colors.primary};
  position: relative;
  display: flex;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${computeBackground};
  }
  &:before {
    content: ${p => p.rainbow && "''"};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 0.7rem solid;
    border-image-slice: 1;
    border-image-source: ${p => p.theme.colors.specific.rainbow};
    opacity: 0.9;
  }
  ${gridArea}
  ${place}
`

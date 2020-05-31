import { themeGet } from '@styled-system/theme-get'
import Image from 'components/Image'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import React from 'react'
import styled, { css } from 'styled-components'
import { gridArea, GridAreaProps } from 'styled-system'
import { place, PlaceProps } from 'styles'
import Support from './images/support.png'
import SupportMax from './images/supportmax.png'

type CharacterBoxProps = {
  unit: ExtendedUnit
  userUnit?: UserUnit
  onClick?: (unit: ExtendedUnit) => void
}

type BtnProps = {
  support?: string
  rainbow: boolean
}

const rainbowCss = css`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 0.7rem solid;
    border-image-slice: 1;
    border-image-source: ${themeGet('colors.specific.rainbow')};
    opacity: 0.7;
  }
`

const supportCss = css<BtnProps>`
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${p => p.support}) center / contain no-repeat;
  }
`

export type CharacterBoxStyledProps = GridAreaProps & PlaceProps

const Btn = styled.button<BtnProps & CharacterBoxStyledProps>`
  padding: 0;
  background-color: ${themeGet('primary')};
  position: relative;
  display: flex;
  ${p => p.support && supportCss}
  ${p => p.rainbow && rainbowCss}
  ${gridArea}
  ${place}
`

export default function CharacterBox ({
  unit,
  userUnit,
  onClick,
  ...rest
}: CharacterBoxProps & CharacterBoxStyledProps) {
  const support = userUnit?.support?.lvl

  return (
    <Btn
      {...rest}
      support={
        support !== undefined ? (support > 0 ? SupportMax : Support) : undefined
      }
      rainbow={
        (userUnit?.potentials.length ?? 0) > 0 &&
        !userUnit?.potentials.some(p => p.lvl < 5)
      }
      onClick={() => onClick?.(unit)}
    >
      <Image
        src={unit.images.thumbnail}
        alt={unit.name}
        title={unit.name}
        size="4"
      />
    </Btn>
  )
}

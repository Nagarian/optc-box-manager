import { themeGet } from '@styled-system/theme-get'
import Image from 'components/Image'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import React from 'react'
import styled, { css } from 'styled-components'
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

const Btn = styled.button<BtnProps>`
  padding: 0;
  background-color: ${themeGet('primary')};
  position: relative;
  display: flex;
  ${p => p.support && supportCss}
  ${p => p.rainbow && rainbowCss}
`

export default function CharacterBox ({
  unit,
  userUnit,
  onClick,
}: CharacterBoxProps) {
  const support = userUnit?.support?.lvl

  return (
    <Btn
      support={
        support !== undefined
          ? support > 0
            ? SupportMax
            : Support
          : undefined
      }
      rainbow={!(userUnit?.potentials.some(p => p.lvl < 5) ?? true)}
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

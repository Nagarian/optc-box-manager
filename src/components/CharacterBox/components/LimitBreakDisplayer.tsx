import { UserUnitLimitBreak } from 'models/userBox'
import React from 'react'
import styled from 'styled-components'
import { color, ColorProps } from 'styled-system'
import LimitBreak from '../images/limitbreak.png'

export type LimitBreakDisplayerProps = {
  limitBreak?: UserUnitLimitBreak
}
export default function LimitBreakDisplayer ({
  limitBreak,
}: LimitBreakDisplayerProps) {
  if (!limitBreak || limitBreak.lvl === 0) return null
  const { lvl, lvlMax, keyLvlMax } = limitBreak

  const isMaxed = lvl === lvlMax || lvl === keyLvlMax
  const isKeyUnlocked = lvl > lvlMax

  return (
    <>
      <Panel isKeyUnlocked={isKeyUnlocked} />
      <Displayer color='white'>
        {isMaxed ? 'MAX' : lvl}
      </Displayer>
    </>
  )
}

const Panel = styled.span<{ isKeyUnlocked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: .2rem;
  background: url(${LimitBreak}) center / contain no-repeat;
  filter: ${p => p.isKeyUnlocked && 'hue-rotate(320deg)'};
`

const Displayer = styled.span<ColorProps>`
  position: absolute;
  top: 0;
  right: 0;
  width: 4ch;
  margin-top: .8rem;
  margin-right: .4rem;
  font-weight: bold;
  text-align: center;
  font-size: 0.8em;
  ${color}
`

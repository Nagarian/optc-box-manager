import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { color } from 'styled-system'

export const Max = styled.span.attrs(() => ({
  children: 'Max',
}))`
  text-transform: uppercase;
  font-weight: bold;
  ${color};
`

Max.defaultProps = {
  color: 'primaryText',
}

export const Displayer = styled.label`
  display: flex;
  align-items: center;

  span {
    width: 5ch;
    text-align: left;
  }
`

type InputLabelProps = {
  value: number
  max: number
  children: ReactNode
}

export function InputLabel ({ value, max, children }: InputLabelProps) {
  return (
    <Displayer>
      {value === max ? <Max /> : <span>{value}</span>}
      {children}
    </Displayer>
  )
}

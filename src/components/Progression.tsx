import React from 'react'
import styled from 'styled-components'
import {
  color,
  ColorProps,
  width,
  WidthProps,
} from 'styled-system'
import { Text } from './Title'

export const Max = styled.span<WidthProps & ColorProps>`
  text-transform: uppercase;
  font-weight: bold;
  ${color};
  ${width};
`
Max.defaultProps = {
  color: 'primaryText',
  children: 'Max',
}

export type ProgressionProps = ColorProps & {
  value: number
  max: number
  variant?: 'normal' | 'spaced'
}
export default function Progression ({
  value,
  max,
  variant = 'normal',
  color = 'text',
}: ProgressionProps) {
  return value === max ? (
    <Max width="5ch" />
  ) : (
    <Text
      as="span"
      width="5ch"
      color={color as any}
      fontWeight={variant === 'spaced' ? 'bold' : undefined}
    >
      {value}
      {variant === 'spaced' ? ' / ' : '/'}
      {max}
    </Text>
  )
}

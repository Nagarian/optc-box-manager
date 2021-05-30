import styled from '@emotion/styled'
import { color, ColorProps, width, WidthProps } from 'styled-system'
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
  if (value === max) {
    return <Max width="5ch" />
  }

  return (
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

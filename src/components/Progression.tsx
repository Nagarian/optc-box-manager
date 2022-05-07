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
  variant?: 'normal' | 'spaced' | 'no-max'
  isExtended?: boolean
}
export default function Progression ({
  value,
  max,
  variant = 'normal',
  color = 'text',
  isExtended = false,
}: ProgressionProps) {
  if (value === max) {
    return <Max width="5ch" color={isExtended ? 'red' : 'primaryText'} />
  }

  return (
    <Text
      as="span"
      minWidth="5ch"
      color={isExtended ? 'red' : (color as any)}
      fontWeight={variant !== 'normal' ? 'bold' : undefined}
    >
      {variant === 'normal' && `${value}/${max}`}
      {variant === 'spaced' && `${value} / ${max}`}
      {variant === 'no-max' && `${value}`}
    </Text>
  )
}

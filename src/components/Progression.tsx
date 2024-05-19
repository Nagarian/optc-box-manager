import styled from '@emotion/styled'
import { color, ColorProps, width, WidthProps } from 'styled-system'
import { Text } from './Title'

export type ProgressionProps = ColorProps & {
  value: number
  max: number
  maxIcon?: string
  prefix?: string
  variant?: 'normal' | 'spaced' | 'no-max'
  isExtended?: boolean
  isDirty?: boolean
}
export default function Progression({
  value,
  max,
  maxIcon,
  prefix,
  variant = 'normal',
  color = 'text',
  isExtended = false,
  isDirty = false,
}: ProgressionProps) {
  if (value === max) {
    return maxIcon ? (
      <Image src={maxIcon} />
    ) : (
      <Max width="5ch" color={isExtended ? 'red' : 'primaryText'}>
        Max{isDirty && <DirtyIndicator />}
      </Max>
    )
  }

  return (
    <Text
      as="span"
      minWidth="5ch"
      color={isExtended ? 'red' : (color as string)}
      fontWeight={variant !== 'normal' ? 'bold' : undefined}
    >
      {prefix}
      {variant === 'normal' && `${value}/${max}`}
      {variant === 'spaced' && `${value} / ${max}`}
      {variant === 'no-max' && `${value}`}
      {isDirty && <DirtyIndicator />}
    </Text>
  )
}

const DirtyIndicator = () => (
  <Text as="span" color="red">
    {'*'}
  </Text>
)

const Max = styled.span<WidthProps & ColorProps>`
  text-transform: uppercase;
  font-weight: bold;
  display: inline;
  ${color};
  ${width};
`

const Image = styled.img`
  filter: drop-shadow(0 0 1px black);
`

import Box from 'components/Box'
import { SubTitle } from 'components/Title'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { color, ColorProps, width, WidthProps } from 'styled-system'

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

function Progression ({ value, max }: { value: number; max: number }) {
  return value === max ? (
    <Max width="5ch" />
  ) : (
    <Max width="5ch" color="text">
      {value} / {max}
    </Max>
  )
}

type InputLabelProps = {
  value: number
  max: number
  name: ReactNode
  descriptions?: string[] | ReactNode[]
  children: ReactNode
}

export function InputLabel ({
  name,
  descriptions,
  value,
  max,
  children,
}: InputLabelProps) {
  return (
    <Box display="flex" flexDirection="column">
      <Box my="2">
        <SubTitle fontSize="1" marginBottom="2">
          {name} (<Progression value={value} max={max} />)
        </SubTitle>

        {descriptions && (
          <div>
            {descriptions.length > 1 && <strong>max: </strong>}
            {descriptions[descriptions.length - 1]}
          </div>
        )}

        {descriptions && descriptions.length > 1 && value > 0 && value < max && (
          <div>
            <strong>Level {value}: </strong>
            {descriptions[value]}
          </div>
        )}
      </Box>
      {children}
    </Box>
  )
}

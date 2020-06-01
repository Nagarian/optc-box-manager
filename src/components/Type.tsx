import { themeGet } from '@styled-system/theme-get'
import { UnitType } from 'models/units'
import React from 'react'
import styled from 'styled-components'
import { compose, fontSize, FontSizeProps, size, SizeProps, space, SpaceProps } from 'styled-system'

const Container = styled.div<TypeProps>`
  background-color: ${p => themeGet('colors.orb.' + p.value)};
  border-radius: 50%;
  color: ${themeGet('colors.white')};
  display: flex;
  align-items: center;
  justify-content: center;
  ${compose(size, fontSize, space)}
`

export type TypeProps = SizeProps & FontSizeProps & SpaceProps & {
  value: UnitType
}
export default function Type ({ value, ...rest }: TypeProps) {
  return (
    <Container value={value} {...rest}>
      {value}
    </Container>
  )
}
Type.defaultProps = {
  size: 2,
  fontSize: 2,
}

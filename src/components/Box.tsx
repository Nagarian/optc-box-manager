import styled, { StyledComponent } from 'styled-components'
import {
  background,
  BackgroundColorProps,
  BackgroundProps,
  color,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  border,
  BorderProps,
} from 'styled-system'
import { cleanStyledSystem } from 'styles'

export type BoxProps = SpaceProps &
  LayoutProps &
  ShadowProps &
  BackgroundProps &
  BackgroundColorProps &
  GridProps &
  PositionProps &
  FlexboxProps &
  BorderProps

export type BoxStyledProps = StyledComponent<'div', any, BoxProps, never>

const Box: BoxStyledProps = styled.div.withConfig(cleanStyledSystem)<BoxProps>`
  ${border}
  ${layout}
  ${shadow}
  ${background}
  ${color}
  ${space}
  ${grid}
  ${position}
  ${flexbox}
`

export default Box

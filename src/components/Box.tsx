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
  compose,
} from 'styled-system'
import { cleanStyledSystem, place, PlaceProps } from 'styles'

export type BoxProps = SpaceProps &
  LayoutProps &
  ShadowProps &
  BackgroundProps &
  BackgroundColorProps &
  GridProps &
  PositionProps &
  FlexboxProps &
  BorderProps &
  PlaceProps

export type BoxStyledProps = StyledComponent<'div', any, BoxProps, never>

const Box: BoxStyledProps = styled.div.withConfig(cleanStyledSystem)<BoxProps>(
  compose(
    border,
    layout,
    shadow,
    background,
    color,
    space,
    grid,
    position,
    flexbox,
    place,
  ),
)

export default Box

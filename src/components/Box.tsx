import styled from '@emotion/styled'
import {
  background,
  BackgroundColorProps,
  BackgroundProps,
  border,
  BorderProps,
  color,
  compose,
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
} from 'styled-system'
import { cleanStyledSystem, gap, GapProps, place, PlaceProps } from 'styles'

export type BoxProps = SpaceProps &
  LayoutProps &
  ShadowProps &
  BackgroundProps &
  BackgroundColorProps &
  GridProps &
  PositionProps &
  FlexboxProps &
  BorderProps &
  PlaceProps &
  GapProps

export const Box = styled(
  'div',
  cleanStyledSystem,
)<BoxProps>(
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
    gap,
  ),
)

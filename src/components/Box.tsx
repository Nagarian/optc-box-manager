import styled from 'styled-components'
import {
  background,
  BackgroundColorProps,
  BackgroundProps,
  color,
  layout,
  LayoutProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  GridProps,
  grid,
  position,
  PositionProps,
  flex,
  FlexboxProps,
} from 'styled-system'

const Box = styled.div<
  SpaceProps &
    LayoutProps &
    ShadowProps &
    BackgroundProps &
    BackgroundColorProps &
    GridProps &
    PositionProps &
    FlexboxProps
>`
  ${shadow}
  ${space}
  ${layout}
  ${background}
  ${color}
  ${grid}
  ${flex}
  ${position}
`

Box.defaultProps = {
  boxShadow: 'normal',
}

export default Box

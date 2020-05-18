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
} from 'styled-system'

const Box = styled.div<
  SpaceProps &
    LayoutProps &
    ShadowProps &
    BackgroundProps &
    BackgroundColorProps &
    GridProps &
    PositionProps
>`
  ${shadow}
  ${space}
  ${layout}
  ${background}
  ${color}
  ${grid}
  ${position}
`

Box.defaultProps = {
  boxShadow: 'small',
}

export default Box

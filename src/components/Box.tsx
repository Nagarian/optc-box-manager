import styled from 'styled-components'
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
} from 'styled-system'
import { cleanStyledSystem } from 'styles'

const Box = styled.div.withConfig(cleanStyledSystem)<
  SpaceProps &
    LayoutProps &
    ShadowProps &
    BackgroundProps &
    BackgroundColorProps &
    GridProps &
    PositionProps &
    FlexboxProps
>`
  ${layout}
  ${shadow}
  ${background}
  ${color}
  ${space}
  ${grid}
  ${position}
  ${flexbox}
`

Box.defaultProps = {
  boxShadow: 'normal',
}

export default Box

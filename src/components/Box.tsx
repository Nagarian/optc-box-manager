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
} from 'styled-system'

const Box = styled.div<
  SpaceProps &
    LayoutProps &
    ShadowProps &
    BackgroundProps &
    BackgroundColorProps
>`
  ${shadow}
  ${space}
  ${layout}
  ${background}
  ${color}
`

Box.defaultProps = {
  boxShadow: 'small',
}

export default Box

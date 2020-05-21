import { themeGet } from '@styled-system/theme-get'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

const Popup = styled.div.attrs(({ onClick }) => ({
  onClick: event => event.currentTarget === event.target && onClick?.(event),
}))<SpaceProps>`
  min-width: ${themeGet('sizes.minimalRequired')};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  ${space}
  display: grid;
`

Popup.defaultProps = {
  px: [3, 5],
  py: [4, 5],
}

export default Popup

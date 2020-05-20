import { themeGet } from '@styled-system/theme-get'
import styled from 'styled-components'

const Popup = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  padding: ${themeGet('sizes.2')};
  display: grid;
`

export default Popup

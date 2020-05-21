import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

export const PopupBackground = styled.div<SpaceProps>`
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
  place-content: center;
`

export const PopupContainer = styled(Box)<SpaceProps>`
  background-color: ${themeGet('colors.background')};
  display: flex;
  flex-direction: column;
  place-items: center;
  overflow: hidden;
  ${space}
`

export const PopupActionPanel = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: ${themeGet('sizes.2')};
  justify-content: center;
`

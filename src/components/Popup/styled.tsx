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
  align-content: center;
  justify-items: center;
`

export const PopupContainer = styled(Box)<SpaceProps>`
  background-color: ${themeGet('colors.background')};
  width: 100%;
  max-width: 80rem;
  display: flex;
  flex-direction: column;
  place-items: stretch;
  overflow: hidden;
  border-radius: .5rem;
  ${space}
  box-shadow: ${themeGet('shadows.normal')};
`

export const PopupPanel = styled(Box)<SpaceProps>`
  display: flex;
  flex-direction: column;
  place-items: stretch;
  overflow-y: auto;
  ${space}
`

export const PopupActionPanel = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-evenly;
`

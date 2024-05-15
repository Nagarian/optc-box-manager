import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import { space, SpaceProps } from 'styled-system'
import { BounceIn, FadeIn } from 'styles/animation'

export const PopupBackground = styled.div<SpaceProps>`
  min-width: ${themeGet('sizes.minimalRequired')};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${themeGet('colors.popupBackground')}B3;
  z-index: 1;
  ${space}
  display: grid;
  align-content: center;
  justify-items: center;
  animation: 200ms ${FadeIn};
`

export const PopupContainer = styled(Box)<SpaceProps>`
  background-color: ${themeGet('colors.background')};
  width: 100%;
  max-width: 80rem;
  max-height: 100%;
  margin: auto;
  ${space}
  display: flex;
  flex-direction: column;
  place-items: stretch;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: ${themeGet('shadows.normal')};
  animation: 250ms ${BounceIn};
`

export const PopupPanel = styled(Box)<SpaceProps & { autosize?: boolean }>`
  display: flex;
  flex-direction: column;
  place-items: stretch;
  overflow-y: auto;
  ${p => !p.autosize && 'min-height: 60vh;'}
  ${space}
`

export const PopupActionPanel = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-evenly;
`

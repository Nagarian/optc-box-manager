import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import styled from 'styled-components'

export const Container = styled(Box)`
  margin: ${themeGet('space.2')};
  padding: ${themeGet('space.2')};
  background-color: ${themeGet('colors.background')};
  display: flex;
  flex-direction: column;
  place-items: center;
  max-height: calc(100vh - 5rem);
  overflow: hidden;
`

export const SelectedList = styled('div')`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  width: 100%;
`

export const FormActionPanel = styled.div`
  display: flex;
`

import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import styled from 'styled-components'

export const Container = styled(Box)`
  margin: ${themeGet('space.2')};
  padding: ${themeGet('space.2')};
  display: flex;
  flex-direction: column;
  place-items: center;
  max-height: calc(100vh - 5rem);
  overflow: hidden;
`

export const ResultList = styled('div')`
  margin: ${themeGet('space.2')};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
`

export const SelectedList = styled('div')`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  flex: 1 0;
  width: 100%;
`

export const FormActionPanel = styled.div`
  display: flex;
`

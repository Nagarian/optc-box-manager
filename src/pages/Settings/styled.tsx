import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import styled from 'styled-components'

export const Container = styled(Box)`
  padding: ${themeGet('space.2')};
  background-color: ${themeGet('colors.background')};
  display: flex;
  flex-direction: column;
  place-items: center;
  overflow: hidden;
`

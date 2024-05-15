import styled from '@emotion/styled'
import Box from 'components/Box'

export const Container = styled(Box)`
  padding: ${p => p.theme.space[2]};
  background-color: ${p => p.theme.colors.background};
  display: flex;
  flex-direction: column;
  place-items: center;
  overflow: hidden;
`

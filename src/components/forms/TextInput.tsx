import styled from '@emotion/styled'
import { flex, FlexProps, space, SpaceProps } from 'styled-system'

export const TextInput = styled.input<SpaceProps & FlexProps>`
  padding: ${p => p.theme.space[1]};
  font-size: ${p => p.theme.fontSizes[1]};
  border-bottom: ${p =>
    `solid ${p.theme.colors.grey} ${p.theme.borderWidths.thin}`};
  border-radius: 0;
  transition: border-color 250ms;
  color: ${p => p.theme.colors.text};
  ${flex}
  ${space}

  :focus {
    border-color: ${p => p.theme.colors.secondaryText};
  }

  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
`

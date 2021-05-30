import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'
import { flex, FlexProps, space, SpaceProps } from 'styled-system'

export const TextInput = styled.input<SpaceProps & FlexProps>`
  padding: ${themeGet('space.1')};
  font-size: ${themeGet('fontSizes.1')};
  border-bottom: solid ${themeGet('colors.grey')} ${themeGet('borderWidths.thin')};
  border-radius: 0;
  transition: border-color 250ms;
  color: ${themeGet('colors.text')};
  ${flex}
  ${space}

  :focus {
    border-color: ${themeGet('colors.secondaryText')};
  }

  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
`

import { themeGet } from '@styled-system/theme-get'
import styled from 'styled-components'
import { SpaceProps } from 'styled-system'

export const TextInput = styled.input<SpaceProps>`
  padding: ${themeGet('space.1')};
  font-size: ${themeGet('fontSizes.1')};
  border-bottom: solid ${themeGet('colors.grey')} ${themeGet('borderWidths.thin')};
  border-radius: 0;
  transition: border-color 250ms;
  color: ${themeGet('colors.text')};

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

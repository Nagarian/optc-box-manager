import { themeGet } from '@styled-system/theme-get'
import Image from 'components/Image'
import styled from 'styled-components'
import { display, DisplayProps } from 'styled-system'

export const ImageFull = styled(Image)<DisplayProps>`
  background-color: ${themeGet('colors.primary')};
  object-fit: contain;
  max-width: 100%;
  width: 25rem;
  height: 20rem;
  ${display}
`

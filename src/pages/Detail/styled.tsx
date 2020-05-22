import { themeGet } from '@styled-system/theme-get'
import Image from 'components/Image'
import styled from 'styled-components'

export const ImageFull = styled(Image)`
  background-color: ${themeGet('colors.primary')};
  object-fit: contain;
  max-width: 100%;
  width: 25rem;
  height: 20rem;
`

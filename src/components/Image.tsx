import styled from '@emotion/styled'
import { size, SizeProps, space, SpaceProps } from 'styled-system'

const Image = styled.img<SizeProps & SpaceProps>`
  ${size}
  ${space}
`

Image.defaultProps = {
  loading: 'lazy',
}

export default Image

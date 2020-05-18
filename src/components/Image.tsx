import styled from 'styled-components'
import { size, SizeProps, SpaceProps, space } from 'styled-system'

const Image = styled.img<SizeProps & SpaceProps>`
  ${size}
  ${space}
`

Image.defaultProps = {
  loading: 'lazy',
}

export default Image

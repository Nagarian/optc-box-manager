import styled from 'styled-components'
import { size } from 'styled-system'

const Image = styled.img`
  ${size}
`

Image.defaultProps = {
  loading: 'lazy',
}

export default Image

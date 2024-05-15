import styled from '@emotion/styled'
import { size, SizeProps, space, SpaceProps } from 'styled-system'

const Image = styled.img<SizeProps & SpaceProps>(size, space)

export default Image

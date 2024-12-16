import styled from '@emotion/styled'
import {
  display,
  DisplayProps,
  gridArea,
  GridAreaProps,
  size,
  SizeProps,
  space,
  SpaceProps,
} from 'styled-system'
import { cleanStyledSystem } from 'styles'

export const Image = styled('img', cleanStyledSystem)<
  SizeProps & SpaceProps & DisplayProps & GridAreaProps
>(size, space, display, gridArea)

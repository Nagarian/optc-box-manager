import styled from 'styled-components'
import {
  color,
  gridArea,
  GridAreaProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system'
import { cleanStyledSystem } from 'styles'

export type TypoProps = SpaceProps & TypographyProps & GridAreaProps

export const Title = styled('h1').withConfig(cleanStyledSystem)<TypoProps>(
  space,
  typography,
  gridArea,
)
Title.defaultProps = {
  fontSize: '4',
  textAlign: 'center',
}

export const SubTitle = styled('h2').withConfig(cleanStyledSystem)<TypoProps>(
  space,
  typography,
  gridArea,
  color,
)
SubTitle.defaultProps = {
  fontSize: '3',
  textAlign: 'center',
}

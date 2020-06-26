import styled from 'styled-components'
import {
  color,
  flex,
  FlexProps,
  gridArea,
  GridAreaProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  width,
  WidthProps,
  compose,
  ColorProps,
  display,
  DisplayProps,
  flexbox,
  FlexboxProps,
} from 'styled-system'
import { cleanStyledSystem } from 'styles'

export type TypoProps = SpaceProps &
  TypographyProps &
  GridAreaProps &
  FlexProps &
  WidthProps &
  ColorProps &
  DisplayProps &
  FlexboxProps

const typoStyled = compose(space, typography, gridArea, color, flex, width, display, flexbox)

export const Title = styled('h1').withConfig(cleanStyledSystem)<TypoProps>(
  typoStyled,
)
Title.defaultProps = {
  fontSize: '4',
  textAlign: 'center',
  my: '2',
}

export const SubTitle = styled('h2').withConfig(cleanStyledSystem)<TypoProps>(
  typoStyled,
)
SubTitle.defaultProps = {
  fontSize: '3',
  textAlign: 'center',
}

export const Text = styled('p').withConfig(cleanStyledSystem)<TypoProps>(
  typoStyled,
)

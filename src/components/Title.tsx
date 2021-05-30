import styled from '@emotion/styled'
import {
  color,
  ColorProps,
  compose,
  display,
  DisplayProps,
  flex,
  flexbox,
  FlexboxProps,
  FlexProps,
  gridArea,
  GridAreaProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  width,
  WidthProps,
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

const typoStyled = compose(
  space,
  typography,
  gridArea,
  color,
  flex,
  width,
  display,
  flexbox,
)

export const Title = styled('h1', cleanStyledSystem)<TypoProps>(typoStyled)
Title.defaultProps = {
  fontSize: '4',
  textAlign: 'center',
  my: '2',
}

export const SubTitle = styled('h2', cleanStyledSystem)<TypoProps>(typoStyled)
SubTitle.defaultProps = {
  fontSize: '3',
  textAlign: 'center',
}

export const Text = styled('p', cleanStyledSystem)<TypoProps>(typoStyled)

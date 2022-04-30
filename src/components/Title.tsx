import styled from '@emotion/styled'
import {
  color,
  ColorProps,
  compose,
  flex,
  flexbox,
  FlexboxProps,
  FlexProps,
  gridArea,
  GridAreaProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system'
import { cleanStyledSystem } from 'styles'

export type TypoProps = SpaceProps &
  TypographyProps &
  GridAreaProps &
  FlexProps &
  LayoutProps &
  ColorProps &
  FlexboxProps

const typoStyled = compose(
  space,
  typography,
  gridArea,
  color,
  flex,
  flexbox,
  layout,
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

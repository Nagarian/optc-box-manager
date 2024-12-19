import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import {
  color,
  ColorProps,
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
import { cleanStyledSystem, place, PlaceProps } from 'styles'

export type TypoProps = SpaceProps &
  TypographyProps &
  GridAreaProps &
  FlexProps &
  LayoutProps &
  ColorProps &
  FlexboxProps &
  PlaceProps

export const Text = styled('p', cleanStyledSystem)<TypoProps>(
  space,
  typography,
  gridArea,
  color,
  flex,
  flexbox,
  layout,
  place,
)

export const Title = ({
  color,
  fontSize = '4',
  textAlign = 'center',
  my = '2',
  ...p
}: PropsWithChildren<TypoProps>) => (
  <Text
    as="h1"
    color={color as string}
    fontSize={fontSize}
    textAlign={textAlign}
    my={my}
    {...p}
  />
)

export const SubTitle = ({
  color,
  fontSize = '3',
  textAlign = 'center',
  ...p
}: PropsWithChildren<TypoProps>) => (
  <Text
    as="h2"
    color={color as string}
    fontSize={fontSize}
    textAlign={textAlign}
    {...p}
  />
)

import { css, Global } from '@emotion/react'
import shouldForwardProp from '@styled-system/should-forward-prop'
import * as CSS from 'csstype'
import { useThemeMode } from 'hooks/useThemeMode'
import { ThemeMode } from 'hooks/useUserSettings'
import {
  RequiredTheme,
  ResponsiveValue,
  system,
  Theme,
  TLengthStyledSystem,
} from 'styled-system'
import { FontCss } from './font'
import { FormsCss } from './forms'
import { ResetCss } from './reset'

export default function DefaultStyles() {
  const { currentTheme } = useThemeMode()
  return (
    <>
      <ResetCss />
      <ColorScheme currentTheme={currentTheme} />
      <FontCss />
      <FormsCss />
    </>
  )
}

type ColorSchemeProps = {
  currentTheme: ThemeMode
}
function ColorScheme({ currentTheme }: ColorSchemeProps) {
  return (
    <Global
      styles={css`
        :root {
          color-scheme: ${currentTheme};
        }
      `}
    />
  )
}

export const clean = (...propsToClean: string[]) => ({
  shouldForwardProp: (p: string) =>
    shouldForwardProp(p) || propsToClean.includes(p),
})

export const cleanStyledSystem = clean()

export interface PlaceProps<ThemeType extends Theme = RequiredTheme> {
  alignItems?: ResponsiveValue<CSS.Property.AlignItems, ThemeType>
  alignContent?: ResponsiveValue<CSS.Property.AlignContent, ThemeType>
  alignSelf?: ResponsiveValue<CSS.Property.AlignSelf, ThemeType>
  justifyItems?: ResponsiveValue<CSS.Property.JustifyItems, ThemeType>
  justifyContent?: ResponsiveValue<CSS.Property.JustifyContent, ThemeType>
  justifySelf?: ResponsiveValue<CSS.Property.JustifySelf, ThemeType>
  placeItems?: ResponsiveValue<CSS.Property.PlaceItems, ThemeType>
  placeContent?: ResponsiveValue<CSS.Property.PlaceContent, ThemeType>
  placeSelf?: ResponsiveValue<CSS.Property.PlaceSelf, ThemeType>
}

export const place = system({
  alignItems: true,
  alignContent: true,
  alignSelf: true,
  justifyItems: true,
  justifyContent: true,
  justifySelf: true,
  placeItems: true,
  placeContent: true,
  placeSelf: true,
})

export interface GapProps<
  ThemeType extends Theme = RequiredTheme,
  TVal = CSS.Property.Gap<TLengthStyledSystem>,
> {
  /**
   * The gap CSS property sets the gaps (gutters) between rows and columns. It is a shorthand for row-gap
   * and column-gap.
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)
   */
  gap?: ResponsiveValue<TVal, ThemeType> | undefined
  rowGap?: ResponsiveValue<TVal, ThemeType> | undefined
  columnGap?: ResponsiveValue<TVal, ThemeType> | undefined
}

export const gap = system({
  gap: {
    property: 'gap',
    scale: 'space',
    defaultScale: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  },
  rowGap: {
    property: 'rowGap',
    scale: 'space',
    defaultScale: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  },
  columnGap: {
    property: 'columnGap',
    scale: 'space',
    defaultScale: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  },
})

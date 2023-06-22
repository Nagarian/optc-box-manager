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

export default function DefaultStyles () {
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
function ColorScheme ({ currentTheme }: ColorSchemeProps) {
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
  shouldForwardProp: (p: any) =>
    shouldForwardProp(p) || propsToClean.includes(p),
})

export const cleanStyledSystem = clean()

export interface PlaceProps {
  alignItems?: CSS.Property.AlignItems
  alignContent?: CSS.Property.AlignContent
  alignSelf?: CSS.Property.AlignSelf
  justifyItems?: CSS.Property.JustifyItems
  justifyContent?: CSS.Property.JustifyContent
  justifySelf?: CSS.Property.JustifySelf
  placeItems?: CSS.Property.PlaceItems
  placeContent?: CSS.Property.PlaceContent
  placeSelf?: CSS.Property.PlaceSelf
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
  /**
   * The row-gap CSS property sets the size of the gap (gutter) between an element's rows.
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)
   */
  rowGap?: ResponsiveValue<TVal, ThemeType> | undefined
  /**
   * The column-gap CSS property sets the size of the gap (gutter) between an element's columns.
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)
   */
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

export const SafariSpecific = (cssRule: any) => css`
  @media not all and (min-resolution: 0.001dpcm) {
    @media {
      ${cssRule}
    }
  }
`

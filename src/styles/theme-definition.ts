import { Property } from 'csstype'

type Size = Property.Height<{}> | Property.Width<{}>
type Color = Property.Color
type Font = Property.FontFamily
type Weigth = Property.FontWeight
type BorderWidth = Property.BorderWidth
type ZIndex = Property.ZIndex
type Shadow = Property.BoxShadow

export type ThemeFontSizes = Font[] & Partial<{
  body: Font
  title: Font
  subtitle: Font
}>

export type ThemeFontWeight = [Weigth, Weigth]

export type ThemeSpace = any[] & Partial<{
  small: any
  medium: any
  large: any
}>

export type ThemeSizes = Size[] & Partial<{
  minimalRequired: Size
}>

export type ThemeBorderWith = {
  thin: BorderWidth
  medium: BorderWidth
  thick: BorderWidth
}

export type ThemeBreakpoints = [string, string, string]

export type ThemeMediaQueries = {
  tablet: string
  desktop: string
  largeDesktop: string
}

export type ThemeZIndex = {
  highlight: ZIndex
  menu: ZIndex
  popin: ZIndex
}

export type ThemeShadow = {
  small: Shadow
  normal: Shadow
}

export type OrbColor = {
  STR: Color
  QCK: Color
  DEX: Color
  PSY: Color
  INT: Color
  RCV: Color
  TND: Color
  BLOCK: Color
  BOMB: Color
  WANO: Color
  SEMLA: Color
  RAINBOW: Color
  G: Color
  EMPTY: Color
}

export type SpecificColor = {
  ccAtk: Color
  ccHp: Color
  ccRcv: Color
  support: Color
  rainbow: Color
  rainbowPlus: Color
}

export type ThemeColors = {
  greys: Color[]
  black: Color
  white: Color
  grey: Color
  red: Color
  green: Color
  blue: Color
  brown: Color
  orange: Color
  primary: Color
  secondary: Color
  background: Color
  popupBackground: Color
  text: Color
  primaryText: Color
  secondaryText: Color
  orb: OrbColor
  specific: SpecificColor
}

declare module '@emotion/react' {
  export interface Theme {
    colors: ThemeColors
    fontSizes: ThemeFontSizes
    fontWeights: ThemeFontWeight
    borderWidths: ThemeBorderWith
    space: ThemeSpace
    sizes: ThemeSizes

    breakpoints: ThemeBreakpoints
    mediaQueries: ThemeMediaQueries
    zIndices: ThemeZIndex
    shadows: ThemeShadow

    buttons: any
  }
}

import shouldForwardProp from '@styled-system/should-forward-prop'
import * as CSS from 'csstype'
import { useThemeMode } from 'hooks/useThemeMode'
import { ThemeMode } from 'hooks/useUserSettings'
import React from 'react'
import { createGlobalStyle, css } from 'styled-components'
import { system } from 'styled-system'
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

const ColorScheme = createGlobalStyle<{ currentTheme: ThemeMode }>`
:root {
  color-scheme: ${p => p.currentTheme};
}
`

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

export const SafariSpecific = (cssRule: any) => css`
  @media not all and (min-resolution: 0.001dpcm) {
    @media {
      ${cssRule}
    }
  }
`

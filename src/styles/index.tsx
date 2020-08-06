import shouldForwardProp from '@styled-system/should-forward-prop'
import * as CSS from 'csstype'
import React from 'react'
import { system } from 'styled-system'
import { FontCss } from './font'
import { FormsCss } from './forms'
import { ResetCss } from './reset'
import { css } from 'styled-components'

export default function DefaultStyles () {
  return (
    <>
      <ResetCss />
      <FontCss />
      <FormsCss />
    </>
  )
}

export const clean = (...propsToClean: string[]) => ({
  shouldForwardProp: (p : any) => shouldForwardProp(p) || propsToClean.includes(p),
})

export const cleanStyledSystem = clean()

export interface PlaceProps {
  alignItems?: CSS.Property.AlignItems,
  alignContent?: CSS.Property.AlignContent,
  alignSelf?: CSS.Property.AlignSelf,
  justifyItems?: CSS.Property.JustifyItems,
  justifyContent?: CSS.Property.JustifyContent,
  justifySelf?: CSS.Property.JustifySelf,
  placeItems?: CSS.Property.PlaceItems,
  placeContent?: CSS.Property.PlaceContent,
  placeSelf?: CSS.Property.PlaceSelf,
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
  @media not all and (min-resolution:.001dpcm) {
    @media {
      ${cssRule}
    }
  }
`

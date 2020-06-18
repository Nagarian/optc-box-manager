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
  alignItems?: CSS.AlignItemsProperty,
  alignContent?: CSS.AlignContentProperty,
  alignSelf?: CSS.AlignSelfProperty,
  justifyItems?: CSS.JustifyItemsProperty,
  justifyContent?: CSS.JustifyContentProperty,
  justifySelf?: CSS.JustifySelfProperty,
  placeItems?: CSS.PlaceItemsProperty,
  placeContent?: CSS.PlaceContentProperty,
  placeSelf?: CSS.PlaceSelfProperty,
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

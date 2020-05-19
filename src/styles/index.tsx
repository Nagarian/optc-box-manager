import React from 'react'
import { FontCss } from './font'
import { ResetCss } from './reset'
import { FormsCss } from './forms'
import shouldForwardProp from '@styled-system/should-forward-prop'

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

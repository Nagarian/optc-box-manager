import React from 'react'
import { FontCss } from './font'
import { ResetCss } from './reset'
import { FormsCss } from './forms'

export default function DefaultStyles () {
  return (
    <>
      <ResetCss />
      <FontCss />
      <FormsCss />
    </>
  )
}

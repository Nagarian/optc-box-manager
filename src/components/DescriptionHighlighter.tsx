import React, { Fragment } from 'react'
import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { clean } from 'styles'

export type DescriptionHighlighterProps = {
  value?: string
}
export default function DescriptionHighlighter ({
  value,
}: DescriptionHighlighterProps) {
  if (!value) return null

  const parts = value.split(/(\[[A-Z]*\])/g)

  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[')
          ? <Orb key={i} value={part} />
          : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  )
}

type OrbProps = {
  value: string
}

const Orb = styled('span')
  .attrs<OrbProps>(({ value }) => ({
    children: value.replace(/\[|\]/g, ''),
  }))
  .withConfig(clean('value'))<OrbProps>`
  display: inline-block;
  background-color: ${p => themeGet(`colors.orb.${p.children}`)};
  color: ${themeGet('colors.white')};
  border-radius: 1em;
  padding: .1em .5em;
  font-weight: bold;
`

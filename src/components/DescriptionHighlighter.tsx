import React from 'react'
import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { clean } from 'styles'
import ReactMarkdown from 'react-markdown'

export type DescriptionHighlighterProps = {
  value?: string
}
export default function DescriptionHighlighter ({
  value,
}: DescriptionHighlighterProps) {
  if (!value) return null

  const parts = value.replace(
    /(\[[A-Z]*\])/g,
    match => `${match}(${match.substr(1, match.length - 2)})`,
  )

  return (
    <ReactMarkdown
      source={parts}
      escapeHtml={false}
      renderers={{
        paragraph: FakeParagraph,
        link: Orb,
      }}
    />
  )
}

type OrbProps = {
  href: string
}

const Orb = styled('span')
  .attrs<OrbProps>(({ href }) => ({
    children: href.replace(/\[|\]/g, ''),
  }))
  .withConfig(clean('href'))<OrbProps>`
  display: inline-block;
  background: ${p => themeGet(`colors.orb.${p.children}`)};
  color: ${themeGet('colors.white')};
  border-radius: 1em;
  padding: .1em .5em;
  font-weight: bold;
`

const FakeParagraph = styled.span``

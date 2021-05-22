import { themeGet } from '@styled-system/theme-get'
import { diffWords } from 'diff'
import { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import styled from 'styled-components'
import { clean } from 'styles'

export type DescriptionHighlighterProps = {
  value?: ReactNode
  originalDiff?: string
}
export default function DescriptionHighlighter ({
  value,
  originalDiff,
}: DescriptionHighlighterProps) {
  if (!value) return null

  if (typeof value !== 'string') {
    return <>{value}</>
  }

  let parts = value

  if (originalDiff) {
    const diffs = diffWords(originalDiff, value, { ignoreCase: true })
    parts = diffs
      .filter(x => !x.removed)
      .reduce(
        (concat, x) =>
          concat +
          (x.added
            ? (x.value.startsWith(' ') ? ' *' : '*') +
              x.value.trim() +
              (x.value.endsWith(' ') ? '* ' : '*')
            : x.value),
        '',
      )
  }

  parts = parts.replace(
    /(\[[A-Z]*\])/gi,
    match =>
      `${match.toUpperCase()}(${match
        .substr(1, match.length - 2)
        .toUpperCase()})`,
  )

  return (
    <ReactMarkdown children={parts} rehypePlugins={[rehypeRaw]} components={renderers} />
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
  background: ${p => themeGet(`colors.orb.${p.children}`)(p) ?? 'grey'};
  color: ${themeGet('colors.white')};
  border-radius: 1em;
  padding: .1em .5em;
  font-weight: bold;
`

const FakeParagraph = styled.span``

const DiffHiglighter = styled.em`
  font-style: normal;
  font-weight: bold;
  color: ${themeGet('colors.green')};
`

const renderers = {
  p: FakeParagraph,
  a: Orb,
  em: DiffHiglighter,
}

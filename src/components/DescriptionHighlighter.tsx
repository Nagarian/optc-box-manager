import styled from '@emotion/styled'
import { diffWords } from 'diff'
import { memo, ReactNode } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ReactMarkdownRenderers } from 'styles/react-markdown'
import { OrbColor } from 'styles/theme-definition'

export type DescriptionHighlighterProps = {
  value?: ReactNode
  originalDiff?: string
}
function BaseDescriptionHighlighter({
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
      .map(x =>
        x.added
          ? x.value
              .replace(/^([,-]?\s?)/, '$1*')
              .replace(/([\s\n]*)$/, '*$1')
              .replaceAll(/(.+)(\n-?\s?)(.+)/gi, '$1*$2*$3')
          : x.value,
      )
      .join('')
  }

  parts = parts.replace(
    /(\[[A-Z]*\])/gi,
    match =>
      `${match.toUpperCase()}(${match
        .substring(1, match.length - 1)
        .toUpperCase()})`,
  )

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>
      {parts}
    </ReactMarkdown>
  )
}

export const DescriptionHighlighter = memo(BaseDescriptionHighlighter)

const Orb = styled.span<{ orb: keyof OrbColor }>`
  display: inline-block;

  background: ${p => p.theme.colors.orb[p.orb] ?? p.theme.colors.grey};
  color: ${p => p.theme.colors.white};
  border-radius: 1em;
  padding: 0.1em 0.5em;
  font-weight: bold;
`

const FakeParagraph = styled.span``

const Header3 = styled.h3`
  font-weight: bold;
  margin-top: ${p => p.theme.space[1]};
`

const DiffHiglighter = styled.em`
  font-style: normal;
  font-weight: bold;
  color: ${p => p.theme.colors.green};
`

const renderers: Components = {
  ...ReactMarkdownRenderers,
  p: p => <FakeParagraph {...p} />,
  h3: p => <Header3 {...p} />,
  a: ({ href, ...p }) => {
    const orb = (href as string)?.replace(/\[|\]/g, '') as keyof OrbColor
    return (
      <Orb orb={orb} {...p}>
        {orb}
      </Orb>
    )
  },
  em: p => <DiffHiglighter {...p} />,
}

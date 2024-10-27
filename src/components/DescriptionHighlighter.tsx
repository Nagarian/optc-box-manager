import styled from '@emotion/styled'
import { diffWords } from 'diff'
import { memo, ReactNode } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
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
        .substring(1, match.length - 1)
        .toUpperCase()})`,
  )

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={renderers}>
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
  p: p => <FakeParagraph {...p} />,
  h3: p => <Header3 {...p} />,
  a: ({ href, ...p }) => {
    const orb = href?.replace(/\[|\]/g, '') as keyof OrbColor
    return (
      <Orb orb={orb} {...p}>
        {orb}
      </Orb>
    )
  },
  em: p => <DiffHiglighter {...p} />,
}

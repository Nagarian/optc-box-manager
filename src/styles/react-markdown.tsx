import styled from '@emotion/styled'
import { SubTitle, Text } from 'components/Title'
import { Components } from 'react-markdown'
import { space, SpaceProps } from 'styled-system'

const UnorderedList = styled.ul`
  list-style-type: '🏴‍☠️';
  list-style-position: outside;
  padding-inline-start: ${p => p.theme.space[4]};
`
const OrderedList = styled.ol`
  list-style-position: outside;
  padding-inline-start: ${p => p.theme.space[4]};
`

const Img = styled.img`
  max-width: 100%;
  display: block;
  margin: 1rem auto;
`

const BlockQuote = styled.blockquote<SpaceProps>`
  ${space}
  border-left: ${p => p.theme.borderWidths.thick} solid;
  border-color: ${p => p.theme.colors.primaryText};
  font-style: italic;
`

export const ReactMarkdownRenderers: Components = {
  h1: p => <SubTitle {...p} m="2" />,
  h2: p => <SubTitle {...p} m="2" />,
  h3: p => <SubTitle {...p} m="2" />,
  h4: p => <SubTitle {...p} m="2" />,
  h5: p => <SubTitle {...p} m="2" />,
  h6: p => <SubTitle {...p} m="2" />,
  p: p => <Text {...p} m="1" />,
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  a: p => <a {...p} target="_blank" rel="noopener noreferrer" />,
  ul: p => <UnorderedList {...p} />,
  ol: p => <OrderedList {...p} />,
  img: p => <Img {...p} />,
  blockquote: p => <BlockQuote m="2" pl="2" {...p} />,
}

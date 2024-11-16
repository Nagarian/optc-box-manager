import styled from '@emotion/styled'
import { Box } from 'components/Box'
import { SubTitle, Text } from 'components/Title'
import { Components } from 'react-markdown'
import { space, SpaceProps } from 'styled-system'

const ListItem = styled.li`
  ::before {
    content: '🏴‍☠️ ';
    font-size: ${p => p.theme.fontSizes[2]};
  }
`

const OrderedList = styled.ol`
  & > li {
    margin-left: 2rem;
  }
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
  li: p => <ListItem {...p} />,
  ol: p => <OrderedList {...p} />,
  img: p => <Img {...p} />,
  blockquote: p => <BlockQuote m="2" pl="2" {...p} />,
}

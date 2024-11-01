import styled from '@emotion/styled'
import { SubTitle, Text } from 'components/Title'
import { Components } from 'react-markdown'

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
}

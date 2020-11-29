import { themeGet } from '@styled-system/theme-get'
import { SubTitle, Text } from 'components/Title'
import { ElementType } from 'react'
import styled from 'styled-components'

const ListItem = styled.li<{ ordered: boolean }>`
  margin-left: ${p => p.ordered && '2rem'};

  ::before {
    content: ${p => !p.ordered && "'🏴‍☠️ '"};
    font-size: ${themeGet('fontSizes.2')};
  }
`

const Img = styled.img`
  max-width: 100%;
  display: block;
  margin: 1rem auto;
`

export const ReactMarkdownRenderers: { [nodeType: string]: ElementType } = {
  heading: p => <SubTitle {...p} m="2" />,
  paragraph: p => <Text {...p} m="1" />,
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  link: p => <a {...p} target="_blank" rel="noopener noreferrer" />,
  listItem: p => { return <ListItem {...p} /> },
  // listItem: ListItem,
  image: Img,
}

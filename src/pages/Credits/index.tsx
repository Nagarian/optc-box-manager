import Button from 'components/Button'
import Popup from 'components/Popup'
import { SubTitle, Text } from 'components/Title'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Credits () {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (!isOpen) {
    return <Button onClick={() => setIsOpen(true)}>Credits</Button>
  }

  return (
    <Popup onClose={() => setIsOpen(false)} title="Credits">
      <ReactMarkdown
        source={creditText}
        renderers={{
          heading: p => <SubTitle {...p} m="2" />,
          paragraph: p => <Text {...p} m="1" />,
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          link: p => <a {...p} target="_blank" rel="noopener noreferrer" />,
        }}
      />
    </Popup>
  )
}

const creditText = `
Made with 💗 and ☕ by [u/nagarian_r](https://www.reddit.com/user/nagarian_r)

Please report bugs and suggestions into [Github](https://github.com/Nagarian/optc-box-manager/issues)

All the information originates from [OPTC-DB](https://optc-db.github.io/)

This site does not own any of the images. All images are owned by Eiichiro Oda/Shueisha, Toei Animation, and Bandai Namco.

# IMPORTANT

Your box is saved **ONLY LOCALLY**

Clearing your browser cache will delete your box !

If you want to view your box in a different device, you should export
and import it manually
`

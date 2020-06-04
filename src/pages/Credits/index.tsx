import Button from 'components/Button'
import Popup from 'components/Popup'
import { SubTitle, Text } from 'components/Title'
import React, { useState } from 'react'

export default function Credits () {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (!isOpen) {
    return <Button onClick={() => setIsOpen(true)}>Credits</Button>
  }

  return (
    <Popup onClose={() => setIsOpen(false)} title="Credits">
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <Text m="1">
        Made with 💗 and ☕ by{' '}
        <a
          href="https://www.reddit.com/user/nagarian_r"
          target="_blank"
          rel="noopener noreferrer"
        >
          u/nagarian_r
        </a>
      </Text>
      <Text m="1">
        Please report bugs and suggestions into{' '}
        <a
          href="https://github.com/Nagarian/optc-box-manager/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </Text>
      <Text m="1">
        This site does not own any of the images. All images are owned by
        Eiichiro Oda/Shueisha, Toei Animation, and Bandai Namco.
      </Text>
      <SubTitle>IMPORTANT</SubTitle>
      <Text m="1">
        Your box is saved <b>ONLY LOCALLY</b>
      </Text>
      <Text m="1">Clearing your browser cache will delete your box !</Text>
      <Text m="1">
        If you want to view your box in a difference device, you should export
        and import it manually
      </Text>
    </Popup>
  )
}

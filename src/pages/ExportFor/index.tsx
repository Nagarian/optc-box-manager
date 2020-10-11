import Box from 'components/Box'
import Button from 'components/Button'
import { TextInput } from 'components/forms/TextInput'
import { ConfirmIcon } from 'components/Icon'
import Popup from 'components/Popup'
import { SubTitle } from 'components/Title'
import { MyUserBox } from 'models/userBox'
import React, { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownRenderers } from 'styles/react-markdown'

type ExportForProps = {
  myUserBox: MyUserBox
}

export default function ExportFor ({ myUserBox: { userBox } }: ExportForProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (!isOpen) {
    return <Button onClick={() => setIsOpen(true)}>Export For</Button>
  }

  const payload = userBox.map(u => u.unit.id).join(',')

  return (
    <Popup onClose={() => setIsOpen(false)} title="Export For">
      <CopyBlock
        title="Nakama Network"
        content={NakamaTutorial}
        payload={payload}
      />

      <hr />

      <CopyBlock
        title="OPTC-DB"
        content={OPTCDBTutorial}
        payload={`[${payload}]`}
      />
    </Popup>
  )
}

const NakamaTutorial = `
1. Copy the content of the box above
2. Go to Nakama Network, log-in and go to [your boxes](https://www.nakama.network/boxes/)
3. Click on the **Bulk Operations** button
4. Paste the units-id
5. Click on **Set Units** buttons
`

const OPTCDBTutorial = `
1. Copy the content of the box above
2. Go to [OPTC-DB](https://optc-db.github.io/characters/#/search/)
3. Check this tutorial for more explication for the process : [Reddit -"Export" and "import" character log from optc-db](https://www.reddit.com/r/OnePieceTC/comments/7r1ldp/export_and_import_character_log_from_optcdb/)

![Export character log from OPTC-DB](https://i.imgur.com/4xt1Vib.png "Export character log from OPTC-DB")
`

type CopyBlockProps = {
  title: string
  content: string
  payload: string
}
function CopyBlock ({
  title,
  content,
  payload,
}: CopyBlockProps) {
  const ref = useRef<HTMLInputElement>()
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copy = () => {
    if (!ref.current) {
      return false
    }

    ref.current.select()
    document.execCommand('copy')
    ref.current.blur()
    setIsCopied(true)
  }

  return (
    <>
      <SubTitle marginTop="2">{title}</SubTitle>

      <Box display="grid" m="2" gridTemplateColumns="1fr auto">
        <TextInput
          type="text"
          name={`${title}-format`}
          readOnly
          value={payload}
          ref={ref as any}
        />
        <Button
          icon={isCopied ? ConfirmIcon : undefined}
          title="Copy"
          onClick={copy}
          size={0}
          marginLeft={1}
          children={!isCopied && 'Copy'}
          disabled={isCopied}
          fontSize="0"
        />
      </Box>

      <ReactMarkdown
        source={content}
        renderers={ReactMarkdownRenderers}
      />
    </>
  )
}

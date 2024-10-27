import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { TextInput } from 'components/forms/TextInput'
import { ConfirmIcon } from 'components/Icon'
import { SubTitle } from 'components/Title'
import { MyUserBox } from 'models/userBox'
import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownRenderers } from 'styles/react-markdown'

type ExportForProps = {
  myUserBox: MyUserBox
}

export function ExportFor({ myUserBox: { userBox } }: ExportForProps) {
  const payload = userBox.map(u => u.unit.dbId).join(',')

  return (
    <>
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
    </>
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
function CopyBlock({ title, content, payload }: CopyBlockProps) {
  const ref = useRef<HTMLInputElement>(null)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copy = async () => {
    if (!ref.current) {
      return false
    }

    ref.current.select()
    await navigator.clipboard.writeText(ref.current.value)
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
          ref={ref}
        />
        <Button
          icon={isCopied ? ConfirmIcon : undefined}
          title="Copy"
          onClick={copy}
          size={0}
          marginLeft={1}
          disabled={isCopied}
          fontSize="0"
        >
          {!isCopied && 'Copy'}
        </Button>
      </Box>

      <ReactMarkdown components={ReactMarkdownRenderers}>
        {content}
      </ReactMarkdown>
    </>
  )
}

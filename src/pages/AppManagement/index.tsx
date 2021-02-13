import Box from 'components/Box'
import Button from 'components/Button'
import Popup from 'components/Popup'
import { Text, Title } from 'components/Title'
import { useOptcDb } from 'hooks/useOptcDb'
import useSugoCleaner from 'hooks/useSugoCleaner'
import { useUserSettings } from 'hooks/useUserSettings'
import { MyUserBox } from 'models/userBox'
import { ChangeEvent, useRef, useState } from 'react'
import { importAsJson } from 'services/share'

type AppManagementProps = {
  myUserBox: MyUserBox
}
export default function AppManagment ({ myUserBox }: AppManagementProps) {
  const userSetting = useUserSettings()
  const db = useOptcDb()
  const sugoCleaner = useSugoCleaner(db.db)

  return (
    <>
      <Title>Backup</Title>
      <Text my="2">
        Because you are still on an internet browser, we recommend you to do
        some manual backups from time to time. In case of unexpected behaviour
        from it, those backup will allow you to restore application state
      </Text>

      <Section
        title="Character Box"
        description="This backup will contain your current box with all your characters, their levels, their limit breaks, ..."
        reset={myUserBox.reset}
        exportFn={myUserBox.exportDB}
        importFn={myUserBox.importDB}
      />

      <Section
        title="Sugo Cleaner"
        description="This backup will contain all the characters you've saved in Sugp Cleaner tool (including your classification)"
        reset={sugoCleaner.reset}
        exportFn={sugoCleaner.export}
        importFn={sugoCleaner.import}
      />

      <Section
        title="Application Settings"
        description="This backup will contain all other settings which include: theme mode, Saved Searches and Gather Island"
        reset={userSetting.reset}
        exportFn={userSetting.export}
        importFn={userSetting.import}
      />
    </>
  )
}

type SectionProps = {
  title: string
  description: string

  reset: () => void
  importFn: (json: string) => void
  exportFn: () => Promise<void>
}
function Section ({
  title,
  description,
  reset,
  importFn,
  exportFn,
}: SectionProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [callback, setCallbackMessage] = useState<string>()
  const [showResetWarning, setShowResetWarning] = useState<boolean>(false)

  const importRef = useRef<HTMLInputElement>(null)

  const exp = async () => {
    setIsLoading(true)
    await exportFn()
    setIsLoading(false)
    setCallbackMessage(
      `Your ${title.toLowerCase()} has been exported successfully !`,
    )
  }

  const imp = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    try {
      setIsLoading(true)
      const json = await importAsJson(file)
      importFn(json)
      setCallbackMessage(`Your ${title.toLowerCase()} has been filled !`)
    } catch (error) {
      setCallbackMessage(`Your file "${file.name}" raise an ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Box display="flex" flexDirection="column" my="1">
        {/* <SubTitle my="2">{title}</SubTitle> */}
        <Text my="2">
          <strong>{title}: </strong> {description}
        </Text>

        <Box my="2" display="flex" flexWrap="wrap" placeContent="space-evenly">
          <Button m="1" fontSize="2" onClick={exp} isLoading={isLoading}>
            Export
          </Button>

          <Button
            variant="danger"
            m="1"
            fontSize="2"
            onClick={() => setShowResetWarning(true)}
          >
            Reset
          </Button>

          <input
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            ref={importRef}
            onChange={imp}
          />
          <Button
            m="1"
            fontSize="2"
            onClick={() => importRef.current?.click()}
            isLoading={isLoading}
          >
            Import
          </Button>
        </Box>

        {callback && (
          <Popup
            onClose={() => setCallbackMessage(undefined)}
            title={callback}
          />
        )}
        {showResetWarning && (
          <Popup
            onValidate={() => {
              setShowResetWarning(false)
              reset()
            }}
            onCancel={() => setShowResetWarning(false)}
            title={`Are you really sure to reset your ${title.toLowerCase()} ?`}
          />
        )}
      </Box>
    </>
  )
}

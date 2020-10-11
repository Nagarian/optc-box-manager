import Button from 'components/Button'
import Changelog from 'components/Changelog'
import ExpansionPanel from 'components/ExpansionPanel'
import ChoiceInput from 'components/forms/ChoiceInput'
import { ArrowIcon } from 'components/Icon'
import Popup from 'components/Popup'
import { useThemeMode } from 'hooks/useThemeMode'
import { MyUserBox } from 'models/userBox'
import Credits from 'pages/Credits'
import ExportFor from 'pages/ExportFor'
import React, { ChangeEvent, useRef, useState } from 'react'
import { importAsJson } from 'services/share'

type SettingsProps = {
  onClose: () => void
  myUserBox: MyUserBox
}

export default function Settings ({ onClose, myUserBox }: SettingsProps) {
  const { reset, importDB, exportDB } = myUserBox

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>()
  const [showResetWarning, setShowResetWarning] = useState<boolean>(false)
  const [showChangelog, setShowChangelog] = useState<boolean>(false)
  const { themeMode, setThemeMode } = useThemeMode()

  const importRef = useRef<HTMLInputElement>(null)

  const exportFn = async () => {
    setIsLoading(true)
    await exportDB()
    setIsLoading(false)
    setSuccessMessage('Your Box has been exported successfully !')
  }

  const importFn = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    const json = await importAsJson(file)
    importDB(json)
    setSuccessMessage('Your Box has been filled !')
  }

  return (
    <Popup title="Settings" onClose={onClose}>
      {successMessage && (
        <Popup
          onClose={() => setSuccessMessage(undefined)}
          title={successMessage}
        />
      )}
      {showResetWarning && (
        <Popup
          onValidate={() => {
            setShowResetWarning(false)
            reset()
          }}
          onCancel={() => setShowResetWarning(false)}
          title="Are you really sure ?"
        />
      )}

      <Credits />

      <Button my="1" onClick={() => setShowChangelog(true)}>
        Changelog
      </Button>

      {showChangelog && (
        <Popup onClose={() => setShowChangelog(false)} title="Changelog">
          <Changelog />
        </Popup>
      )}

      <Button my="1" href="https://github.com/Nagarian/optc-box-manager/wiki">
        Wiki
      </Button>

      <Button variant="danger" my="1" onClick={() => setShowResetWarning(true)}>
        Reset
      </Button>
      <Button my="1" onClick={exportFn} isLoading={isLoading}>
        Export
      </Button>
      <input
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        ref={importRef}
        onChange={importFn}
      />
      <Button
        my="1"
        onClick={() => importRef.current?.click()}
        isLoading={isLoading}
      >
        Import
      </Button>

      <ExportFor myUserBox={myUserBox} />

      <ExpansionPanel title="Theme" icon={ArrowIcon}>
        <ChoiceInput
          type="radio"
          name="themeMode"
          checked={themeMode === 'auto'}
          onChange={e => setThemeMode('auto')}
        >
          Auto (defined by system)
        </ChoiceInput>
        <ChoiceInput
          type="radio"
          name="themeMode"
          checked={themeMode === 'light'}
          onChange={e => setThemeMode('light')}
        >
          Light ☀
        </ChoiceInput>
        <ChoiceInput
          type="radio"
          name="themeMode"
          checked={themeMode === 'dark'}
          onChange={e => setThemeMode('dark')}
        >
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          Dark 🌙
        </ChoiceInput>
      </ExpansionPanel>
    </Popup>
  )
}

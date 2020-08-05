import Button from 'components/Button'
import Popup from 'components/Popup'
import { MyUserBox } from 'models/userBox'
import Credits from 'pages/Credits'
import React, { ChangeEvent, useRef, useState } from 'react'
import Changelog from 'components/Changelog'
import { FilterContainerPanel } from 'pages/FilterSort/components/Filters/FilterContainer'
import { Text } from 'components/Title'
import ExpansionPanel from 'components/ExpansionPanel'
import { CottonCandyIcon } from 'components/Icon'
import { useUserSettings } from 'hooks/useUserSettings'
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
  const { userSetting, setUserSetting } = useUserSettings()

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
      <ExpansionPanel title="Beta feature">
        <FilterContainerPanel marginY="1">
          <Text>Cotton Candy max lvl</Text>
          <label>
            <input
              name="maxx-cc-lvl"
              checked={userSetting.is200cc === false}
              type="radio"
              onChange={() =>
                setUserSetting({
                  is200cc: false,
                })
              }
            />
            +100
          </label>
          <label>
            <input
              name="maxx-cc-lvl"
              checked={userSetting.is200cc === true}
              type="radio"
              onChange={() =>
                setUserSetting({
                  is200cc: true,
                })
              }
            />
            +200
          </label>
          <CottonCandyIcon size="1" />
        </FilterContainerPanel>
      </ExpansionPanel>
    </Popup>
  )
}

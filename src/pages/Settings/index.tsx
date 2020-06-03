import Button from 'components/Button'
import Popup from 'components/Popup'
import { MyUserBox } from 'models/userBox'
import React, { ChangeEvent, useRef, useState } from 'react'
import { exportAsJson } from 'services/share'

type SettingsProps = {
  onClose: () => void
  myUserBox: MyUserBox
}

export default function Settings ({ onClose, myUserBox }: SettingsProps) {
  const { reset, userBox, importDB } = myUserBox

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>()
  const [showResetWarning, setShowResetWarning] = useState<boolean>(false)

  const importRef = useRef<HTMLInputElement>(null)

  const exportFn = async () => {
    setIsLoading(true)
    await exportAsJson(userBox, 'optc-my-box')
    setIsLoading(false)
    setSuccessMessage('Your Box has been exported successfully !')
  }

  const importFn = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || file.type !== 'application/json') {
      return
    }

    const json = await file.text()
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
    </Popup>
  )
}

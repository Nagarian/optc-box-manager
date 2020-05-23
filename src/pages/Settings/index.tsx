import Button from 'components/Button'
import Popup from 'components/Popup'
import { Title } from 'components/Title'
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
  const importRef = useRef<HTMLInputElement>(null)

  const exportFn = async () => {
    setIsLoading(true)
    await exportAsJson(userBox, 'optc-my-box')
    setIsLoading(false)
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
    <Popup onCancel={onClose} onValidate={onClose}>
      <Title>Settings</Title>

      {successMessage && (
        <Popup
          onCancel={() => setSuccessMessage(undefined)}
          onValidate={() => setSuccessMessage(undefined)}
        >
          {successMessage}
        </Popup>
      )}
      <Button variant="danger" onClick={reset}>
        Reset
      </Button>
      <Button onClick={exportFn} isLoading={isLoading}>
        Export
      </Button>
      <input
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        ref={importRef}
        onChange={importFn}
      />
      <Button onClick={() => importRef.current?.click()} isLoading={isLoading}>
        Import
      </Button>
    </Popup>
  )
}

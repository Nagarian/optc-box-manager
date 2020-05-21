import Button from 'components/Button'
import Popup from 'components/Popup'
import { Title } from 'components/Title'
import React from 'react'

type SettingsProps = {
  onClose: () => void
}

export default function Settings ({ onClose }: SettingsProps) {
  return (
    <Popup onCancel={onClose} onValidate={onClose}>
      <Title>Settings</Title>

      <Button variant="danger" onClick={() => {}}>
        Reset
      </Button>
    </Popup>
  )
}

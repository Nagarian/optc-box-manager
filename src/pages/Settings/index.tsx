import Button from 'components/Button'
import Popup from 'components/Popup'
import { Title } from 'components/Title'
import React from 'react'

type SettingsProps = {
  onClose: () => void
  onReset: () => void
}

export default function Settings ({ onClose, onReset }: SettingsProps) {
  return (
    <Popup onCancel={onClose} onValidate={onClose}>
      <Title>Settings</Title>

      <Button variant="danger" onClick={onReset}>
        Reset
      </Button>
    </Popup>
  )
}

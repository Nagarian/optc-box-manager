import Button from 'components/Button'
import React, { ReactNode } from 'react'
import { SpaceProps } from 'styled-system'
import { PopupActionPanel, PopupBackground, PopupContainer } from './styled'

type PopupProps = {
  onCancel: () => void
  onValidate: () => void
  children: ReactNode
}

export default function Popup ({
  onCancel,
  onValidate,
  children,
  ...rest
}: PopupProps & SpaceProps) {
  return (
    <PopupBackground
      {...rest}
      onClick={event => event.currentTarget === event.target && onCancel()}
    >
      <PopupContainer padding="2">
        {children}

        <hr />

        <PopupActionPanel>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onValidate}>
            Confirm
          </Button>
        </PopupActionPanel>
      </PopupContainer>
    </PopupBackground>
  )
}

Popup.defaultProps = {
  px: [3, 5],
  py: [4, 5],
}

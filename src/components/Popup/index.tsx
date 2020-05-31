import Button from 'components/Button'
import { Title } from 'components/Title'
import React, { ReactNode } from 'react'
import { SpaceProps } from 'styled-system'
import { PopupActionPanel, PopupBackground, PopupContainer, PopupPanel } from './styled'

type PopupProps = {
  title?: string
  onClose?: () => void
  onCancel?: () => void
  onValidate?: () => void
  children?: ReactNode
  customAction?: ReactNode
}

export default function Popup ({
  title,
  onClose,
  onCancel,
  onValidate,
  children,
  customAction,
  ...rest
}: PopupProps & SpaceProps) {
  return (
    <PopupBackground
      {...rest}
      onClick={event =>
        event.currentTarget === event.target &&
        (onCancel ? onCancel() : onClose?.())
      }
    >
      <PopupContainer padding="2">
        {title && <Title>{title}</Title>}

        <PopupPanel>{children}</PopupPanel>

        <hr />

        <PopupActionPanel>
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}

          {customAction}

          {onValidate && (
            <Button variant="primary" onClick={onValidate}>
              Confirm
            </Button>
          )}

          {onClose && (
            <Button variant="primary" onClick={onClose}>
              Close
            </Button>
          )}
        </PopupActionPanel>
      </PopupContainer>
    </PopupBackground>
  )
}

Popup.defaultProps = {
  px: [3, 5],
  py: [3, 5],
}

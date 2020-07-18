import Button from 'components/Button'
import { CancelIcon, CloseIcon, ConfirmIcon } from 'components/Icon'
import { Title } from 'components/Title'
import React, { ReactNode } from 'react'
import { SpaceProps } from 'styled-system'
import { PopupActionPanel, PopupBackground, PopupContainer, PopupPanel } from './styled'

type PopupProps = {
  title?: string
  onClose?: () => void
  onCancel?: () => void
  onValidate?: () => void
  minHeightRequired?: boolean
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
  minHeightRequired,
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
        {title && <hr />}

        <PopupPanel autosize={!minHeightRequired}>{children}</PopupPanel>

        <hr />

        <PopupActionPanel>
          {onClose && (
            <Button
              variant="primary"
              onClick={onClose}
              icon={CloseIcon}
              title="Close"
            />
          )}

          {onCancel && (
            <Button
              variant="secondary"
              onClick={onCancel}
              icon={CancelIcon}
              title="Cancel"
            />
          )}

          {customAction}

          {onValidate && (
            <Button
              variant="primary"
              onClick={onValidate}
              icon={ConfirmIcon}
              title="Confirm"
            />
          )}
        </PopupActionPanel>
      </PopupContainer>
    </PopupBackground>
  )
}

Popup.defaultProps = {
  px: [3, 3, 5],
  py: [3, 3, 5],
}

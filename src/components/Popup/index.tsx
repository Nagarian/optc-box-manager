import { Button } from 'components/Button'
import { CancelIcon, CloseIcon, ConfirmIcon } from 'components/Icon'
import { Title } from 'components/Title'
import { ReactNode } from 'react'
import { SpaceProps } from 'styled-system'
import {
  PopupActionPanel,
  PopupBackground,
  PopupContainer,
  PopupPanel,
} from './styled'

type PopupProps = {
  title?: string
  onClose?: () => void
  onCancel?: () => void
  onValidate?: () => void
  minHeightRequired?: boolean
  children?: ReactNode
  customAction?: ReactNode
  hideMainActions?: boolean
}

export function Popup({
  title,
  onClose,
  onCancel,
  onValidate,
  children,
  customAction,
  hideMainActions = false,
  minHeightRequired,
  px = [2, 3, 5],
  py = [3, 3, 5],
  ...rest
}: PopupProps & SpaceProps) {
  return (
    <PopupBackground
      px={px}
      py={py}
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
          {!hideMainActions && onClose && (
            <Button
              variant="primary"
              onClick={onClose}
              icon={CloseIcon}
              title="Close"
            />
          )}

          {!hideMainActions && onCancel && (
            <Button
              variant="secondary"
              onClick={onCancel}
              icon={CancelIcon}
              title="Cancel"
            />
          )}

          {customAction}

          {!hideMainActions && onValidate && (
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

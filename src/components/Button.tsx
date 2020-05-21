import React from 'react'
import styled, { css } from 'styled-components'
import {
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  FontSizeProps,
  FontWeightProps,
  gridArea,
  GridAreaProps,
  space,
  SpaceProps,
  typography,
  variant,
} from 'styled-system'
import { cleanStyledSystem } from 'styles'
import { Icon } from './Icon'

const Btn = styled('button').withConfig(cleanStyledSystem)<StyledButtonProps>(
  compose(space, color, border, typography, gridArea),
  variant({
    scale: 'buttons',
    variants: {
      primary: {},
    },
  }),
  css`
    display: grid;
    grid-gap: 0.8em;
    grid-auto-flow: column;
    place-items: center;
    place-content: center;
  `,
)

type StyledButtonProps = SpaceProps &
  GridAreaProps &
  ColorProps &
  BorderProps &
  FontSizeProps &
  FontWeightProps & {
    variant: 'primary' | 'secondary' | 'link' | 'danger'
  }

type ButtonProps = StyledButtonProps & {
  icon?: Icon
} & React.HTMLAttributes<HTMLButtonElement>

export default function Button ({
  icon: Icon,
  children,
  variant,
  ...rest
}: ButtonProps) {
  const defaultPaddingFix = !!Icon && !children ? { px: 0, py: 0 } : {}
  return (
    <Btn variant={variant} {...rest} {...defaultPaddingFix}>
      {Icon && <Icon size={2} />}
      {children}
    </Btn>
  )
}

Button.defaultProps = {
  variant: 'primary',
  px: 2,
  py: 1,
  fontWeight: 1,
  fontSize: 1,
  border: 'currentColor solid medium',
}

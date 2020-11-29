import { ButtonHTMLAttributes } from 'react'
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
  SizeProps,
} from 'styled-system'
import { cleanStyledSystem, place, PlaceProps } from 'styles'
import { Icon, LoaderIcon } from './Icon'

type StyledButtonProps = SpaceProps &
  GridAreaProps &
  PlaceProps &
  ColorProps &
  BorderProps &
  FontSizeProps &
  SizeProps &
  FontWeightProps & {
    variant: 'primary' | 'secondary' | 'link' | 'danger'
    href?: string
  }

type ButtonProps = StyledButtonProps & {
  icon?: Icon
  isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button ({
  icon: Icon,
  children,
  variant,
  isLoading,
  href,
  size = 1,
  ...rest
}: ButtonProps) {
  const defaultPaddingFix = !!Icon && !children ? { px: 2, py: 2 } : {}
  const asLink = href ? { as: 'a', href, target: '_blank' } : ({} as any)
  return (
    <Btn
      variant={variant}
      disabled={isLoading}
      {...asLink}
      {...rest}
      {...defaultPaddingFix}
    >
      {isLoading && <LoaderIcon size={size} marginRight={children ? 2 : 0} />}
      {Icon && <Icon size={size} marginRight={children ? 2 : 0} color="currentColor" />}
      {children}
    </Btn>
  )
}

Button.defaultProps = {
  variant: 'primary',
  px: 3,
  py: 2,
  fontWeight: 1,
  fontSize: 3,
  border: 'currentColor solid',
  borderWidth: 'thick',
  borderRadius: 4,
  placeItems: 'center',
  placeContent: 'center',
}

const Btn = styled('button').withConfig(cleanStyledSystem)<StyledButtonProps>(
  compose(space, color, border, typography, gridArea, place),
  variant({
    scale: 'buttons',
    variants: {
      primary: {},
    },
  }),
  css`
    display: flex;
  `,
)

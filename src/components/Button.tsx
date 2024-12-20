import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonHTMLAttributes, FC } from 'react'
import {
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  flexDirection,
  FlexDirectionProps,
  FontSizeProps,
  FontWeightProps,
  gridArea,
  GridAreaProps,
  SizeProps,
  space,
  SpaceProps,
  typography,
  variant,
} from 'styled-system'
import { cleanStyledSystem, gap, GapProps, place, PlaceProps } from 'styles'
import { Icon, LoaderIcon } from './Icon'

type StyledButtonProps = SpaceProps &
  GridAreaProps &
  PlaceProps &
  ColorProps &
  BorderProps &
  FontSizeProps &
  SizeProps &
  FlexDirectionProps &
  GapProps &
  FontWeightProps & {
    variant?: 'primary' | 'secondary' | 'link' | 'danger'
    href?: string
  }

export type ButtonProps = StyledButtonProps & {
  icon?: Icon
  iconVariant?: 'horizontal' | 'vertical'
  isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  icon: Icon,
  children,
  iconVariant,
  isLoading,
  href,
  size = 1,
  variant = 'primary',
  px = 3,
  py = 2,
  fontWeight = 1,
  fontSize = 3,
  border = 'currentColor solid',
  borderWidth = 'thick',
  borderRadius = 4,
  placeItems = 'center',
  placeContent = 'center',
  gap = 1,
  ...rest
}: ButtonProps) {
  const defaultPaddingFix = !!Icon && !children ? { px: 2, py: 2 } : {}
  const asLink = href
    ? { as: 'a' as React.ElementType, href, target: '_blank' }
    : {}
  return (
    <Btn
      variant={variant}
      disabled={isLoading}
      px={px}
      py={py}
      fontWeight={fontWeight}
      fontSize={fontSize}
      border={border}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      placeItems={placeItems}
      placeContent={placeContent}
      gap={gap}
      flexDirection={iconVariant === 'vertical' ? 'column' : 'row'}
      {...asLink}
      {...rest}
      {...defaultPaddingFix}
    >
      {isLoading && <LoaderIcon size={size} marginRight={children ? 2 : 0} />}
      {Icon && (
        <Icon size={size} marginRight={children ? 2 : 0} color="currentColor" />
      )}
      {children}
    </Btn>
  )
}

const Btn = styled('button', cleanStyledSystem)<StyledButtonProps>(
  compose(
    flexDirection,
    space,
    color,
    border,
    typography,
    gridArea,
    place,
    gap,
  ),
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

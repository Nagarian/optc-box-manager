import styled, { css } from 'styled-components'
import {
  color,
  space,
  SpaceProps,
  ColorProps,
  border,
  BorderProps,
  compose,
  variant,
  typography,
  FontSizeProps,
  FontWeightProps,
} from 'styled-system'
import { cleanStyledSystem } from 'styles'

type ButtonProps = SpaceProps &
  ColorProps &
  BorderProps &
  FontSizeProps &
  FontWeightProps & {
    variant?: 'none' | 'primary' | 'secondary' | 'link' | 'text'
  }

const Button = styled('button').withConfig(cleanStyledSystem)<ButtonProps>(
  compose(space, color, border, typography),
  variant({
    scale: 'buttons',
    variants: {
      none: {},
    },
  }),
  css`
    display: grid;
    grid-template: auto 1fr;
    grid-gap: 0.8em;
    grid-auto-flow: column;
    place-items: center;
    place-content: center;
  `,
)

Button.defaultProps = {
  variant: 'none',
  px: 2,
  py: 1,
  fontWeight: 1,
  fontSize: 1,
}

export default Button

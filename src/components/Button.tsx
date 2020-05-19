import styled from 'styled-components'
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

type ButtonProps = SpaceProps & ColorProps & BorderProps & FontSizeProps & FontWeightProps & {
  variant: 'primary' | 'secondary' | 'link' | 'text'
}

const Button = styled('button')<ButtonProps>(
  compose(
    space,
    color,
    border,
    typography,
  ),
  variant({
    scale: 'buttons',
    variants: {
      primary: {},
    },
  }),
)

Button.defaultProps = {
  variant: 'primary',
  px: 2,
  py: 1,
  fontWeight: 1,
  fontSize: 1,
}

export default Button

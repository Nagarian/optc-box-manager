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
} from 'styled-system'

type ButtonProps = SpaceProps & ColorProps & BorderProps & {
  variant: 'primary' | 'secondary' | 'link' | 'text'
}

const Button = styled('button')<ButtonProps>(
  compose(
    space,
    color,
    border,
  ),
  variant(({
    variants: {
      primary: {
        backgroundColor: 'primary',
        color: 'primaryText',
      },
      secondary: {
        backgroundColor: 'secondary',
        color: 'secondaryText',
      },
      link: {
        backgroundColor: 'transparent',
        color: 'primary',
      },
      text: {
        backgroundColor: 'transparent',
        color: 'text',
      },
    },
  })),
)

Button.defaultProps = {
  backgroundColor: 'primary',
  color: 'primaryText',
  border: 'none',
  borderRadius: 0,
  px: 2,
  py: 1,
}

export default Button

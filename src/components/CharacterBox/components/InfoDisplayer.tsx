import { themeGet } from '@styled-system/theme-get'
import styled, { css } from 'styled-components'
import { color, ColorProps, variant } from 'styled-system'
import { cleanStyledSystem } from 'styles'

type InfoDisplayerProps = ColorProps & {
  anchorY: 'top' | 'bottom'
  anchorX: 'left' | 'right' | 'middle'
}

const InfoDisplayer = styled('span').withConfig(cleanStyledSystem)<InfoDisplayerProps>(
  color,
  css`
    display: block;
    position: absolute;
    font-weight: bold;
    font-size: ${themeGet('fontSizes.0')};
    border-radius: ${themeGet('fontSizes.0')};
    padding: 0 0.5rem;
    margin: 0.3rem;

    background-color: ${themeGet('colors.primary')}99;
    backdrop-filter: brightness(0.8) blur(2px);
  `,
  variant({
    prop: 'anchorY',
    variants: {
      top: {
        top: 0,
      },
      bottom: {
        bottom: 0,
      },
    },
  }),
  variant({
    prop: 'anchorX',
    variants: {
      left: {
        left: 0,
      },
      right: {
        right: 0,
      },
      middle: {
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
  }),
)

InfoDisplayer.defaultProps = {
  color: 'primaryText',
}

export default InfoDisplayer

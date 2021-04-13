import { themeGet } from '@styled-system/theme-get'
import styled, { css } from 'styled-components'
import { color, ColorProps, flexDirection, FlexDirectionProps, variant } from 'styled-system'
import { cleanStyledSystem } from 'styles'

type InfoDisplayerProps = ColorProps & FlexDirectionProps & {
  anchorY: 'top' | 'bottom' | 'middle'
  anchorX: 'left' | 'right' | 'middle'
  anchorZ?: 'normal' | 'top'
}

const InfoDisplayer = styled('span').withConfig(cleanStyledSystem)<InfoDisplayerProps>(
  color,
  flexDirection,
  css`
    position: absolute;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: ${themeGet('fontSizes.0')};
    border-radius: ${themeGet('fontSizes.0')};
    padding: ${(p: any) => p.flexDirection === 'column' ? '0.5rem 0' : '0 0.5rem'};
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
      middle: {
        top: '50%',
        transform: 'translateY(-50%)',
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
        left: '46%',
        transform: 'translateX(-50%)',
      },
    },
  }),
)

InfoDisplayer.defaultProps = {
  color: 'primaryText',
  anchorZ: 'normal',
}

export default InfoDisplayer

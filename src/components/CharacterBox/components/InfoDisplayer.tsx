import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'
import { FunctionComponent, PropsWithChildren } from 'react'
import {
  color,
  ColorProps,
  flexDirection,
  FlexDirectionProps,
  variant,
} from 'styled-system'
import { cleanStyledSystem } from 'styles'

type InfoDisplayerProps = ColorProps &
  FlexDirectionProps & {
    anchorY: 'top' | 'bottom' | 'middle'
    anchorX: 'left' | 'right' | 'middle'
    anchorZ?: 'normal' | 'top'
  }

const Displayer = styled('span', cleanStyledSystem)<InfoDisplayerProps>`
  ${color}
  ${flexDirection}
  position: absolute;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: ${themeGet('fontSizes.0')};
  border-radius: ${themeGet('fontSizes.0')};
  padding: ${p => (p.flexDirection === 'column' ? '0.5rem 0' : '0 0.5rem')};
  margin: 0.3rem;

  background-color: ${themeGet('colors.primary')}C9;

  ${variant({
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
  })}

  ${variant({
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
  })}

  ${variant({
    prop: 'anchorZ',
    variants: {
      normal: {
        zIndex: 0,
      },
      top: {
        zIndex: 'highlight',
      },
    },
  })}
` as  FunctionComponent<InfoDisplayerProps>

const InfoDisplayer = (p: PropsWithChildren<InfoDisplayerProps>) => (
  <Displayer color="primaryText" anchorZ="normal" {...p} />
)

export default InfoDisplayer

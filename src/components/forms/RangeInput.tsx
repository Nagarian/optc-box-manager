import { css, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import * as CSS from 'csstype'
import { space, SpaceProps } from 'styled-system'

export type RangeInputProps = SpaceProps & {
  thumbImage?: string
  thumbSvg?: string
  range?: {
    color?: CSS.Property.Color
    backgroundColor?: CSS.Property.Color
  }
}

const track = (p: RangeInputProps & { theme: Theme }) => css`
  height: ${p.theme.sizes[0]};
  cursor: pointer;
  background-color: ${p.theme.colors.grey};
  color: ${p.range?.color};
  background-color: ${p.range?.backgroundColor};
  border-radius: ${p.theme.sizes[2]};
  box-sizing: border-box;
`

const thumb = (
  p: RangeInputProps & {
    theme: Theme
    value?: unknown
  },
) => css`
  appearance: none;
  cursor: pointer;
  height: ${p.theme.sizes[0]};
  width: ${p.theme.sizes[0]};
  transform: scale(4);
  border: none;
  ${p.range}

  // as image
  background: ${p.thumbImage &&
  `url(${p.thumbImage}) center / contain no-repeat`};
  // as svg mask
  background-color: ${p.thumbSvg && 'currentColor'};
  mask: ${p.thumbSvg && `url(${p.thumbSvg})`};
  ${p.value === 0 && 'filter: grayscale(0.6);'}
`

const RangeInput = styled.input<RangeInputProps>`
  appearance: none;
  width: 100%;
  background-color: transparent;
  ${space}
  padding:
    calc(${p => p.theme.sizes[0]} * 1.5)
    calc(${p => p.theme.sizes[0]} * 1.5);

  ::-webkit-slider-runnable-track {
    ${p => track(p)}
  }
  ::-moz-range-track {
    ${p => track(p)}
  }

  ::-webkit-slider-thumb {
    ${p => thumb(p)}
  }
  ::-moz-range-thumb {
    ${p => thumb(p)}
  }
`
RangeInput.defaultProps = {
  type: 'range',
}

export default RangeInput

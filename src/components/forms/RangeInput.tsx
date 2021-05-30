import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'
import { space, SpaceProps } from 'styled-system'

export type RangeInputProps = SpaceProps & {
  thumbImage?: string
  thumbSvg?: string
  range?: {
    color?: any
    backgroundColor?: any
  }
}

const track = (p: RangeInputProps) => css`
  height: ${themeGet('sizes.0')(p)};
  cursor: pointer;
  background-color: ${themeGet('colors.grey')(p)};
  ${p.range}
  border-radius: ${themeGet('sizes.2')(p)};
  box-sizing: border-box;
`

const thumb = (p: RangeInputProps) => css`
  -webkit-appearance: none;
  cursor: pointer;
  height: ${themeGet('sizes.0')(p)};
  width: ${themeGet('sizes.0')(p)};
  transform: scale(4);
  border: none;
  ${p.range}

  // as image
  background: ${p.thumbImage &&
  `url(${p.thumbImage}) center / contain no-repeat`};
  // as svg mask
  background-color: ${p.thumbSvg && 'currentColor'};
  mask: ${p.thumbSvg && `url(${p.thumbSvg})`};
`

const RangeInput = styled.input<RangeInputProps>(
  p => css`
    -webkit-appearance: none;
    width: 100%;
    background-color: transparent;
    ${space(p)}
    padding:
    calc(${themeGet('sizes.0')(p)} * 1.5)
    calc(${themeGet('sizes.0')(p)} * 1.5);

    ::-webkit-slider-runnable-track {
      ${track(p)}
    }

    ::-webkit-slider-thumb {
      ${thumb(p)}
      ${p.value === 0 && 'filter: grayscale(0.6);'}
    }

    ::-moz-range-track {
      ${track(p)}
    }

    ::-moz-range-thumb {
      ${thumb(p)}
      ${p.value === 0 && 'filter: grayscale(0.6);'}
    }
  `,
)
RangeInput.defaultProps = {
  type: 'range',
}

export default RangeInput

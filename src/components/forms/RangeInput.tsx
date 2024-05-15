import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'
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

const RangeInput = styled.input<RangeInputProps>`
  appearance: none;
  width: 100%;
  background-color: transparent;
  ${space}
  padding:
    calc(${themeGet('sizes.0')} * 1.5)
    calc(${themeGet('sizes.0')} * 1.5);

  ::-webkit-slider-runnable-track,
  ::-moz-range-track {
    height: ${themeGet('sizes.0')};
    cursor: pointer;
    background-color: ${themeGet('colors.grey')};
    ${p => p.range}
    border-radius: ${themeGet('sizes.2')};
    box-sizing: border-box;
  }

  ::-webkit-slider-thumb,
  ::-moz-range-thumb {
    appearance: none;
    cursor: pointer;
    height: ${themeGet('sizes.0')};
    width: ${themeGet('sizes.0')};
    transform: scale(4);
    border: none;
    ${p => p.range}

    // as image
    background: ${p =>
      p.thumbImage && `url(${p.thumbImage}) center / contain no-repeat`};
    // as svg mask
    background-color: ${p => p.thumbSvg && 'currentColor'};
    mask: ${p => p.thumbSvg && `url(${p.thumbSvg})`};
    ${p => p.value === 0 && 'filter: grayscale(0.6);'}
  }
`
RangeInput.defaultProps = {
  type: 'range',
}

export default RangeInput

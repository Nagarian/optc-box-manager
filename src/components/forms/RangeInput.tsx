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

const RangeInput = styled.input<RangeInputProps>`
  appearance: none;
  width: 100%;
  background-color: transparent;
  ${space}
  padding:
    calc(${p => p.theme.sizes[0]} * 1.5)
    calc(${p => p.theme.sizes[0]} * 1.5);

  ::-webkit-slider-runnable-track,
  ::-moz-range-track {
    height: ${p => p.theme.sizes[0]};
    cursor: pointer;
    background-color: ${p => p.theme.colors.grey};
    ${p => p.range}
    border-radius: ${p => p.theme.sizes[2]};
    box-sizing: border-box;
  }

  ::-webkit-slider-thumb,
  ::-moz-range-thumb {
    appearance: none;
    cursor: pointer;
    height: ${p => p.theme.sizes[0]};
    width: ${p => p.theme.sizes[0]};
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

import { themeGet } from '@styled-system/theme-get'
import styled, { css } from 'styled-components'
import { space, SpaceProps } from 'styled-system'

const track = css<RangeInputProps>`
  width: 100%;
  height: ${themeGet('sizes.0')};
  margin:
    calc(${themeGet('sizes.0')} * 1.5)
    calc(${themeGet('sizes.0')} * 1.5);
  cursor: pointer;
  background-color: ${themeGet('colors.grey')};
  ${p => p.range}
  border-radius: ${themeGet('sizes.2')};
`

const thumb = css<RangeInputProps>`
  -webkit-appearance: none;
  cursor: pointer;
  height: ${themeGet('sizes.0')};
  width: ${themeGet('sizes.0')};
  transform: scale(4);

  // as image
  background: ${p => p.thumbImage && `url(${p.thumbImage}) center / contain no-repeat`};

  // as svg mask
  background-color: ${p => p.thumbSvg && 'currentColor'};
  mask: ${p => p.thumbSvg && `url(${p.thumbSvg})`};
`

type RangeInputProps = {
  thumbImage?: string
  thumbSvg?: string
  range?: {
    color?: any
    backgroundColor?: any
  }
}

const RangeInput = styled.input.attrs(() => ({ type: 'range' }))<
  SpaceProps & RangeInputProps
>`
  -webkit-appearance: none;
  width: 100%;
  background-color: transparent;
  ${space}

  ::-webkit-slider-runnable-track {
    ${track}
  }

  ::-webkit-slider-thumb {
    ${thumb}
  }

  ::-moz-range-track {
    ${track}
  }

  ::-moz-range-thumb {
    ${thumb}
  }
`

export default RangeInput

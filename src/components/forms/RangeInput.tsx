import { themeGet } from '@styled-system/theme-get'
import styled, { css } from 'styled-components'
import { color, ColorProps, space, SpaceProps } from 'styled-system'

const track = css<IconProps>`
  width: 100%;
  height: ${themeGet('sizes.0')};
  margin: calc(${themeGet('sizes.0')} * 1.5) ${themeGet('sizes.0')};
  cursor: pointer;
  background: currentColor;
  border-radius: ${themeGet('sizes.2')};

  filter: opacity(0.5);

  &:focus {
    filter: ${p => (p.thumbSvg ? 'saturate(40%)' : null)};
  }
`

const thumb = css<IconProps>`
  height: ${themeGet('sizes.0')};
  width: ${themeGet('sizes.0')};
  background: ${p => (p.thumbImage ? `url(${p.thumbImage})` : 'currentColor')};
  mask: ${p => (p.thumbSvg ? `url(${p.thumbSvg})` : null)};
  cursor: pointer;
  -webkit-appearance: none;
  filter: ${p => (p.thumbSvg ? 'saturate(250%)' : null)};
  transform: scale(4);
`

type IconProps = {
  thumbImage?: string
  thumbSvg?: string
}

const RangeInput = styled.input.attrs(() => ({ type: 'range' }))<
  ColorProps & SpaceProps & IconProps
>`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  ${color}
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

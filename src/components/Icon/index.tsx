import styled, { StyledComponent } from 'styled-components'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import { clean } from 'styles'
import { ReactComponent as Add } from './add.svg'
import { ReactComponent as Settings } from './settings.svg'

const BaseSvg = (
  svg: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >,
) => styled(svg).withConfig(clean('color', 'fill'))<SpaceProps & SizeProps>`
  ${space}
  ${size}
  color: ${p => p.color};
  fill: currentColor;
`

export type Icon = StyledComponent<
  React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>,
  any,
  SpaceProps & SizeProps,
  never
>

export const AddSvg: Icon = BaseSvg(Add)
export const SettingsSvg: Icon = BaseSvg(Settings)

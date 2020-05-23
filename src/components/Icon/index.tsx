import styled, { StyledComponent } from 'styled-components'
import { size, SizeProps, space, SpaceProps } from 'styled-system'
import { clean } from 'styles'
import { ReactComponent as Add } from './add.svg'
import CottonCandySvg, { ReactComponent as CottonCandy } from './cottoncandy.svg'
import SettingsSvg, { ReactComponent as Settings } from './settings.svg'
import SpecialLvl from './special.png'
import SupportSvg, { ReactComponent as Support } from './support.svg'

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

export { CottonCandySvg, SettingsSvg, SupportSvg, SpecialLvl }

export const AddIcon: Icon = BaseSvg(Add)
export const SettingsIcon: Icon = BaseSvg(Settings)
export const CottonCandyIcon: Icon = BaseSvg(CottonCandy)
export const SupportIcon: Icon = BaseSvg(Support)

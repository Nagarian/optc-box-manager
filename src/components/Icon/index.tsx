import styled, { StyledComponent } from 'styled-components'
import { color, size, SizeProps, space, SpaceProps } from 'styled-system'
import { clean } from 'styles'
import { ReactComponent as Add } from './add.svg'
import { ReactComponent as Arrow } from './arrow.svg'
import { ReactComponent as Ascending } from './ascending.svg'
import { ReactComponent as Cancel } from './cancel.svg'
import { ReactComponent as Confirm } from './confirm.svg'
import CottonCandySvg, { ReactComponent as CottonCandy } from './cottoncandy.svg'
import { ReactComponent as Descending } from './descending.svg'
import FilterSortSvg, { ReactComponent as FilterSort } from './filtersort.svg'
import SettingsSvg, { ReactComponent as Settings } from './settings.svg'
import SpecialLvl from './special.png'
import SupportSvg, { ReactComponent as Support } from './support.svg'
import { ReactComponent as TailSpin } from './tail-spin.svg'

const BaseSvg = (
  svg: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >,
) => styled(svg).withConfig(clean('color', 'fill'))<SpaceProps & SizeProps>`
  ${space}
  ${size}
  ${color}
  fill: currentColor;
`

export type Icon = StyledComponent<
  React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>,
  any,
  SpaceProps & SizeProps,
  never
>

export { CottonCandySvg, SettingsSvg, SupportSvg, SpecialLvl, FilterSortSvg }

export const AddIcon: Icon = BaseSvg(Add)
export const SettingsIcon: Icon = BaseSvg(Settings)
export const CottonCandyIcon: Icon = BaseSvg(CottonCandy)
export const SupportIcon: Icon = BaseSvg(Support)
export const LoaderIcon: Icon = BaseSvg(TailSpin)
export const ArrowIcon: Icon = BaseSvg(Arrow)
export const FilterSortIcon: Icon = BaseSvg(FilterSort)
export const CancelIcon: Icon = BaseSvg(Cancel)
export const ConfirmIcon: Icon = BaseSvg(Confirm)
export const AscendingIcon: Icon = BaseSvg(Ascending)
export const DescendingIcon: Icon = BaseSvg(Descending)

export const SpecialLvlIcon = styled.img.attrs(() => ({
  src: SpecialLvl,
}))<SpaceProps & SizeProps>`
  object-fit: contain;
  ${space}
  ${size}
`

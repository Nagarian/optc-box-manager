import styled, { StyledComponent } from 'styled-components'
import { color, size, SizeProps, space, SpaceProps, compose } from 'styled-system'
import { clean, PlaceProps, place } from 'styles'
import { ReactComponent as Add } from './add.svg'
import { ReactComponent as Arrow } from './arrow.svg'
import { ReactComponent as Ascending } from './ascending.svg'
import { ReactComponent as Cancel } from './cancel.svg'
import { ReactComponent as Close } from './close.svg'
import { ReactComponent as Confirm } from './confirm.svg'
import CottonCandySvg, { ReactComponent as CottonCandy } from './cottoncandy.svg'
import { ReactComponent as Descending } from './descending.svg'
import { ReactComponent as Edit } from './edit.svg'
import FilterSortSvg, { ReactComponent as FilterSort } from './filtersort.svg'
import { ReactComponent as Search } from './search.svg'
import SettingsSvg, { ReactComponent as Settings } from './settings.svg'
import SpecialLvl from './special.png'
import SupportSvg, { ReactComponent as Support } from './support.svg'
import { ReactComponent as TailSpin } from './tail-spin.svg'

type StyledIconProps = SpaceProps & SizeProps & PlaceProps

const BaseSvg = (
  svg: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >,
) => styled(svg).withConfig(clean('color', 'fill'))<StyledIconProps>`
  ${compose(space, size, color, place)}
  fill: currentColor;
`

export type Icon = StyledComponent<
  React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>,
  any,
  StyledIconProps,
  never
>

export { CottonCandySvg, SettingsSvg, SupportSvg, SpecialLvl, FilterSortSvg }

export const AddIcon: Icon = BaseSvg(Add)
export const ArrowIcon: Icon = BaseSvg(Arrow)
export const AscendingIcon: Icon = BaseSvg(Ascending)
export const CancelIcon: Icon = BaseSvg(Cancel)
export const CloseIcon: Icon = BaseSvg(Close)
export const ConfirmIcon: Icon = BaseSvg(Confirm)
export const CottonCandyIcon: Icon = BaseSvg(CottonCandy)
export const DescendingIcon: Icon = BaseSvg(Descending)
export const EditIcon: Icon = BaseSvg(Edit)
export const FilterSortIcon: Icon = BaseSvg(FilterSort)
export const LoaderIcon: Icon = BaseSvg(TailSpin)
export const SettingsIcon: Icon = BaseSvg(Settings)
export const SupportIcon: Icon = BaseSvg(Support)
export const SearchIcon: Icon = BaseSvg(Search)

export const SpecialLvlIcon = styled.img.attrs(() => ({
  src: SpecialLvl,
}))<SpaceProps & SizeProps>`
  object-fit: contain;
  ${space}
  ${size}
`

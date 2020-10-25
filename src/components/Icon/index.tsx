import { FunctionComponent, SVGProps } from 'react'
import styled, { StyledComponent } from 'styled-components'
import {
  color,
  compose,
  size,
  SizeProps,
  space,
  SpaceProps,
} from 'styled-system'
import { clean, place, PlaceProps } from 'styles'
import { ReactComponent as Add } from './add.svg'
import { ReactComponent as Arrow } from './arrow.svg'
import { ReactComponent as Ascending } from './ascending.svg'
import { ReactComponent as Belly } from './belly.svg'
import { ReactComponent as Cancel } from './cancel.svg'
import { ReactComponent as Clear } from './clear.svg'
import { ReactComponent as Close } from './close.svg'
import { ReactComponent as Confirm } from './confirm.svg'
import CottonCandySvg, { ReactComponent as CottonCandy } from './cottoncandy.svg'
import { ReactComponent as Delete } from './delete.svg'
import { ReactComponent as Descending } from './descending.svg'
import { ReactComponent as Edit } from './edit.svg'
import { ReactComponent as Evolve } from './evolve.svg'
import { ReactComponent as FilterSort } from './filtersort.svg'
import { ReactComponent as GatherIsland } from './gather-island.svg'
import { ReactComponent as LimitBreak } from './limitbreak.svg'
import Logo from './logo.png'
import { ReactComponent as OpenInDB } from './open-in-db.svg'
import { ReactComponent as PirateFestAbility } from './piratefest-ability.svg'
import { ReactComponent as PirateFestBoth } from './piratefest-both.svg'
import { ReactComponent as PirateFestSpecial } from './piratefest-special.svg'
import PirateFestSvg, { ReactComponent as PirateFest } from './piratefest.svg'
import { ReactComponent as Potential } from './potential.svg'
import { ReactComponent as ResetApply } from './reset-apply.svg'
import { ReactComponent as ResetRemove } from './reset-remove.svg'
import { ReactComponent as Reset } from './reset.svg'
import { ReactComponent as SaveSearch } from './savesearch.svg'
import { ReactComponent as Search } from './search.svg'
import { ReactComponent as Settings } from './settings.svg'
import { ReactComponent as SkillBook } from './skillbook.svg'
import SpecialLvl from './special.png'
import { ReactComponent as SugoPull } from './sugopull.svg'
import SupportSvg, { ReactComponent as Support } from './support.svg'
import { ReactComponent as TailSpin } from './tail-spin.svg'
import { ReactComponent as Treasure } from './treasure.svg'

type StyledIconProps = SpaceProps & SizeProps & PlaceProps

const BaseSvg = (
  svg: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>,
) => styled(svg).withConfig(clean('color', 'fill'))<StyledIconProps>`
  ${compose(space, size, color, place)}
  fill: currentColor;
`

export type Icon = StyledComponent<
  FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>,
  any,
  StyledIconProps,
  never
>

export { CottonCandySvg, SupportSvg, SpecialLvl, PirateFestSvg }

export const AddIcon: Icon = BaseSvg(Add)
export const ArrowIcon: Icon = BaseSvg(Arrow)
export const AscendingIcon: Icon = BaseSvg(Ascending)
export const CancelIcon: Icon = BaseSvg(Cancel)
export const ClearIcon: Icon = BaseSvg(Clear)
export const CloseIcon: Icon = BaseSvg(Close)
export const ConfirmIcon: Icon = BaseSvg(Confirm)
export const CottonCandyIcon: Icon = BaseSvg(CottonCandy)
export const DeleteIcon: Icon = BaseSvg(Delete)
export const DescendingIcon: Icon = BaseSvg(Descending)
export const EditIcon: Icon = BaseSvg(Edit)
export const EvolveIcon: Icon = BaseSvg(Evolve)
export const FilterSortIcon: Icon = BaseSvg(FilterSort)
export const LimitBreakIcon: Icon = BaseSvg(LimitBreak)
export const OpenInDBIcon: Icon = BaseSvg(OpenInDB)
export const PirateFestIcon: Icon = BaseSvg(PirateFest)
PirateFestIcon.defaultProps = {
  color: 'primaryText',
}
export const PirateFestAbilityIcon: Icon = BaseSvg(PirateFestAbility)
PirateFestAbilityIcon.defaultProps = {
  color: 'primaryText',
}
export const PirateFestBothIcon: Icon = BaseSvg(PirateFestBoth)
PirateFestBothIcon.defaultProps = {
  color: 'primaryText',
}
export const PirateFestSpecialIcon: Icon = BaseSvg(PirateFestSpecial)
PirateFestSpecialIcon.defaultProps = {
  color: 'primaryText',
}
export const PotentialIcon: Icon = BaseSvg(Potential)
export const ResetIcon: Icon = BaseSvg(Reset)
export const ResetApplyIcon: Icon = BaseSvg(ResetApply)
export const ResetRemoveIcon: Icon = BaseSvg(ResetRemove)
export const LoaderIcon: Icon = BaseSvg(TailSpin)
export const SettingsIcon: Icon = BaseSvg(Settings)
export const SupportIcon: Icon = BaseSvg(Support)
SupportIcon.defaultProps = {
  color: 'specific.support',
  title: 'Support',
}
export const SearchIcon: Icon = BaseSvg(Search)
export const SaveSearchIcon: Icon = BaseSvg(SaveSearch)
export const SugoPullIcon: Icon = BaseSvg(SugoPull)
export const SkillBookIcon: Icon = BaseSvg(SkillBook)
export const BellyIcon: Icon = BaseSvg(Belly)
export const TreasureIcon: Icon = BaseSvg(Treasure)
export const GatherIslandIcon: Icon = BaseSvg(GatherIsland)

export const SpecialLvlIcon = styled.img.attrs(() => ({
  src: SpecialLvl,
}))<SpaceProps & SizeProps>`
  object-fit: contain;
  ${space}
  ${size}
` as Icon
SpecialLvlIcon.defaultProps = {
  title: 'Special Level',
}

export const LogoIcon = styled.img.attrs(() => ({
  src: Logo,
}))<SpaceProps & SizeProps>`
  object-fit: contain;
  ${space}
  ${size}
` as Icon

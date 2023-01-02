import { css } from '@emotion/react'
import styled, { StyledComponent } from '@emotion/styled'
import { Text } from 'components/Title'
import { FunctionComponent, SVGProps } from 'react'
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
import { ReactComponent as CameraFpp } from './camera-fpp.svg'
import { ReactComponent as CameraTavern } from './camera-tavern.svg'
import { ReactComponent as CameraTreasure } from './camera-treasure.svg'
import { ReactComponent as Clear } from './clear.svg'
import { ReactComponent as Close } from './close.svg'
import { ReactComponent as Confirm } from './confirm.svg'
import CottonCandySvg, {
  ReactComponent as CottonCandy,
} from './cottoncandy.svg'
import { ReactComponent as Delete } from './delete.svg'
import { ReactComponent as Descending } from './descending.svg'
import { ReactComponent as DuplicateHide } from './duplicate-hide.svg'
import { ReactComponent as DuplicateShow } from './duplicate-show.svg'
import { ReactComponent as Edit } from './edit.svg'
import { ReactComponent as Evolve } from './evolve.svg'
import { ReactComponent as FilterSort } from './filtersort.svg'
import { ReactComponent as GatherIsland } from './gather-island.svg'
import { ReactComponent as Hide } from './hide.svg'
import { ReactComponent as ImageAnalyzer } from './image-analyzer.svg'
import InkSvg, { ReactComponent as Ink } from './ink.svg'
import LevelSvg, { ReactComponent as Level } from './level.svg'
import { ReactComponent as LimitBreak } from './limitbreak.svg'
import Logo from './logo.png'
import { ReactComponent as NewsCoo } from './news-coo.svg'
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
import { ReactComponent as Share } from './share.svg'
import { ReactComponent as Show } from './show.svg'
import { ReactComponent as SkillBook } from './skillbook.svg'
import SpecialLvl from './special.png'
import SpecialSvg, { ReactComponent as Special } from './special.svg'
import { ReactComponent as SugoPull } from './sugopull.svg'
import SupportSvg, { ReactComponent as Support } from './support.svg'
import { ReactComponent as TailSpin } from './tail-spin.svg'
import { ReactComponent as Treasure } from './treasure.svg'
import { ReactComponent as VideoTreasure } from './video-treasure.svg'

type StyledIconProps = SpaceProps & SizeProps & PlaceProps & { title?: string }

export type Icon = StyledComponent<
  FunctionComponent<SVGProps<SVGSVGElement>>,
  StyledIconProps,
  any
>

const BaseSvg = (
  svg: FunctionComponent<SVGProps<SVGSVGElement>>,
): Icon => styled(svg, clean('color', 'fill'))<StyledIconProps>`
  ${compose(space, size, color, place)}
  fill: currentColor;
`

const BaseBaseImg = styled.img<StyledIconProps>(
  space,
  size,
  css`
    object-fit: contain;
  `,
)

const BaseImg = (src: string, title?: string): Icon => {
  const icon = styled(BaseBaseImg)()
  icon.defaultProps = {
    src,
    title,
  }
  return icon
}

export {
  CottonCandySvg,
  SupportSvg,
  SpecialLvl,
  PirateFestSvg,
  InkSvg,
  LevelSvg,
  SpecialSvg,
}

export const AddIcon = BaseSvg(Add)
export const ArrowIcon = BaseSvg(Arrow)
export const AscendingIcon = BaseSvg(Ascending)
export const BellyIcon = BaseSvg(Belly)
export const CancelIcon = BaseSvg(Cancel)
export const CameraFppIcon = BaseSvg(CameraFpp)
export const CameraTavernIcon = BaseSvg(CameraTavern)
export const CameraTreasureIcon = BaseSvg(CameraTreasure)
export const ClearIcon = BaseSvg(Clear)
export const CloseIcon = BaseSvg(Close)
export const ConfirmIcon = BaseSvg(Confirm)
export const CottonCandyIcon = BaseSvg(CottonCandy)
export const DeleteIcon = BaseSvg(Delete)
export const DescendingIcon = BaseSvg(Descending)
export const DuplicateHideIcon = BaseSvg(DuplicateHide)
export const DuplicateShowIcon = BaseSvg(DuplicateShow)
export const EditIcon = BaseSvg(Edit)
export const EvolveIcon = BaseSvg(Evolve)
export const FilterSortIcon = BaseSvg(FilterSort)
export const GatherIslandIcon = BaseSvg(GatherIsland)
export const HideIcon = BaseSvg(Hide)
export const ImageAnalyzerIcon = BaseSvg(ImageAnalyzer)
export const InkIcon = BaseSvg(Ink)
InkIcon.defaultProps = {
  color: 'primaryText',
  title: 'Support',
}
export const LimitBreakIcon = BaseSvg(LimitBreak)
export const LoaderIcon = BaseSvg(TailSpin)
export const NewsCooIcon = BaseSvg(NewsCoo)
export const OpenInDBIcon = BaseSvg(OpenInDB)
export const PirateFestIcon = BaseSvg(PirateFest)
PirateFestIcon.defaultProps = {
  color: 'primaryText',
}
export const PirateFestAbilityIcon = BaseSvg(PirateFestAbility)
PirateFestAbilityIcon.defaultProps = {
  color: 'primaryText',
}
export const PirateFestBothIcon = BaseSvg(PirateFestBoth)
PirateFestBothIcon.defaultProps = {
  color: 'primaryText',
}
export const PirateFestSpecialIcon = BaseSvg(PirateFestSpecial)
PirateFestSpecialIcon.defaultProps = {
  color: 'primaryText',
}
export const PotentialIcon = BaseSvg(Potential)
export const ResetIcon = BaseSvg(Reset)
export const ResetApplyIcon = BaseSvg(ResetApply)
export const ResetRemoveIcon = BaseSvg(ResetRemove)
export const SaveSearchIcon = BaseSvg(SaveSearch)
export const SettingsIcon = BaseSvg(Settings)
export const SearchIcon = BaseSvg(Search)
export const ShareIcon = BaseSvg(Share)
export const ShowIcon = BaseSvg(Show)
export const SkillBookIcon = BaseSvg(SkillBook)
export const SugoPullIcon = BaseSvg(SugoPull)
export const SupportIcon = BaseSvg(Support)
SupportIcon.defaultProps = {
  color: 'specific.support',
  title: 'Support',
}
export const LevelIcon = BaseSvg(Level)
LevelIcon.defaultProps = {
  color: 'primaryText',
}
export const LevelTextIcon = () => (
  <Text color="white" as="span">
    Lv.{' '}
  </Text>
)
export const TreasureIcon = BaseSvg(Treasure)
export const VideoTreasureIcon = BaseSvg(VideoTreasure)

export const SpecialLvlIcon = BaseSvg(Special)
SpecialLvlIcon.defaultProps = {
  color: 'primaryText',
}
// export const SpecialLvlIcon = BaseImg(SpecialLvl, 'Special Level')
export const LogoIcon = BaseImg(Logo)

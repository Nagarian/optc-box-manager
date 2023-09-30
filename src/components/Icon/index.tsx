import { css } from '@emotion/react'
import styled, { StyledComponent } from '@emotion/styled'
import { Text } from 'components/Title'
import { FunctionComponent, SVGProps } from 'react'
import {
  SizeProps,
  SpaceProps,
  color,
  compose,
  size,
  space,
} from 'styled-system'
import { PlaceProps, clean, place } from 'styles'
import Add from './add.svg?react'
import Arrow from './arrow.svg?react'
import Ascending from './ascending.svg?react'
import Belly from './belly.svg?react'
import CameraFpp from './camera-fpp.svg?react'
import CameraTavern from './camera-tavern.svg?react'
import CameraTreasure from './camera-treasure.svg?react'
import Cancel from './cancel.svg?react'
import Clear from './clear.svg?react'
import Close from './close.svg?react'
import Confirm from './confirm.svg?react'
import CottonCandySvg from './cottoncandy.svg'
import CottonCandy from './cottoncandy.svg?react'
import Delete from './delete.svg?react'
import Descending from './descending.svg?react'
import DuplicateHide from './duplicate-hide.svg?react'
import DuplicateShow from './duplicate-show.svg?react'
import Edit from './edit.svg?react'
import Evolve from './evolve.svg?react'
import FilterSort from './filtersort.svg?react'
import GatherIsland from './gather-island.svg?react'
import Hide from './hide.svg?react'
import ImageAnalyzer from './image-analyzer.svg?react'
import InkSvg from './ink.svg'
import Ink from './ink.svg?react'
import LevelSvg from './level.svg'
import Level from './level.svg?react'
import LimitBreak from './limitbreak.svg?react'
import Logo from './logo.png'
import NewsCoo from './news-coo.svg?react'
import OpenInDB from './open-in-db.svg?react'
import PirateFestAbility from './piratefest-ability.svg?react'
import PirateFestBoth from './piratefest-both.svg?react'
import PirateFestSpecial from './piratefest-special.svg?react'
import PirateFestSvg from './piratefest.svg'
import PirateFest from './piratefest.svg?react'
import Potential from './potential.svg?react'
import ResetApply from './reset-apply.svg?react'
import ResetRemove from './reset-remove.svg?react'
import Reset from './reset.svg?react'
import SaveSearch from './savesearch.svg?react'
import Search from './search.svg?react'
import Settings from './settings.svg?react'
import Share from './share.svg?react'
import Show from './show.svg?react'
import SkillBook from './skillbook.svg?react'
import SpecialLvl from './special.png'
import SpecialSvg from './special.svg'
import Special from './special.svg?react'
import SugoPull from './sugopull.svg?react'
import SupportSvg from './support.svg'
import Support from './support.svg?react'
import TailSpin from './tail-spin.svg?react'
import Treasure from './treasure.svg?react'
import VideoTreasure from './video-treasure.svg?react'

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
  InkSvg,
  LevelSvg,
  PirateFestSvg,
  SpecialLvl,
  SpecialSvg,
  SupportSvg,
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

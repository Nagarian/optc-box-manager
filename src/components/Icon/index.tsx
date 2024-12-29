import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Text } from 'components/Title'
import { FunctionComponent } from 'react'
import {
  color,
  ColorProps,
  size,
  SizeProps,
  space,
  SpaceProps,
} from 'styled-system'
import { clean, place, PlaceProps } from 'styles'
import Add from './add.svg?react'
import Arrow from './arrow.svg?react'
import Ascending from './ascending.svg?react'
import Belly from './belly.svg?react'
import CameraFpp from './camera-fpp.svg?react'
import CameraTavern from './camera-tavern.svg?react'
import CameraTreasure from './camera-treasure.svg?react'
import Cancel from './cancel.svg?react'
import Lock from './character_detail_icon_lock_ability.png'
import Clear from './clear.svg?react'
import Close from './close.svg?react'
import Confirm from './confirm.svg?react'
import Coop from './coop.svg?react'
import CoopCaptainSvg from './coop-captain.svg'
import CoopCaptain from './coop-captain.svg?react'
import CoopSpecialSvg from './coop-special.svg'
import CoopSpecial from './coop-special.svg?react'
import CottonCandySvg from './cottoncandy.svg'
import CottonCandy from './cottoncandy.svg?react'
import Delete from './delete.svg?react'
import Descending from './descending.svg?react'
import DuplicateHide from './duplicate-hide.svg?react'
import DuplicateSvg from './duplicate-show.svg'
import DuplicateShow from './duplicate-show.svg?react'
import Edit from './edit.svg?react'
import Evolve from './evolve.svg?react'
import GatherIsland from './gather-island.svg?react'
import Hide from './hide.svg?react'
import ImageAnalyzer from './image-analyzer.svg?react'
import InkSvg from './ink.svg'
import Ink from './ink.svg?react'
import LevelSvg from './level.svg'
import Level from './level.svg?react'
import LimitBreak from './limitbreak.svg?react'
import Logo from './logo.png'
import LuckSvg from './luck.svg'
import Luck from './luck.svg?react'
import NewsCoo from './news-coo.svg?react'
import OpenInDB from './open-in-db.svg?react'
import PirateFestSvg from './piratefest.svg'
import PirateFest from './piratefest.svg?react'
import PirateFestAbility from './piratefest-ability.svg?react'
import PirateFestBoth from './piratefest-both.svg?react'
import PirateFestSpecial from './piratefest-special.svg?react'
import Potential from './potential.svg?react'
import Reset from './reset.svg?react'
import ResetApply from './reset-apply.svg?react'
import ResetRemove from './reset-remove.svg?react'
import SaveSearch from './savesearch.svg?react'
import Search from './search.svg?react'
import SearchBuilder from './searchbuilder.svg?react'
import Settings from './settings.svg?react'
import Share from './share.svg?react'
import Shipyard from './shipyard.svg?react'
import ShipyardBottleSvg from './shipyard-bottle.svg'
import ShipyardBottle from './shipyard-bottle.svg?react'
import ShipyardFull from './shipyard-full.svg?react'
import Show from './show.svg?react'
import SkillBook from './skillbook.svg?react'
import SpecialLvl from './special.png'
import SpecialSvg from './special.svg'
import Special from './special.svg?react'
import SugoPull from './sugopull.svg?react'
import SugoPullExclude from './sugopull-exclude.svg?react'
import SugoPullInclude from './sugopull-include.svg?react'
import SupportSvg from './support.svg'
import Support from './support.svg?react'
import TailSpin from './tail-spin.svg?react'
import Treasure from './treasure.svg?react'
import VideoTreasure from './video-treasure.svg?react'

type StyledIconProps = ColorProps &
  SpaceProps &
  SizeProps &
  PlaceProps & { title?: string }

export type Icon = FunctionComponent<StyledIconProps>

const BaseSvg = styled('svg', clean('color', 'fill'))(
  space,
  size,
  color,
  place,
  css`
    fill: currentColor;
  `,
)

const BaseImg = styled.img<StyledIconProps>(
  space,
  size,
  css`
    object-fit: contain;
  `,
)

export {
  CoopCaptainSvg,
  CoopSpecialSvg,
  CottonCandySvg,
  DuplicateSvg,
  InkSvg,
  LevelSvg,
  LuckSvg,
  PirateFestSvg,
  ShipyardBottleSvg,
  SpecialLvl,
  SpecialSvg,
  SupportSvg,
}

export const AddIcon: Icon = BaseSvg.withComponent(Add)
export const ArrowIcon: Icon = BaseSvg.withComponent(Arrow)
export const AscendingIcon: Icon = BaseSvg.withComponent(Ascending)
export const BellyIcon: Icon = BaseSvg.withComponent(Belly)
export const CancelIcon: Icon = BaseSvg.withComponent(Cancel)
export const CameraFppIcon: Icon = BaseSvg.withComponent(CameraFpp)
export const CameraTavernIcon: Icon = BaseSvg.withComponent(CameraTavern)
export const CameraTreasureIcon: Icon = BaseSvg.withComponent(CameraTreasure)
export const ClearIcon: Icon = BaseSvg.withComponent(Clear)
export const CloseIcon: Icon = BaseSvg.withComponent(Close)
export const ConfirmIcon: Icon = BaseSvg.withComponent(Confirm)
export const CoopIcon: Icon = p => (
  <BaseSvg as={Coop} color="primaryText" {...p} />
)
export const CoopCaptainIcon: Icon = p => (
  <BaseSvg as={CoopCaptain} color="primaryText" {...p} />
)
export const CoopSpecialIcon: Icon = p => (
  <BaseSvg as={CoopSpecial} color="primaryText" {...p} />
)
export const CottonCandyIcon: Icon = BaseSvg.withComponent(CottonCandy)
export const DeleteIcon: Icon = BaseSvg.withComponent(Delete)
export const DescendingIcon: Icon = BaseSvg.withComponent(Descending)
export const DuplicateHideIcon: Icon = BaseSvg.withComponent(DuplicateHide)
export const DuplicateShowIcon: Icon = BaseSvg.withComponent(DuplicateShow)
export const EditIcon: Icon = BaseSvg.withComponent(Edit)
export const EvolveIcon: Icon = BaseSvg.withComponent(Evolve)
export const SearchBuilderIcon: Icon = BaseSvg.withComponent(SearchBuilder)
export const GatherIslandIcon: Icon = BaseSvg.withComponent(GatherIsland)
export const HideIcon: Icon = BaseSvg.withComponent(Hide)
export const ImageAnalyzerIcon: Icon = BaseSvg.withComponent(ImageAnalyzer)
export const InkIcon: Icon = p => (
  <BaseSvg as={Ink} color="primaryText" {...p} />
)
export const LevelIcon: Icon = p => (
  <BaseSvg as={Level} color="primaryText" {...p} />
)
export const LimitBreakIcon: Icon = BaseSvg.withComponent(LimitBreak)
export const LoaderIcon: Icon = BaseSvg.withComponent(TailSpin)
export const LogoIcon: Icon = ({ color, ...p }: StyledIconProps) => (
  <BaseImg src={Logo} {...p} />
)
export const LockIcon: Icon = ({ color, ...p }: StyledIconProps) => (
  <BaseImg src={Lock} {...p} />
)
export const LuckIcon: Icon = p => (
  <BaseSvg as={Luck} color="primaryText" {...p} />
)
export const NewsCooIcon: Icon = BaseSvg.withComponent(NewsCoo)
export const OpenInDBIcon: Icon = BaseSvg.withComponent(OpenInDB)
export const PirateFestIcon: Icon = p => (
  <BaseSvg as={PirateFest} color="primaryText" {...p} />
)
export const PirateFestAbilityIcon: Icon = p => (
  <BaseSvg as={PirateFestAbility} color="primaryText" {...p} />
)
export const PirateFestBothIcon: Icon = p => (
  <BaseSvg as={PirateFestBoth} color="primaryText" {...p} />
)
export const PirateFestSpecialIcon: Icon = p => (
  <BaseSvg as={PirateFestSpecial} color="primaryText" {...p} />
)
export const PotentialIcon: Icon = BaseSvg.withComponent(Potential)
export const ResetIcon: Icon = BaseSvg.withComponent(Reset)
export const ResetApplyIcon: Icon = BaseSvg.withComponent(ResetApply)
export const ResetRemoveIcon: Icon = BaseSvg.withComponent(ResetRemove)
export const SaveSearchIcon: Icon = BaseSvg.withComponent(SaveSearch)
export const SettingsIcon: Icon = BaseSvg.withComponent(Settings)
export const SearchIcon: Icon = BaseSvg.withComponent(Search)
export const ShareIcon: Icon = BaseSvg.withComponent(Share)
export const ShipyardIcon: Icon = BaseSvg.withComponent(Shipyard)
export const ShipyardFullIcon: Icon = BaseSvg.withComponent(ShipyardFull)
export const ShipyardBottleIcon: Icon = BaseSvg.withComponent(ShipyardBottle)
export const ShowIcon: Icon = BaseSvg.withComponent(Show)
export const SkillBookIcon: Icon = BaseSvg.withComponent(SkillBook)
export const SpecialLvlIcon: Icon = p => (
  <BaseSvg as={Special} color="primaryText" {...p} />
)
export const SugoPullIcon: Icon = BaseSvg.withComponent(SugoPull)
export const SugoPullExcludeIcon: Icon = BaseSvg.withComponent(SugoPullExclude)
export const SugoPullIncludeIcon: Icon = BaseSvg.withComponent(SugoPullInclude)
export const SupportIcon: Icon = p => (
  <BaseSvg as={Support} color="specific.support" {...p} />
)
export const LevelTextIcon = () => (
  <Text color="white" as="span">
    Lv.{' '}
  </Text>
)
export const TreasureIcon: Icon = BaseSvg.withComponent(Treasure)
export const VideoTreasureIcon: Icon = BaseSvg.withComponent(VideoTreasure)

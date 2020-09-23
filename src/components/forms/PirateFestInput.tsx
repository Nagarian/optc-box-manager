import css from '@styled-system/css'
import { PirateFestSvg } from 'components/Icon'
import styled from 'styled-components'
import RangeInput from './RangeInput'

const PirateFestInput = styled(RangeInput).attrs(() => ({
  thumbSvg: PirateFestSvg,
  range: css({
    color: 'primaryText',
  }),
}))``

export default PirateFestInput

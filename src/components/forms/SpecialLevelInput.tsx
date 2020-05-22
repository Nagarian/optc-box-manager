import css from '@styled-system/css'
import { SupportSvg } from 'components/Icon'
import styled from 'styled-components'
import RangeInput from './RangeInput'

const SpecialLevelInput = styled(RangeInput).attrs(() => ({
  min: 1,
  thumbSvg: SupportSvg,
  range: css({
    color: 'specific.support',
  }),
}))``

export default SpecialLevelInput

import css from '@styled-system/css'
import { SupportSvg } from 'components/Icon'
import styled from 'styled-components'
import RangeInput from './RangeInput'

const SupportInput = styled(RangeInput).attrs(() => ({
  min: 0,
  max: 5,
  thumbSvg: SupportSvg,
  range: css({
    color: 'specific.support',
  }),
}))``

export default SupportInput

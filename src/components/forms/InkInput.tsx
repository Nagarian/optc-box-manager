import css from '@styled-system/css'
import { InkSvg } from 'components/Icon'
import styled from 'styled-components'
import RangeInput from './RangeInput'

const InkInput = styled(RangeInput).attrs(() => ({
  min: 0,
  max: 2,
  thumbSvg: InkSvg,
  range: css({
    color: 'primaryText',
  }),
}))``

export default InkInput

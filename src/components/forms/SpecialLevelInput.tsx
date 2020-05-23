import css from '@styled-system/css'
import { SpecialLvl } from 'components/Icon'
import styled from 'styled-components'
import RangeInput from './RangeInput'

const SpecialLevelInput = styled(RangeInput).attrs(() => ({
  min: 1,
  thumbImage: SpecialLvl,
  range: css({
    color: 'specific.support',
  }),
}))``

export default SpecialLevelInput

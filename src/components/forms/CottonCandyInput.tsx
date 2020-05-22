import { CottonCandySvg } from 'components/Icon'
import styled from 'styled-components'
import { variant } from 'styled-system'
import RangeInput from './RangeInput'

type CottonCandyInputProps = {
  variant: 'atk' | 'rcv' | 'hp'
}

const CottonCandyInput = styled(RangeInput).attrs(p => ({
  min: 0,
  max: 100,
  thumbSvg: CottonCandySvg,
  range: variant({
    variants: {
      atk: {
        color: 'specific.ccAtk',
      },
      rcv: {
        color: 'specific.ccRcv',
      },
      hp: {
        color: 'specific.ccHp',
      },
    },
  })(p),
}))<CottonCandyInputProps>`
`

export default CottonCandyInput

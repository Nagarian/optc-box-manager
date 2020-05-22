import CottonCandySvg from 'components/Icon/cottoncandy.svg'
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
        backgroundColor: 'grey',
        color: 'red',
      },
      rcv: {
        backgroundColor: 'grey',
        color: 'green',
      },
      hp: {
        backgroundColor: 'grey',
        color: 'orange',
      },
    },
  })(p),
}))<CottonCandyInputProps>`
`

export default CottonCandyInput

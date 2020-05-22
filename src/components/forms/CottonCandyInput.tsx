import CottonCandySvg from 'components/Icon/cottoncandy.svg'
import styled from 'styled-components'
import { variant } from 'styled-system'
import RangeInput from './RangeInput'

type CottonCandyInputProps = {
  variant: 'atk' | 'rcv' | 'hp'
}

const CottonCandyInput = styled(RangeInput).attrs(() => ({
  min: 0,
  max: 100,
  thumbSvg: CottonCandySvg,
}))<CottonCandyInputProps>(
  variant({
    variants: {
      atk: {
        color: 'red',
      },
      rcv: {
        color: 'green',
      },
      hp: {
        color: 'orange',
      },
    },
  }),
)

export default CottonCandyInput

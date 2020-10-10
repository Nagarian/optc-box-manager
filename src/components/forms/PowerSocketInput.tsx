import { PowerSocketToImage } from 'components/PowerSocket'
import { PowerSocketKey } from 'models/units'
import styled from 'styled-components'
import RangeInput from './RangeInput'

type PowerSocketInputProps = {
  variant: PowerSocketKey
}

const PowerSocketInput = styled(RangeInput).attrs<PowerSocketInputProps>(({ variant }) => ({
  min: 1,
  max: 5,
  thumbImage: PowerSocketToImage(variant),
}))<PowerSocketInputProps>``

export default PowerSocketInput

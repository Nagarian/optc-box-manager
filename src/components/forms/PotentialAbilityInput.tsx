import { PotentialAbilityToImage } from 'components/PotentialAbility'
import { PotentialKey } from 'models/units'
import styled from 'styled-components'
import RangeInput from './RangeInput'

type PotentialAbilityInputProps = {
  variant: PotentialKey
}

const PotentialAbilityInput = styled(RangeInput).attrs<PotentialAbilityInputProps>(({ variant }) => ({
  min: 0,
  max: 5,
  thumbImage: PotentialAbilityToImage(variant as PotentialKey),
}))<PotentialAbilityInputProps>``

export default PotentialAbilityInput

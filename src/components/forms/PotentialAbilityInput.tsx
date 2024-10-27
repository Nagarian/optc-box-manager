import { PotentialAbilityToImage } from 'components/PotentialAbility'
import { PotentialKey } from 'models/units'
import { InputHTMLAttributes } from 'react'
import { SpaceProps } from 'styled-system'
import { RangeInput } from './RangeInput'

type PotentialAbilityInputProps = SpaceProps & {
  variant: PotentialKey
}

export function PotentialAbilityInput({
  variant,
  ...p
}: InputHTMLAttributes<HTMLInputElement> & PotentialAbilityInputProps) {
  return (
    <RangeInput
      {...p}
      min={1}
      max={5}
      thumbImage={PotentialAbilityToImage(variant)}
    />
  )
}

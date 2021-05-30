import { PowerSocketToImage } from 'components/PowerSocket'
import { PowerSocketKey } from 'models/units'
import { InputHTMLAttributes } from 'react'
import { SpaceProps } from 'styled-system'
import RangeInput from './RangeInput'

type PowerSocketInputProps = SpaceProps & {
  variant: PowerSocketKey
}

export default function PowerSocketInput ({
  variant,
  ...p
}: InputHTMLAttributes<HTMLInputElement> & PowerSocketInputProps) {
  return (
    <RangeInput
      {...p}
      min={1}
      max={5}
      thumbImage={PowerSocketToImage(variant)}
    />
  )
}

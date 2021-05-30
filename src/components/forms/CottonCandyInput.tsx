import { useTheme } from '@emotion/react'
import { CottonCandySvg } from 'components/Icon'
import { InputHTMLAttributes } from 'react'
import { SpaceProps } from 'styled-system'
import RangeInput from './RangeInput'

type CottonCandyInputProps = {
  variant: 'atk' | 'rcv' | 'hp'
  min?: number
}
export default function CottonCandyInput ({
  min,
  variant,
  ...p
}: InputHTMLAttributes<HTMLInputElement> & SpaceProps & CottonCandyInputProps) {
  const color = useVariant(variant)
  return (
    <RangeInput
      {...p}
      min={min ?? 0}
      thumbSvg={CottonCandySvg}
      range={{
        color,
      }}
    />
  )
}
CottonCandyInput.defaultProps = {
  max: 100,
}

function useVariant (variant: 'atk' | 'rcv' | 'hp') {
  const theme = useTheme()

  switch (variant) {
    case 'atk':
      return theme.colors.specific.ccAtk
    case 'rcv':
      return theme.colors.specific.ccRcv
    case 'hp':
      return theme.colors.specific.ccHp
  }
}

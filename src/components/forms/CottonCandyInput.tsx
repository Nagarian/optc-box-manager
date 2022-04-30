import { useTheme } from '@emotion/react'
import { CottonCandySvg } from 'components/Icon'
import RangeInput from './RangeInput'
import { RangeInputPlus, RangeInputPlusProps } from './RangeInputPlus'

type CottonCandyInputProps = {
  variant: 'atk' | 'rcv' | 'hp'
  hideAdders?: boolean
}
export default function CottonCandyInput ({
  onChange,
  variant,
  hideAdders,
  ...p
}: Omit<RangeInputPlusProps, 'adders' | 'min'> & CottonCandyInputProps) {
  const color = useVariant(variant)

  if (hideAdders) {
    return (
      <RangeInput
        {...p}
        onChange={e => onChange(Number(e.target.value))}
        min={0}
        thumbSvg={CottonCandySvg}
        range={{
          color,
        }}
      />
    )
  }

  return (
    <RangeInputPlus
      {...p}
      onChange={onChange}
      min={0}
      adders={[-1, 100, 30, 5, 1]}
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

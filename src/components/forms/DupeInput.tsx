import { useTheme } from '@emotion/react'
import { DuplicateSvg } from 'components/Icon'
import { RangeInputPlus, RangeInputPlusProps } from './RangeInputPlus'

export function DupeInput({
  color,
  value,
  ...p
}: Omit<RangeInputPlusProps, 'adders' | 'min' | 'max' | 'thumbSvg' | 'range'>) {
  const theme = useTheme()
  const max = value >= 50 ? 100 : value >= 20 ? 50 : value >= 15 ? 20 : 15
  return (
    <RangeInputPlus
      {...p}
      value={value}
      min={0}
      max={max}
      adders={[-1, 1, 2]}
      thumbSvg={DuplicateSvg}
      range={{
        color: color ?? theme.colors.primaryText,
      }}
    />
  )
}

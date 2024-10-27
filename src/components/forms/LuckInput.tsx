import { useTheme } from '@emotion/react'
import { LuckSvg } from 'components/Icon'
import { RangeInputPlus, RangeInputPlusProps } from './RangeInputPlus'

export function LuckInput({
  color,
  ...p
}: Omit<RangeInputPlusProps, 'adders' | 'min' | 'thumbSvg' | 'range'>) {
  const theme = useTheme()
  return (
    <RangeInputPlus
      {...p}
      min={0}
      max={100}
      adders={[-1, 1, 2, 5, 10, 100]}
      thumbSvg={LuckSvg}
      range={{
        color: color ?? theme.colors.primaryText,
      }}
    />
  )
}

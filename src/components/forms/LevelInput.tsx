import { useTheme } from '@emotion/react'
import { LevelSvg } from 'components/Icon'
import { RangeInputPlus, RangeInputPlusProps } from './RangeInputPlus'

export default function LevelInput ({
  color,
  ...p
}: Omit<RangeInputPlusProps, 'adders' | 'min' | 'thumbSvg' | 'range'>) {
  const theme = useTheme()
  return (
    <RangeInputPlus
      {...p}
      min={1}
      adders={[-1, 1, 5, 10, 50, 98]}
      thumbSvg={LevelSvg}
      range={{
        color: color ?? theme.colors.primaryText,
      }}
    />
  )
}

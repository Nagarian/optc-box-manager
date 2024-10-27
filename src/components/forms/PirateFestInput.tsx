import { useTheme } from '@emotion/react'
import { PirateFestSvg } from 'components/Icon'
import { InputHTMLAttributes } from 'react'
import { SpaceProps } from 'styled-system'
import { RangeInput } from './RangeInput'

export function PirateFestInput(
  p: InputHTMLAttributes<HTMLInputElement> & SpaceProps,
) {
  const theme = useTheme()
  return (
    <RangeInput
      {...p}
      thumbSvg={PirateFestSvg}
      range={{
        color: theme.colors.primaryText,
      }}
    />
  )
}

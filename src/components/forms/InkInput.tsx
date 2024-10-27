import { useTheme } from '@emotion/react'
import { InkSvg } from 'components/Icon'
import { InputHTMLAttributes } from 'react'
import { SpaceProps } from 'styled-system'
import { RangeInput } from './RangeInput'

export function InkInput(
  p: InputHTMLAttributes<HTMLInputElement> & SpaceProps,
) {
  const theme = useTheme()
  return (
    <RangeInput
      {...p}
      min={0}
      max={2}
      thumbSvg={InkSvg}
      range={{
        color: theme.colors.primaryText,
      }}
    />
  )
}

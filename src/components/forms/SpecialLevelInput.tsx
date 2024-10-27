import { useTheme } from '@emotion/react'
import { SpecialSvg } from 'components/Icon'
import { InputHTMLAttributes } from 'react'
import { SpaceProps } from 'styled-system'
import { RangeInput } from './RangeInput'

export function SpecialLevelInput(
  p: InputHTMLAttributes<HTMLInputElement> & SpaceProps,
) {
  const theme = useTheme()
  return (
    <RangeInput
      {...p}
      min={1}
      thumbSvg={SpecialSvg}
      range={{
        color: theme.colors.secondaryText,
      }}
    />
  )
}

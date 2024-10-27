import { useTheme } from '@emotion/react'
import { SupportSvg } from 'components/Icon'
import { InputHTMLAttributes } from 'react'
import { SpaceProps } from 'styled-system'
import { RangeInput } from './RangeInput'

export function SupportInput(
  p: InputHTMLAttributes<HTMLInputElement> & SpaceProps,
) {
  const theme = useTheme()
  return (
    <RangeInput
      {...p}
      min={0}
      max={5}
      thumbSvg={SupportSvg}
      range={{
        color: theme.colors.specific.support,
      }}
    />
  )
}

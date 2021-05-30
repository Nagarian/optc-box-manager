import { useTheme } from '@emotion/react'
import { SpecialLvl } from 'components/Icon'
import { InputHTMLAttributes } from 'react'
import { SpaceProps } from 'styled-system'
import RangeInput from './RangeInput'

export default function SpecialLevelInput (
  p: InputHTMLAttributes<HTMLInputElement> & SpaceProps,
) {
  const theme = useTheme()
  return (
    <RangeInput
      {...p}
      min={1}
      thumbImage={SpecialLvl}
      range={{
        color: theme.colors.specific.support,
      }}
    />
  )
}

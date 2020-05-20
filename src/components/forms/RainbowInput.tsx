import React, { useState, ChangeEventHandler } from 'react'

type CheckboxType = {
  onChange: ChangeEventHandler<HTMLInputElement>
  checked: boolean
}

type RainbowInputProps = {

}

export default function RainbowInput ({ onChange, checked }: RainbowInputProps & CheckboxType) {
  return (
    <label>
      <input type="checkbox" onChange={onChange} checked={checked} />
      <span>Is Rainbowed</span>
    </label>
  )
}

export function useRainbowInput () {
  const [value, setValue] = useState<boolean>(false)

  return {
    isRainbowed: value,
    IsRainbowedInput: (props: RainbowInputProps) => (
      <RainbowInput
        checked={value}
        onChange={e => setValue(e.target.checked)}
        {...props}
      />
    ),
  }
}

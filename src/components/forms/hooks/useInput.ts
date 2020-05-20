import { useState, ChangeEvent } from 'react'

export const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue)

  return {
    value,
    reset: () => setValue(initialValue),
    bind: {
      value,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value as any)
      },
    },
  }
}

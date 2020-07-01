import { useState, useEffect } from 'react'

export function useStorage<T> (key: string = 'search', defaultValue: T) {
  const state = useState<T>(defaultValue)
  const [value, setValue] = state

  useEffect(() => {
    const json = localStorage.getItem(key)
    if (json) {
      setValue(JSON.parse(json))
    }
  }, [key, setValue])

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return state
}

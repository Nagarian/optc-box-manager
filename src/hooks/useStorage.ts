import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function useStorage<T>(
  key: string = 'search',
  defaultValue: T,
  migration?: (value: T) => T,
  reviver?: (this: unknown, key: string, value: unknown) => unknown,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const json = localStorage.getItem(key)
    if (!json) {
      return defaultValue
    }

    const parsed = JSON.parse(json, reviver) as T

    if (!parsed) {
      return defaultValue
    }

    if (migration) {
      const migrated = migration(parsed)
      localStorage.setItem(key, JSON.stringify(migrated))
      return migrated
    }

    return parsed
  })

  useEffect(() => {
    if (value && value !== defaultValue) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [defaultValue, key, value])

  return [value, setValue]
}

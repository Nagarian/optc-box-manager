import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function useStorage<T>(
  key: string = 'search',
  defaultValue: T,
  migration?: (value: T) => T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    const json = localStorage.getItem(key)
    if (!json) {
      return
    }

    const parsed = JSON.parse(json) as T

    if (!parsed) {
      return
    }

    if (migration) {
      const migrated = migration(parsed)
      localStorage.setItem(key, JSON.stringify(migrated))
      setValue(migrated)
    } else {
      setValue(parsed)
    }
  }, [key, migration, setValue])

  useEffect(() => {
    if (value && value !== defaultValue) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [defaultValue, key, value])

  return [value, setValue]
}

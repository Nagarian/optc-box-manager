import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'

export function useStorage<T> (
  key: string = 'search',
  defaultValue: T,
  migration?: (value: any) => T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    const json = localStorage.getItem(key)
    if (!json) {
      return
    }

    const parsed = JSON.parse(json)

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
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}

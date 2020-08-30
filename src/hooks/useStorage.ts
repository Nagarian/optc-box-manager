import {
  useState,
  useEffect,
  useReducer,
  Dispatch,
  DispatchWithoutAction,
  SetStateAction,
} from 'react'

export function useStorage<T> (
  key: string = 'search',
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>, DispatchWithoutAction] {
  const [trigger, forceUpdate] = useReducer(x => x + 1, 0)
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    const json = localStorage.getItem(key)
    if (json) {
      setValue(JSON.parse(json))
    }
  }, [key, setValue, trigger])

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue, forceUpdate]
}

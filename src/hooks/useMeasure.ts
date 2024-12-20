import { RefObject, useEffect, useRef, useState } from 'react'

type BoxMeasure = {
  readonly left: number
  readonly top: number
  readonly width: number
  readonly height: number
}

export function useMeasure<T extends HTMLElement>(): [
  RefObject<T | null>,
  BoxMeasure,
] {
  const ref = useRef<T>(null)
  const [bounds, set] = useState<BoxMeasure>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  const [ro] = useState(
    () =>
      new ResizeObserver(([entry]: ResizeObserverEntry[]) =>
        set(entry.contentRect),
      ),
  )

  useEffect(() => {
    if (ref.current) {
      ro.observe(ref.current)
    }
    return () => ro.disconnect()
  }, [ro])

  return [ref, bounds]
}

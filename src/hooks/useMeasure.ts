import { useRef, useState, useEffect, RefObject } from 'react'

type BoxMeasure = {
  readonly left: number
  readonly top: number
  readonly width: number
  readonly height: number
}

export default function useMeasure (): [RefObject<HTMLElement>, BoxMeasure] {
  const ref = useRef<HTMLElement>(null)
  const [bounds, set] = useState<BoxMeasure>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  const [ro] = useState(
    () => new ResizeObserver(([entry]: ResizeObserverEntry[]) => set(entry.contentRect)),
  )

  useEffect(() => {
    ro.observe(ref.current!)
    return () => ro.disconnect()
  }, [ro])

  return [ref, bounds]
}

import { ExtendedUnit } from 'models/units'
import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

type OptcDb = {
  db: ExtendedUnit[]
  isLoaded: boolean
}

const defaultOptcDb = {
  db: [],
  isLoaded: false,
}

const OptcDbContext = createContext<OptcDb>(defaultOptcDb)

export const OptcDbProvider: FunctionComponent<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [optcDbValue, setOptcDbValue] = useState<OptcDb>(defaultOptcDb)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const response = await fetch('db-old.json')
      const db: ExtendedUnit[] = await response.json()
      if (!cancelled) {
        setOptcDbValue({
          db: db.filter(u => u.class !== 'Booster' && u.class !== 'Evolver'),
          isLoaded: true,
        })
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <OptcDbContext.Provider value={optcDbValue}>
      {children}
    </OptcDbContext.Provider>
  )
}

export function useOptcDb () {
  return useContext(OptcDbContext)
}

import { ExtendedUnit } from 'models/units'
import { createContext, FC, useContext, useEffect, useState } from 'react'

type OptcDb = {
  db: ExtendedUnit[]
  isLoaded: boolean
}

const defaultOptcDb = {
  db: [],
  isLoaded: false,
}

const OptcDbContext = createContext<OptcDb>(defaultOptcDb)

export const OptcDbProvider : FC = ({ children }) => {
  const [optcDbValue, setOptcDbValue] = useState<OptcDb>(defaultOptcDb)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const response = await fetch('db.json')
      const db: ExtendedUnit[] = await response.json()
      if (!cancelled) {
        setOptcDbValue({
          db,
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

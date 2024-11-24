import { Ship } from 'models/ships'
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
  shipDb: Ship[]
  isLoaded: boolean
}

const defaultOptcDb: OptcDb = {
  db: [],
  shipDb: [],
  isLoaded: false,
}

const OptcDbContext = createContext<OptcDb>(defaultOptcDb)

export const OptcDbProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [optcDbValue, setOptcDbValue] = useState<OptcDb>(defaultOptcDb)

  useEffect(() => {
    let cancelled = false

    const loadCharacters = async () => {
      const response = await fetch('db-old.json')
      const db = (await response.json()) as ExtendedUnit[]
      if (!cancelled) {
        setOptcDbValue(state => ({
          ...state,
          db: db.filter(u => u.class !== 'Booster' && u.class !== 'Evolver'),
          isLoaded: state.shipDb.length > 0,
        }))
      }
    }

    loadCharacters().catch((e: unknown) => console.error(e))

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const loadShips = async () => {
      const response = await fetch('db-ships.json')
      const shipDb = (await response.json()) as Ship[]
      if (!cancelled) {
        setOptcDbValue(state => ({
          ...state,
          shipDb,
          isLoaded: state.db.length > 0,
        }))
      }
    }

    loadShips().catch((e: unknown) => console.error(e))

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

export function useOptcDb() {
  return useContext(OptcDbContext)
}

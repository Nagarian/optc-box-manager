import { ExtendedUnit } from 'models/units'
import { MyUserBox, UserBox, UserUnit, UserUnitBulkEdit } from 'models/userBox'
import { useEffect, useState } from 'react'
import { exportAsJson } from 'services/share'
import { applyEdit, resync, UserUnitFactory } from 'services/userUnits'
import { useOptcDb } from './useOptcDb'

const userBoxKey = 'userBox'

const reviver = (units: ExtendedUnit[] = []) =>
  units.length === 0
    ? undefined
    : (key: string, value: unknown) => {
        if (key !== 'unit') return value

        if (typeof value === 'number') {
          return (
            units.find(x => x.id === value) ?? units.find(x => x.dbId === value)
          )
        }

        return value
      }

const replacer = (key: string, value: unknown) => {
  if (key !== 'unit') return value
  if (typeof value === 'number') return value
  return (value as ExtendedUnit).id
}

export function useUserBox(): MyUserBox {
  const { db, isLoaded: dbLoaded } = useOptcDb()
  const [userBox, setUserBox] = useState<UserBox>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!dbLoaded) {
      return
    }

    const json = localStorage.getItem(userBoxKey)
    if (json) {
      let userBox = JSON.parse(json, reviver(db)) as UserBox
      if (db.length) {
        userBox = userBox.map(resync)
      }

      setUserBox(userBox)
    }

    setIsLoading(false)
  }, [db, dbLoaded])

  useEffect(() => {
    if (userBox && userBox.length) {
      localStorage.setItem(userBoxKey, JSON.stringify(userBox, replacer))
    }
  }, [userBox])

  return {
    userBox,
    isLoading,
    loadingStatus: !dbLoaded ? 'Database Loading' : 'Box Syncing',
    add: (...units: ExtendedUnit[]) => {
      const userUnits = units.map(UserUnitFactory)
      setUserBox(userBox.concat(userUnits))
    },
    update: (userUnit: UserUnit) => {
      const index = userBox.findIndex(uu => uu.id === userUnit.id)
      if (index === -1) return

      const updated = [...userBox]
      updated.splice(index, 1, userUnit)
      setUserBox(updated)
    },
    bulkUpdate: (userUnits: UserUnit[], edit: UserUnitBulkEdit) => {
      const updated = userBox.map(uu =>
        userUnits.some(uuu => uuu.id === uu.id) ? applyEdit(uu, edit, db) : uu,
      )

      setUserBox(updated)
    },
    remove: (id: string) => {
      setUserBox(userBox.filter(u => u.id !== id))
    },
    reset: () => {
      setUserBox([])
      localStorage.setItem(userBoxKey, '[]')
    },
    importDB: (json: string) => {
      let importedDb = JSON.parse(json, reviver(db)) as UserBox
      if (!Array.isArray(importedDb)) {
        // TODO: make more check
        throw new Error('invalid JSON file')
      }

      if (importedDb.length) {
        importedDb = importedDb.map(resync)
      }

      setUserBox(importedDb)
    },
    exportDB: async () => {
      const payload = JSON.stringify(userBox, replacer)
      await exportAsJson(payload, 'optc-bm')
    },
  }
}

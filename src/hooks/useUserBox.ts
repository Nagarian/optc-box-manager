import { ExtendedUnit } from 'models/units'
import { MyUserBox, UserBox, UserUnit, UserUnitBulkEdit } from 'models/userBox'
import { useEffect, useState } from 'react'
import { UserUnitFactory, applyEdit } from 'services/userUnits'
import { exportAsJson } from 'services/share'

const userBoxKey = 'userBox'

const reviver = (units: ExtendedUnit[] = []) =>
  units.length === 0
    ? undefined
    : (key: string, value: any) => {
      if (key !== 'unit') return value

      if (typeof value === 'number') {
        return units.find(x => x.id === value)
      }

      return value
    }

const replacer = (key: string, value: any) => {
  if (key !== 'unit') return value
  if (typeof value === 'number') return value
  return (value as ExtendedUnit).id
}

export default function useUserBox (units: ExtendedUnit[]): MyUserBox {
  const [userBox, setUserBox] = useState<UserBox>([])

  useEffect(() => {
    const json = localStorage.getItem(userBoxKey)
    if (json) {
      setUserBox(JSON.parse(json, reviver(units)))
    }
  }, [units])

  useEffect(() => {
    if (userBox) {
      localStorage.setItem(userBoxKey, JSON.stringify(userBox, replacer))
    }
  }, [userBox])

  return {
    userBox,
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
        userUnits.some(uuu => uuu.id === uu.id) ? applyEdit(uu, edit) : uu,
      )

      setUserBox(updated)
    },
    remove: (id: string) => {
      setUserBox(userBox.filter(u => u.id !== id))
    },
    reset: () => {
      setUserBox([])
    },
    importDB: (json: string) => {
      const db = JSON.parse(json, reviver(units))
      if (!Array.isArray(db)) {
        // TODO: make more check
        throw new Error('invalid JSON file')
      }

      setUserBox(db as UserBox)
    },
    exportDB: async () => {
      const payload = JSON.stringify(userBox, replacer)
      await exportAsJson(payload, 'optc-my-box')
    },
  }
}

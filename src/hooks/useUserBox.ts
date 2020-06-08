import { ExtendedUnit } from 'models/units'
import { MyUserBox, UserBox, UserUnit, UserUnitBulkEdit } from 'models/userBox'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

const userBoxKey = 'userBox'

function UserUnitFactory (unit: ExtendedUnit): UserUnit {
  return {
    id: uuid(),
    unit,
    potentials:
      unit.detail?.potential?.map(potential => ({
        type: potential.Name,
        lvl: 0,
      })) ?? [],
    special: unit.cooldown && {
      lvl: 1,
      lvlMax: unit.cooldown ? unit.cooldown[0] - unit.cooldown[1] + 1 : 1,
    },
    support:
      unit.detail?.support?.length > 0
        ? {
          lvl: 0,
        }
        : undefined,
    cc: {
      hp: 0,
      atk: 0,
      rcv: 0,
    },
  }
}

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

function applyEdit (userUnit: UserUnit, edit: UserUnitBulkEdit) {
  const updated = {
    ...userUnit,
  }

  if (edit.limitBreakState && updated.potentials.length > 0) {
    updated.potentials = updated.potentials.map(p => ({
      ...p,
      lvl: edit.limitBreakState === 'rainbow' ? 5 : 1,
    }))
  }

  if (edit.supportLvl && updated.support) {
    updated.support.lvl = edit.supportLvl
  }

  if (edit.cottonCandies) {
    if (edit.cottonCandies.atk) {
      updated.cc.atk = edit.cottonCandies.atk
    }
    if (edit.cottonCandies.hp) {
      updated.cc.hp = edit.cottonCandies.hp
    }
    if (edit.cottonCandies.rcv) {
      updated.cc.rcv = edit.cottonCandies.rcv
    }
  }

  return updated
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
  }
}

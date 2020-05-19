import { useState, useEffect } from 'react'
import { UserBox, UserUnit } from 'models/userBox'
import { ExtendedUnit } from 'models/units'
import { v4 as uuid } from 'uuid'

const userBoxKey = 'userBox'

export default function useUserBox () {
  const [userBox, setUserBox] = useState<UserBox>([])

  useEffect(() => {
    const json = localStorage.getItem(userBoxKey)
    if (json) {
      setUserBox(JSON.parse(userBoxKey))
    }
  }, [])

  useEffect(() => {
    if (userBox) {
      localStorage.setItem('userBox', JSON.stringify(userBox))
    } else {
      localStorage.removeItem(userBoxKey)
    }
  }, [userBox])

  return {
    userBox,
    add: (unit: ExtendedUnit) => {
      const userUnit : UserUnit = {
        id: uuid(),
        unitId: unit.id,
        potentials: unit.detail?.potential?.map(potential => ({
          type: potential.Name,
          lvl: 0,
        })) ?? [],
        special: unit.cooldown && {
          lvl: 1,
          lvlMax: unit.cooldown ? unit.cooldown[0] - unit.cooldown[1] + 1 : 1,
        },
        support: unit.detail?.support?.length > 0 ? {
          lvl: 0,
        } : undefined,
      }

      setUserBox([...userBox, userUnit])
    },
    update: (userUnit: UserUnit) => {
      const index = userBox.findIndex(uu => uu.id === userUnit.id)
      if (index === -1) return

      setUserBox([...userBox].splice(index, 1, userUnit))
    },
    delete: (id: string) => {
      setUserBox(userBox.filter(u => u.id === id))
    },
  }
}

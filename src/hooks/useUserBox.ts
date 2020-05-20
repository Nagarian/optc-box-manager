import { ExtendedUnit } from 'models/units'
import { UserBox, UserUnit } from 'models/userBox'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

const userBoxKey = 'userBox'

function UserUnitFactory (unit: ExtendedUnit) : UserUnit {
  return {
    id: uuid(),
    unitId: unit.id,
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

export default function useUserBox () {
  const [userBox, setUserBox] = useState<UserBox>([])

  useEffect(() => {
    const json = localStorage.getItem(userBoxKey)
    if (json) {
      setUserBox(JSON.parse(json))
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
    add: (...units: ExtendedUnit[]) => {
      const userUnits = units.map(UserUnitFactory)
      setUserBox(userBox.concat(userUnits))
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

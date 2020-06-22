import { ExtendedUnit, PotentialKey } from './units'

export type UserUnitSpecial = {
  lvl: number
  lvlMax: number
}

export type UserUnitPotentialAbility = {
  type: PotentialKey
  lvl: number
  keyState?: UserUnitPotentialAbilityKeyState
}

export type UserUnitPotentialAbilityKeyState = undefined | 'locked' | 'unlocked'

export type UserUnitSupport = {
  lvl: number
}

export type UserUnitCottonCandy = {
  hp: number
  rcv: number
  atk: number
}

export type UserUnit = {
  id: string
  unit: ExtendedUnit
  special?: UserUnitSpecial
  potentials: UserUnitPotentialAbility[]
  support?: UserUnitSupport
  cc: UserUnitCottonCandy
}

export type UserBox = UserUnit[]

export type MyUserBox = {
  userBox: UserBox
  add: (...units: ExtendedUnit[]) => void
  update: (userUnit: UserUnit) => void
  bulkUpdate: (userUnits : UserUnit[], edit: UserUnitBulkEdit) => void
  remove: (id: string) => void
  reset: () => void
  importDB: (json: string) => void
  exportDB: () => Promise<void>
}

export type UserUnitBulkEdit = {
  limitBreakState?: UserUnitBulkEditLimitBreakState
  supportLvl?: number
  cottonCandies?: {
    atk?: number
    hp?: number
    rcv?: number
  }
}

export const UserUnitBulkEditLimitBreakStateKeys = ['max', 'rainbow', 'max+', 'rainbow+'] as const
export type UserUnitBulkEditLimitBreakState = typeof UserUnitBulkEditLimitBreakStateKeys[number]

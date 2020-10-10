import { ExtendedUnit, PotentialKey, PowerSocketKey } from './units'

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

export const CottonCandyTypeKeys = ['atk', 'hp', 'rcv'] as const
export type CottonCandyType = typeof CottonCandyTypeKeys[number]

export type UserUnitCottonCandy = {
  hp: number
  rcv: number
  atk: number
}

export type UserUnitLimitBreak = {
  lvl: number
  lvlMax: number
  keyLvlMax?: number
}

export type UserUnitPirateFest = {
  abilityLvl: number
  specialLvl: number
}

export type UserUnitPowerSocket = {
  type?: PowerSocketKey
  lvl: number
}

export type UserUnit = {
  id: string
  unit: ExtendedUnit
  special?: UserUnitSpecial
  limitBreak?: UserUnitLimitBreak
  potentials: UserUnitPotentialAbility[]
  support?: UserUnitSupport
  cc: UserUnitCottonCandy
  pirateFest?: UserUnitPirateFest
  sockets: UserUnitPowerSocket[]
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

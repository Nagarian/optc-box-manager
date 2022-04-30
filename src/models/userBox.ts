import { ExtendedUnit, PotentialKey, PowerSocketKey } from './units'

export type UserUnitSpecial = {
  lvl: number
  lvlMax: number
}

export type UserUnitPotentialAbilityKeyState = undefined | 'locked' | 'unlocked'

export type UserUnitPotentialAbility = {
  type: PotentialKey
  lvl: number
  keyState?: UserUnitPotentialAbilityKeyState
}

export type UserUnitSupport = {
  lvl: number
}

export type UserUnitInk = {
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

export type UserUnitLevel = {
  lvl: number
  lvlMax: number
  limitLvl?: number
  limitStepLvl?: number
}

export type UserUnit = {
  id: string
  unit: ExtendedUnit
  special?: UserUnitSpecial
  limitBreak?: UserUnitLimitBreak
  potentials: UserUnitPotentialAbility[]
  support?: UserUnitSupport
  ink?: UserUnitInk
  cc: UserUnitCottonCandy
  pirateFest?: UserUnitPirateFest
  sockets: UserUnitPowerSocket[]
  level: UserUnitLevel
}

export type UserBox = UserUnit[]

export const UserUnitBulkEditLimitBreakStateKeys = ['max', 'rainbow', 'max+', 'rainbow+'] as const
export type UserUnitBulkEditLimitBreakState = typeof UserUnitBulkEditLimitBreakStateKeys[number]

export const GameVersionIdConverterKeys = ['toJapan', 'toGlobal'] as const
export type GameVersionIdConverter = typeof GameVersionIdConverterKeys[number]

export type UserUnitBulkEdit = {
  limitBreakState?: UserUnitBulkEditLimitBreakState
  supportLvl?: number
  cottonCandies?: {
    atk?: number
    hp?: number
    rcv?: number
  }
  idConverter?: GameVersionIdConverter
}

export type MyUserBox = {
  userBox: UserBox
  isLoading: boolean
  loadingStatus: string
  add: (...units: ExtendedUnit[]) => void
  update: (userUnit: UserUnit) => void
  bulkUpdate: (userUnits : UserUnit[], edit: UserUnitBulkEdit) => void
  remove: (id: string) => void
  reset: () => void
  importDB: (json: string) => void
  exportDB: () => Promise<void>
}

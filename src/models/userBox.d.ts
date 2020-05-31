import { PotentialKey } from './units'

export type UserUnitSpecial = {
  lvl: number
  lvlMax: number
}

export type UserUnitPotentialAbility = {
  type: PotentialKey
  lvl: number
}

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
  remove: (id: string) => void
  reset: () => void
  importDB: (json: string) => void
}

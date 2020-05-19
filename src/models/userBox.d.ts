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

export type UserUnit = {
  id: string
  unitId: number
  special?: UserUnitSpecial
  potentials: UserUnitPotentialAbility[]
  support?: UserUnitSupport
}

export type UserBox = UserUnit[]

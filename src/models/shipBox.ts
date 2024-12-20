import { Ship } from './ships'

export type UserShipModificationStatRank = 0 | 1 | 2 | 3 | 4 | 5

export type UserShipModificationStat = {
  value: number
  rank: UserShipModificationStatRank
}

export type UserShipModification = {
  hp: UserShipModificationStat
  rcv: UserShipModificationStat
  atk: UserShipModificationStat
  skillsLvl: number
}

export type UserShip = {
  id: number
  ship: Ship
  obtained: boolean
  level: number
  modification?: UserShipModification
}

export type ShipBox = UserShip[]

export type MyShipBox = {
  shipBox: ShipBox
  isLoading: boolean
  loadingStatus: string
  update: (userShip: UserShip) => void
  reset: () => void
  importDB: (json: string) => void
  exportDB: () => Promise<void>
}

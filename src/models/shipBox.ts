import { Ship } from './ships'

export type UserShipModification = {
  hp: number
  rcv: number
  atk: number
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

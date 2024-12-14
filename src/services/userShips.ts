import { UserShip } from 'models/shipBox'
import { Ship } from 'models/ships'

export function UserShipFactory(ship: Ship): UserShip {
  return {
    id: ship.id,
    ship: ship,
    level: 1,
    obtained: false,
    modification: undefined,
  }
}

export function resyncUserShip(userShip: UserShip): UserShip {
  const updated = { ...userShip }
  const compare = UserShipFactory(userShip.ship)
  let isUpdated = false

  if (!userShip.modification && compare.modification) {
    updated.modification = compare.modification
    isUpdated = true
  }

  return isUpdated ? updated : userShip
}

import { MyShipBox, ShipBox, UserShip } from 'models/shipBox'
import { Ship } from 'models/ships'
import { useEffect, useState } from 'react'
import { exportAsJson } from 'services/share'
import { resyncUserShip, UserShipFactory } from 'services/userShips'
import { useOptcDb } from './useOptcDb'

const shipBoxKey = 'shipBox'

const reviver = (ships: Ship[] = []) =>
  ships.length === 0
    ? undefined
    : (key: string, value: unknown) =>
        key === 'ship' && typeof value === 'number'
          ? ships.find(x => x.id === value)
          : value

const replacer = (key: string, value: unknown) =>
  key === 'ship' && typeof value !== 'number' ? (value as Ship).id : value

export function useShipBox(): MyShipBox {
  const { shipDb, isLoaded: dbLoaded } = useOptcDb()
  const [shipBox, setShipBox] = useState<ShipBox>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!dbLoaded) {
      return
    }

    let userBox: ShipBox = []

    const json = localStorage.getItem(shipBoxKey)
    if (json) {
      const parsed = JSON.parse(json, reviver(shipDb)) as ShipBox
      userBox = shipDb
        .map(
          ship => parsed.find(us => us.id === ship.id) ?? UserShipFactory(ship),
        )
        .map(resyncUserShip)
    } else {
      userBox = shipDb.map(ship => UserShipFactory(ship))
    }

    setShipBox(userBox)

    setIsLoading(false)
  }, [shipDb, dbLoaded])

  useEffect(() => {
    if (shipBox && shipBox.length) {
      localStorage.setItem(shipBoxKey, JSON.stringify(shipBox, replacer))
    }
  }, [shipBox])

  return {
    shipBox,
    isLoading,
    loadingStatus: !dbLoaded ? 'Ship Database Loading' : 'Ship Box Syncing',
    update: (userShip: UserShip) => {
      setShipBox(box => box.map(us => (us.id === userShip.id ? userShip : us)))
    },
    reset: () => {
      const resetted = shipDb.map(ship => UserShipFactory(ship))
      setShipBox(resetted)
    },
    importDB: (json: string) => {
      let importedDb = JSON.parse(json, reviver(shipDb)) as ShipBox
      if (!Array.isArray(importedDb)) {
        // TODO: make more check
        throw new Error('invalid JSON file')
      }

      if (importedDb.length) {
        importedDb = shipDb
          .map(
            ship =>
              importedDb.find(us => us.id === ship.id) ?? UserShipFactory(ship),
          )
          .map(resyncUserShip)
      }

      setShipBox(importedDb)
    },
    exportDB: async () => {
      const payload = JSON.stringify(shipBox, replacer)
      await exportAsJson(payload, 'optc-bm-ships')
    },
  }
}

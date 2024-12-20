import {
  UserShip,
  UserShipModificationStat,
  UserShipModificationStatRank,
} from 'models/shipBox'
import { Ship, ShipAbility, ShipSpecial } from 'models/ships'

export function UserShipFactory(ship: Ship): UserShip {
  return {
    id: ship.id,
    ship: ship,
    level: 1,
    obtained: false,
    modification:
      ship.levels.length === 12 && ship.skills
        ? {
            atk: {
              value: 0,
              rank: 0,
            },
            hp: {
              value: 0,
              rank: 0,
            },
            rcv: {
              value: 0,
              rank: 0,
            },
            skillsLvl: 0,
          }
        : undefined,
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

export function getShipStatRank(stat: UserShipModificationStat) {
  return Math.ceil(stat.value / 30) as UserShipModificationStatRank
}

export function shipDetailToMarkdown(
  shipDetail: { ability?: ShipAbility; special?: ShipSpecial },
  asList: boolean,
) {
  return [
    shipDetail.ability?.description,
    shipDetail.special
      ? `__Special (${shipDetail.special.cooldown} turns)__ - ${shipDetail.special.description}`
      : undefined,
  ]
    .filter(u => u !== undefined)
    .map(u => (asList ? `- ${u}` : u))
    .join(asList ? '\n' : '\n\n')
}

export function userShipToMarkdown({
  ship: { levels, notes, skills },
  level,
  obtained,
  modification,
}: UserShip) {
  const notesAsMarkdown = notes ? `> ${notes}\n\n` : ''

  if (!obtained) {
    const maxLevel = levels.length >= 10 ? 10 : levels.length
    const level = levels[maxLevel - 1]

    return `__At level ${maxLevel}:__\n\n${notesAsMarkdown}${shipDetailToMarkdown(level, true)}`
  }

  const ability =
    skills?.[modification?.skillsLvl ?? -1]?.ability ??
    levels[level - 1].ability
  const special =
    skills?.[modification?.skillsLvl ?? -1]?.special ??
    levels[level - 1].special

  const detail = shipDetailToMarkdown({ ability, special }, true)

  return `${notesAsMarkdown}${detail}`
}

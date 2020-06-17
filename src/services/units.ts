import 'optcdb/common/data/aliases'
import 'optcdb/common/data/cooldowns'
import 'optcdb/common/data/details'
import 'optcdb/common/data/evolutions'
import 'optcdb/common/data/families'
import 'optcdb/common/data/festival'
import 'optcdb/common/data/flags'
import 'optcdb/common/data/units'
import 'optcdb/common/js/utils'

import {
  BaseUnit,
  ExtendedUnit,
  UnitCooldown,
  UnitDetail,
  UnitEvolution,
  UnitFamily,
  UnitFlags,
  ExtendedDrop,
} from 'models/units'
import {
  FortnightDrops,
  StoryDrops,
  AmbushDrops,
  ColiseumDrops,
  KizunaClashDrops,
  RaidDrops,
  TreasureMapDrops,
} from './drops'
import { EventDropLight } from 'models/drops'

const Utils = () => (window as any).Utils
const Units = () => (window as any).units as BaseUnit[]

const noImage =
  'https://onepiece-treasurecruise.com/wp-content/themes/onepiece-treasurecruise/images/noimage.png'

const getImage = (func: (id: number) => string) => (id: number): string => {
  try {
    const imagePath = func(id)
    return imagePath
      ?.replace('../res', 'https://optc-db.github.io/res/')
      .replace('http:', 'https:')
  } catch (error) {
    console.trace('Invalid unit :', id)
    return noImage
  }
}

const getFamilyId = (families: UnitFamily[], unitId: number) => {
  const family = families[unitId]

  if (!family) return -1

  if (Array.isArray(family)) {
    return families.findIndex(
      f => Array.isArray(f) && f.every(fam => family.includes(fam)),
    )
  }

  return families.findIndex(u => u === family) + 1
}

const getDropLocation = (
  id: number,
  flags: UnitFlags,
  evolution: UnitEvolution,
): ExtendedDrop => {
  if (Object.keys(flags).some(key => key.includes('rr'))) {
    return 'rarerecruit'
  }

  const baseForm = Utils().searchBaseForms(id)

  const condition = (event: EventDropLight) =>
    event.includes(id) || event.includes(baseForm)

  if (condition(StoryDrops)) {
    return 'story'
  }

  if (FortnightDrops.some(fn => fn.units.includes(id))) {
    return 'fortnight'
  }

  if (condition(ColiseumDrops)) {
    return 'coliseum'
  }

  if (condition(TreasureMapDrops)) {
    return 'treasuremap'
  }

  if (condition(KizunaClashDrops)) {
    return 'kizunaclash'
  }

  // we put raid and ambush last because they often includes some units from other game mode
  // IE: ambush shanks
  if (condition(RaidDrops)) {
    return 'raid'
  }

  if (condition(AmbushDrops)) {
    return 'ambush'
  }

  // ambiguous units like thus given on login, or on specific events
  return 'special'
}

export const DBUnit = {
  getUnitThumbnail: getImage(Utils().getThumbnailUrl),

  getUnitFullPicture: getImage(Utils().getBigThumbnailUrl),

  getAllUnits: (): ExtendedUnit[] => {
    if (Array.isArray(Units()?.[0])) {
      Utils().parseUnits(false)
    }

    const Details = (window as any).details as UnitDetail[]
    const Evolutions = (window as any).evolutions as UnitEvolution[]
    const Cooldowns = (window as any).cooldowns as UnitCooldown[]
    const Flags = (window as any).flags as UnitFlags[]
    const Families = (window as any).families as UnitFamily[]

    return Units()
      .filter(
        unit =>
          unit.name &&
          !unit.name.includes('Limit Break') &&
          !unit.name.includes('Dual Unit'),
      )
      .filter(unit => unit.class !== 'Booster' && unit.class !== 'Evolver')
      .map<ExtendedUnit>(unit => {
        const id = unit.number + 1
        const flags = Flags[id] ?? {}
        const evolution = Evolutions[id]
        return {
          ...unit,
          id,
          images: {
            thumbnail: DBUnit.getUnitThumbnail(id),
            full: DBUnit.getUnitFullPicture(id),
          },
          evolution,
          cooldown: Cooldowns[unit.number],
          detail: Details[id] ?? {},
          flags,
          family: {
            name: Families[unit.number],
            id: getFamilyId(Families, unit.number),
          },
          dropLocation: getDropLocation(id, flags, evolution),
        }
      })
  },
}

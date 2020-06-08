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
} from 'models/units'

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
      .map<ExtendedUnit>(unit => ({
        ...unit,
        id: unit.number + 1,
        images: {
          thumbnail: DBUnit.getUnitThumbnail(unit.number + 1),
          full: DBUnit.getUnitFullPicture(unit.number + 1),
        },
        evolution: Evolutions[unit.number + 1],
        cooldown: Cooldowns[unit.number],
        detail: Details[unit.number + 1] ?? {},
        flags: Flags[unit.number + 1] ?? {},
        family: {
          name: Families[unit.number],
          id: getFamilyId(Families, unit.number),
        },
      }))
  },
}

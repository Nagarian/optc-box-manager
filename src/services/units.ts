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
  UnitPotential,
  PotentialKey,
  UnitPirateFestStyle,
} from 'models/units'
import {
  FortnightDrops,
  StoryDrops,
  AmbushDrops,
  ColiseumDrops,
  KizunaClashDrops,
  RaidDrops,
  TreasureMapDrops,
  PirateFestivalDrops,
} from './drops'
import { EventDropLight } from 'models/drops'
import { evolutionMap, EvolutionMapHash } from './evolution'

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

const getDropLocations = (
  id: number,
  flags: UnitFlags,
  evolutions: EvolutionMapHash,
): ExtendedDrop[] => {
  if (Object.keys(flags).some(key => key.includes('rr'))) {
    return ['rarerecruit']
  }

  const evolve = evolutions[id] ?? []

  const condition = (event: EventDropLight) =>
    event.includes(id) || event.some(eventId => evolve.includes(eventId))

  const result: ExtendedDrop[] = []

  if (condition(StoryDrops)) {
    result.push('story')
  }

  if (
    FortnightDrops.some(
      fn =>
        fn.units.includes(id) ||
        evolve.some(evolveId => fn.units.includes(evolveId)),
    )
  ) {
    result.push('fortnight')
  }

  if (condition(ColiseumDrops)) {
    result.push('coliseum')
  }

  if (condition(TreasureMapDrops)) {
    result.push('treasuremap')
  }

  if (condition(KizunaClashDrops)) {
    result.push('kizunaclash')
  }

  if (condition(PirateFestivalDrops)) {
    result.push('piratefest')
  }

  // we put raid and ambush last because they often includes some units from other game mode
  // IE: ambush shanks
  if (condition(RaidDrops)) {
    result.push('raid')
  }

  if (condition(AmbushDrops)) {
    result.push('ambush')
  }

  if (!result.length) {
    // ambiguous units like thus given on login, or on specific events
    result.push('special')
  }

  return result
}

export const DBUnit = {
  getUnitThumbnail: getImage(Utils().getThumbnailUrl),

  getUnitFullPicture: getImage(Utils().getBigThumbnailUrl),

  getAllUnits: (): ExtendedUnit[] => {
    if (Array.isArray(Units()?.[0])) {
      Utils().parseUnits(false)
    }

    const Details = (window as any).details as UnitDetail[]
    const Evolutions = (window as any).evolutions as {
      [id: number]: UnitEvolution
    }
    const Cooldowns = (window as any).cooldowns as UnitCooldown[]
    const Flags = (window as any).flags as UnitFlags[]
    const Families = (window as any).families as UnitFamily[]
    const EvolutionMap = evolutionMap()
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

        return {
          ...unit,
          id,
          images: {
            thumbnail: DBUnit.getUnitThumbnail(id),
            full: DBUnit.getUnitFullPicture(id),
          },
          evolution: Evolutions[id],
          cooldown: Cooldowns[unit.number],
          detail: fixupDetail(Details[id]),
          flags,
          family: {
            name: Families[unit.number],
            id: getFamilyId(Families, unit.number),
          },
          pirateFest: {
            class: fixupPirateFestStyle(unit.pirateFest.class),
          },
          dropLocations: getDropLocations(id, flags, EvolutionMap),
          evolutionMap: EvolutionMap[id] ?? [id],
        }
      })
      .map(fixupVersusUnit)
  },
}

function fixupDetail (detail: UnitDetail): UnitDetail {
  if (!detail) return {} as UnitDetail

  if (detail.potential?.length) {
    const renamedPotentials: { [key: string]: PotentialKey } = {
      'Enrage/Increase Damage Taken reduction': 'Enrage',
      'Enrage/Reduce Increase Damage Taken duration': 'Enrage',
      'Nutrition/Reduce Hunger duration': 'Nutrition/Hunger reduction',
    }

    if (detail.potential.some(p => !!renamedPotentials[p.Name])) {
      detail.potential = detail.potential.map(
        p =>
          ({
            ...p,
            Name: renamedPotentials[p.Name] ?? p.Name,
          } as UnitPotential),
      )
    }
  }

  return detail
}

function fixupPirateFestStyle (
  pirateFestStyle: UnitPirateFestStyle | undefined,
) {
  if (!pirateFestStyle) {
    return undefined
  }

  const renamed: { [key: string]: UnitPirateFestStyle } = {
    Obstructer: 'DBF',
  }

  return renamed[pirateFestStyle] ?? pirateFestStyle
}

function fixupVersusUnit (unit: ExtendedUnit): ExtendedUnit {
  if (![3134, 3135].includes(unit.id)) {
    return unit
  }

  const untyped = unit as any
  const format = (obj: any) =>
    `**Kaido:** ${obj.character1}<br/>**Big Mom:** ${obj.character2}`

  return {
    ...unit,
    class: [[], ...untyped.class],
    pirateFest: {
      class: untyped.pirateFest.class[0],
    },
    detail: {
      ...untyped.detail,
      captain: {
        ...untyped.detail.captain,
        combined: format(untyped.detail.captain),
      },
      special: format(untyped.detail.special),
      sailor: {
        ...untyped.detail.sailor,
        combined: untyped.detail.sailor.character1,
      },
      festAbility: untyped.detail.festAbility.character1.map(
        (desc: any, i: number) => ({
          description: format({
            character1: desc.description,
            character2: untyped.detail.festAbility.character2[i].description,
          }),
        }),
      ),
      festSpecial: untyped.detail.festSpecial.character1.map(
        (desc: any, i: number) => ({
          description: format({
            character1: desc.description,
            character2: untyped.detail.festSpecial.character2[i].description,
          }),
          cooldown: `${desc.cooldown} / ${untyped.detail.festSpecial.character2[i].cooldown}` as any,
        }),
      ),
    },
  }
}

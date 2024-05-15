// @ts-check
import {
  globalOnlyReverseMap,
  globalOnly,
  globalOnlyMissingInDb,
} from './glo-jap-remapper.js'

/**
 * @typedef { ({ [key: string]: import("../models/old-units").PotentialKey })} PotentialRenamedHash
 * @typedef { ({ [key: string]: import("../models/old-units").UnitPirateFestStyle })} PirateFestRenamedHash
 */

/** @return { import("../models/old-units").UnitDetail } */
export function fixupDetail(
  /** @type { import("../models/old-units").UnitDetail } */ detail,
) {
  // @ts-ignore
  if (!detail) return {}

  if (detail.potential?.length) {
    /** @type PotentialRenamedHash */
    const renamedPotentials = {
      Enrage: 'Enrage/Reduce Increase Damage Taken duration',
      'Nutrition/Reduce Hunger duration': 'Nutrition/Reduce Hunger stacks',
    }

    if (detail.potential.some(p => !!renamedPotentials[p.Name])) {
      detail.potential = detail.potential.map(p => ({
        ...p,
        Name: renamedPotentials[p.Name] ?? p.Name,
      }))
    }
  }

  return detail
}

/** @return { import("../models/old-units").ExtendedUnit } */
export function fixupVersusUnit(
  /** @type import("../models/old-units").ExtendedUnit */ unit,
) {
  if (!unit.detail.VSCondition) {
    return unit
  }

  /** @type any */
  const untyped = unit
  const format = (/** @type any */ obj) =>
    `**Character 1:** ${obj.character1}<br/>**Character 2:** ${obj.character2}`

  return {
    ...unit,
    class: [[], ...untyped.class],
    pirateFest: {
      class: untyped.pirateFest.class,
      DEF: 0,
      SPD: 0,
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
      festAbility: untyped.detail.festAbility?.character1.map(
        (/** @type any */ desc, /** @type number */ i) => ({
          description: format({
            character1: desc.description,
            character2: untyped.detail.festAbility.character2[i].description,
          }),
        }),
      ),
      festSpecial: untyped.detail.festSpecial?.character1.map(
        (/** @type any */ desc, /** @type number */ i) => ({
          description: format({
            character1: desc.description,
            character2: untyped.detail.festSpecial.character2[i].description,
          }),
          /** @type any */
          cooldown: `${desc.cooldown} / ${untyped.detail.festSpecial.character2[i].cooldown}`,
        }),
      ),
      festGPBurst: untyped.detail.festGPBurst?.character1.map(
        (/** @type any */ desc, /** @type number */ i) => ({
          description: format({
            character1: desc.description,
            character2: untyped.detail.festGPBurst.character2[i].description,
          }),
          condition: format({
            character1: desc.condition,
            character2: untyped.detail.festGPBurst.character2[i].condition,
          }),
          /** @type any */
          use: `${desc.use} / ${untyped.detail.festGPBurst.character2[i].use}`,
        }),
      ),
      festGPLeader: untyped.detail.festGPLeader?.character1.map(
        (/** @type any */ desc, /** @type number */ i) => ({
          description: format({
            character1: desc.description,
            character2: untyped.detail.festGPLeader.character2[i].description,
          }),
        }),
      ),
    },
  }
}

/** @return { import("../models/old-units").ExtendedUnit } */
export function fixupVsLastTapSuperTandem(
  /** @type import("../models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("../models/old-units").ExtendedUnit[] */ units,
) {
  if (
    (unit.detail.potential?.length ?? 0) > 3 &&
    unit.detail.potential?.find(p => p.Name === 'Last Tap') &&
    unit.detail.potential?.find(p => p.Name === 'Super Tandem')
  ) {
    unit.detail.potential = [
      // @ts-ignore
      ...unit.detail.potential?.slice(0, 2),
      {
        Name: 'Last Tap / Super Tandem',
        description: [
          'Last Tap Ability Lv.1 / Super Tandem Ability Lv.1',
          'Last Tap Ability Lv.2 / Super Tandem Ability Lv.2',
          'Last Tap Ability Lv.3 / Super Tandem Ability Lv.3',
          'Last Tap Ability Lv.4 / Super Tandem Ability Lv.4',
          'Last Tap Ability Lv.5 / Super Tandem Ability Lv.5',
        ],
      },
    ]
  }

  return unit
}

/** @return { import("../models/old-units").ExtendedUnit } */
export function fixupImages(
  /** @type import("../models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("../models/old-units").ExtendedUnit[] */ units,
) {
  if (unit.id < 5001 || unit.id > 5008) {
    return unit
  }

  return {
    ...unit,
    images: {
      ...unit.images,
      thumbnail: `https://optc-db.github.io/api/images/thumbnail/glo/5/000/${unit.id}.png`,
    },
  }
}

/** @return { import("../models/old-units").ExtendedUnit } */
export function fixupEvolution(
  /** @type import("../models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("../models/old-units").ExtendedUnit[] */ units,
) {
  if (unit.id < 5001) {
    return unit
  }

  return {
    ...unit,
    evolutionMap: unit.evolutionMap.map(id => globalOnlyReverseMap[id] ?? id),
    evolution: unit.evolution && {
      ...unit.evolution,
      evolution: Array.isArray(unit.evolution.evolution)
        ? unit.evolution.evolution.map(id => globalOnlyReverseMap[id])
        : globalOnlyReverseMap[unit.evolution.evolution] ??
          unit.evolution.evolution,
    },
  }
}

/** @return { import("../models/old-units").ExtendedUnit } */
export function fixupFlags(
  /** @type import("../models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("../models/old-units").ExtendedUnit[] */ units,
) {
  return {
    ...unit,
    flags: {
      ...unit.flags,
      gloOnly: globalOnly[unit.id] ? 1 : undefined,
      japOnly: globalOnlyMissingInDb[unit.id] ? 1 : undefined,
    },
  }
}

/** @return { import("../models/old-units").ExtendedUnit } */
export function fixupFestProperties(
  /** @type import("../models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("../models/old-units").ExtendedUnit[] */ units,
) {
  // @ts-ignore
  unit.detail.festAbility = unit.detail.festAbility?.map(str => ({
    description: str,
  }))
  // @ts-ignore
  unit.detail.festAttackPattern = unit.detail.festAttackPattern?.map(str => ({
    description: str,
  }))
  // @ts-ignore
  unit.detail.festGPBurst = unit.detail.festAbilityGP?.map(
    ({ festGPSpecial, uses }) => ({
      description: festGPSpecial,
      // @ts-ignore
      condition: unit.detail.festAbilityGPCondition,
      use: uses,
    }),
  )
  // @ts-ignore
  unit.detail.festGPLeader = unit.detail.festAbilityGP?.map(
    ({ festGPAbility }) => ({
      description: festGPAbility,
    }),
  )
  // @ts-ignore
  delete unit.detail.festAbilityGP
  // @ts-ignore
  delete unit.detail.festAbilityGPCondition
  // @ts-ignore
  delete unit.detail.festStats
  // @ts-ignore
  delete unit.detail.specialCooldown

  return unit
}

/** @return { import("../models/old-units").ExtendedUnit } */
export function fixupSpecificIssue(
  /** @type import("../models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("../models/old-units").ExtendedUnit[] */ units,
) {
  if (unit.id === 2831 || unit.id === 2999 || unit.id === 3098) {
    // @ts-ignore
    if (unit.detail.sailor.character1 === null) {
      // @ts-ignore
      delete unit.detail.sailor.character1
      // @ts-ignore
      delete unit.detail.sailor.character2
      // @ts-ignore
      delete unit.detail.sailor.combined
    } else {
      console.warn(`issue with unit ${unit.id} "${unit.name}" has been fixed`)
    }
  }

  if (unit.evolutionMap?.includes(2784)) {
    // Lucci 6+
    if (unit.dbId === 1763) {
      return {
        ...unit,
        evolutionMap: [...unit.evolutionMap, 5016],
        evolution: {
          evolution: [2784, 5016],
          evolvers: [
            ['skullQCK', 'skullQCK', 'skullQCK', 1180, 301],
            ['skullQCK', 'skullQCK', 'skullQCK', 1180, 301],
          ],
        },
      }
    }

    return {
      ...unit,
      evolutionMap: [...unit.evolutionMap, 5016],
    }
  }

  if (unit.evolutionMap?.includes(2830)) {
    // Robin 6+
    if (unit.dbId === 1951) {
      return {
        ...unit,
        evolutionMap: [...unit.evolutionMap, 5062],
        evolution: {
          evolution: [2830, 5062],
          evolvers: [
            ['skullPSY', 'skullINT', 99, 304, 267],
            ['skullPSY', 'skullINT', 99, 304, 267],
          ],
        },
      }
    }

    return {
      ...unit,
      evolutionMap: [...unit.evolutionMap, 5062],
    }
  }

  if (unit.id === 2505) {
    // @ts-ignore
    if (unit.detail.special.level1) {
      // @ts-ignore
      unit.detail.special.llbbase = unit.detail.special.level1
      // @ts-ignore
      delete unit.detail.special.level1
    } else {
      console.warn(`issue with unit ${unit.id} "${unit.name}" has been fixed`)
    }
  }

  if (unit.id === 3719 || unit.id === 3720) {
    // @ts-ignore
    if (unit.detail.captinNotes) {
      // @ts-ignore
      unit.detail.captainNotes = unit.detail.captinNotes
      // @ts-ignore
      delete unit.detail.captinNotes
    } else {
      console.warn(`issue with unit ${unit.id} "${unit.name}" has been fixed`)
    }
  }

  if (unit.id === 3787 || unit.id === 3788) {
    if (!unit.pirateFest2) {
      unit.pirateFest2 = {
        class: 'SPT',
        DEF: 164,
        SPD: 193,
        minCP: undefined,
        maxCP: undefined,
      }
    } else {
      console.warn(`issue with unit ${unit.id} "${unit.name}" has been fixed`)
    }
  }

  // @ts-ignore
  if (unit.detail.limit?.[0]?.Name && unit.detail.potential?.length === 0) {
    // @ts-ignore
    unit.detail.potential = unit.detail.limit
    unit.detail.limit = []
  }

  if (unit.id === 4062) {
    // @ts-ignore
    if (unit.detail.SuperSpecialNotes) {
      // @ts-ignore
      unit.detail.superSpecialNotes = unit.detail.SuperSpecialNotes
      // @ts-ignore
      delete unit.detail.SuperSpecialNotes
    } else {
      console.warn(`issue with unit ${unit.id} "${unit.name}" has been fixed`)
    }
  }

  // @ts-ignore
  if (unit.detail.lLimit?.gpAbility) {
    // @ts-ignore
    delete unit.detail.lLimit.gpAbility
  }

  // @ts-ignore
  if (unit.detail.lLimit?.gpSpecial) {
    // @ts-ignore
    delete unit.detail.lLimit.gpSpecial
  }

  return unit
}

export function removeProp(
  /** @type any */ obj,
  /** @type string */ badName,
  /** @type string */ realName,
) {
  if (obj[badName]) {
    obj[realName] = obj[badName]
    delete obj[badName]
  }
}

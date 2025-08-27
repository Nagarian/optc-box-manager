// @ts-check
import {
  globalOnlyReverseMap,
  globalOnly,
  globalOnlyMissingInDb,
} from './glo-jap-remapper.js'

export function fixupWrapper(func) {
  /** @return { import("../models/old-units").ExtendedUnit } */
  return (
    /** @type import("../models/old-units").ExtendedUnit */ unit,
    /** @type number */ index,
    /** @type import("../models/old-units").ExtendedUnit[] */ units,
  ) => {
    try {
      return func(unit, index, units)
    } catch (error) {
      console.error(`Unit ${unit.id} - ${unit.name} has crashed`)
      throw error
    }
  }
}

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
      'Nutrition/Hunger': 'Nutrition/Reduce Hunger stacks',
      'Nutrition/Reduce Hunger duration': 'Nutrition/Reduce Hunger stacks',
      'Ship Bind Resistance': 'Reduce Ship Bind duration',
      'Sailor Despair': 'Reduce Sailor Despair duration',
      'No Healing': 'Reduce No Healing duration',
      'Slot Bind': 'Reduce Slot Bind duration',
      'Healing Reduction': 'Reduce Healing Reduction duration',
      'Special Use Limit': 'Reduce Special Use Limit duration',
      'Enrage/Increase Damage Taken': 'Enrage/Reduce Increase Damage Taken duration',
      'Slot Barrier': 'Reduce Slot Barrier duration',
      'Ship Bind': 'Reduce Ship Bind duration',
    }

    if (detail.potential.some(p => !!renamedPotentials[p.Name])) {
      detail.potential = detail.potential.map(p => ({
        ...p,
        Name: renamedPotentials[p.Name] ?? p.Name,
      }))
    }
  }

  detail.special = addNotes(
    descriptionToMarkdown(detail.special),
    detail.specialNotes,
  )
  delete detail.specialNotes

  detail.captain = addNotes(
    descriptionToMarkdown(detail.captain),
    detail.captainNotes,
  )
  delete detail.captainNotes

  if (detail.lLimit) {
    for (const limit of detail.lLimit) {
      if (limit?.captain) {
        limit.captain = descriptionToMarkdown(limit.captain)
      }

      if (limit?.special) {
        limit.special = descriptionToMarkdown(limit.special)
      }
    }
  }

  if (detail.limit) {
    detail.limit = detail.limit.map(({ description }) => ({
      description: descriptionToMarkdown(description),
    }))
  }

  if (typeof detail.swap === 'string') {
    detail.swap = addNotes(descriptionToMarkdown(detail.swap), detail.swapNotes)
    delete detail.swapNotes
  } else if (detail.swap) {
    detail.swap.base = addNotes(
      descriptionToMarkdown(detail.swap.base),
      detail.swapNotes,
    )
    detail.swap.super = addNotes(
      descriptionToMarkdown(detail.swap.super),
      detail.superSpecialNotes,
    )
    detail.swap.superTurns = Number(detail.swap.superTurns)
    delete detail.swapNotes
  }

  if (detail.rush) {
    detail.rush.description = detail.rush.description.map(descriptionToMarkdown)
    detail.rush.stats = detail.rush.stats.map(descriptionToMarkdown)
  }

  const keys = [
    'captainNotes',
    'specialNotes',
    'sailorNotes',
    'limitNotes',
    'potentialNotes',
    'lastTapNotes',
    'superTandemNotes',
    'supportNotes',
    'swapNotes',
    'superSpecialNotes',
    'superSpecialCriteriaNotes',
  ]

  for (const key of keys) {
    if (detail[key]?.includes('<')) {
      detail[key] = cleanHtml(detail[key])
    }
  }

  return detail
}

function cleanHtml(description) {
  if (!description) {
    return undefined
  }

  return (
    description
      .replaceAll(/\<br\/?\>/gi, '\n\n')
      .replaceAll(/\<\/?[uo]l\>/gi, '\n\n')
      .replaceAll(/\<li\>/gi, '- ')
      .replaceAll(/\<\/li\>/gi, '\n')
      .replaceAll(/(\s?)\<b\>(\s?)/gi, ' **')
      .replaceAll(/(\s?)\<\/b\>(\s?)/gi, '** ')
      .replaceAll(/(\s?)\<i\>(\s?)/gi, ' *')
      .replaceAll(/(\s?)\<\/em\>(\s?)/gi, '* ')
      .replaceAll(/\<hr\/?\>/gi, '\n---\n')
      // not html specific but present on the db
      .replaceAll(/\#\{.*\}/gi, '')
      .trim()
  )
}

function descriptionToMarkdown(description) {
  if (typeof description === 'string') {
    return cleanHtml(description)
  }

  if (typeof description !== 'object') {
    return ''
  }

  if (Array.isArray(description)) {
    return description
      .map(({ description }) => cleanHtml(description))
      .map((description, i) => `- **Stage ${i + 1}:** ${description}`)
      .join('\n')
  }

  return Object.entries(description)
    .filter(([key, value]) => !!value)
    .map(([key, value]) => [key, descriptionToMarkdown(value)])
    .filter(([key, value]) => !!value)
    .map(([key, value]) => [
      key,
      value.startsWith('- ')
        ? value.replaceAll('\n- ', '\n  - ').replace(/^- /, '  - ')
        : value,
    ])
    .map(([key, value]) => `- **${key}:** ${value}`)
    .join('\n')
}

function addNotes(description, notes) {
  if (!notes) {
    return description
  }

  const n = cleanHtml(notes).replaceAll('\n', '\n> ')
  return n ? `${description}\n\n> ${n}` : description
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
    `**Character 1:** ${obj.character1}\n\n**Character 2:** ${obj.character2}`

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
      captain: untyped.detail.captain,
      special: untyped.detail.special,
      sailor: {
        ...untyped.detail.sailor,
        combined: untyped.detail.sailor.character1,
      },
      festAbility: Array.isArray(untyped.detail.festAbility)
        ? untyped.detail.festAbility
        : untyped.detail.festAbility?.character1.map(
            (/** @type any */ desc, /** @type number */ i) => ({
              description: format({
                character1: desc.description,
                character2:
                  untyped.detail.festAbility.character2[i].description,
              }),
            }),
          ),
      festSpecial: Array.isArray(untyped.detail.festSpecial)
        ? untyped.detail.festSpecial
        : untyped.detail.festSpecial?.character1.map(
            (/** @type any */ desc, /** @type number */ i) => ({
              description: format({
                character1: desc.description,
                character2:
                  untyped.detail.festSpecial.character2[i].description,
              }),
              /** @type any */
              cooldown: `${desc.cooldown} / ${untyped.detail.festSpecial.character2[i].cooldown}`,
            }),
          ),
      festGPBurst: Array.isArray(untyped.detail.festGPBurst)
        ? untyped.detail.festGPBurst
        : untyped.detail.festGPBurst?.character1.map(
            (/** @type any */ desc, /** @type number */ i) => ({
              description: format({
                character1: desc.description,
                character2:
                  untyped.detail.festGPBurst.character2[i].description,
              }),
              condition: format({
                character1: desc.condition,
                character2: untyped.detail.festGPBurst.character2[i].condition,
              }),
              /** @type any */
              use: `${desc.use} / ${untyped.detail.festGPBurst.character2[i].use}`,
            }),
          ),
      festGPLeader: Array.isArray(untyped.detail.festGPLeader)
        ? untyped.detail.festGPLeader
        : untyped.detail.festGPLeader?.character1.map(
            (/** @type any */ desc, /** @type number */ i) => ({
              description: format({
                character1: desc.description,
                character2:
                  untyped.detail.festGPLeader.character2[i].description,
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
  } else if (
    // @ts-ignore
    unit.detail.potential?.find(p => p.Name === 'Super Tandem/Last Tap')
  ) {
    unit.detail.potential = unit.detail.potential.map(p =>
      // @ts-ignore
      p.Name === 'Super Tandem/Last Tap'
        ? {
            Name: 'Last Tap / Super Tandem',
            description: [
              'Last Tap Ability Lv.1 / Super Tandem Ability Lv.1',
              'Last Tap Ability Lv.2 / Super Tandem Ability Lv.2',
              'Last Tap Ability Lv.3 / Super Tandem Ability Lv.3',
              'Last Tap Ability Lv.4 / Super Tandem Ability Lv.4',
              'Last Tap Ability Lv.5 / Super Tandem Ability Lv.5',
            ],
          }
        : p,
    )
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
      thumbnail: `https://2shankz.github.io/optc-db.github.io/api/images/thumbnail/glo/5/000/${unit.id}.png`,
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
        : (globalOnlyReverseMap[unit.evolution.evolution] ??
          unit.evolution.evolution),
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
  unit.detail.festAbility = Array.isArray(unit.detail.festAbility)
    ? unit.detail.festAbility.map(str => ({ description: str }))
    : // @ts-ignore
      Array.isArray(unit.detail.festAbility?.base)
      ? // @ts-ignore
        unit.detail.festAbility.base.map(str => ({ description: str }))
      : undefined

  unit.detail.festSpecial = Array.isArray(unit.detail.festSpecial)
    ? unit.detail.festSpecial
    : // @ts-ignore
      Array.isArray(unit.detail.festSpecial?.base)
      ? // @ts-ignore
        unit.detail.festSpecial.base
      : undefined

  unit.detail.festResistance =
    typeof unit.detail.festResistance === 'string'
      ? unit.detail.festResistance
      : // @ts-ignore
        typeof unit.detail.festResistance?.base === 'string'
        ? // @ts-ignore
          unit.detail.festResistance.base
        : undefined

  // @ts-ignore
  unit.detail.festAttackPattern = unit.detail.festAttackPattern?.map(str => ({
    description: str,
  }))

  unit.detail.festGPBurst = // @ts-ignore
    (unit.detail.festAbilityGP?.base ?? unit.detail.festAbilityGP)?.map(
      ({ festGPSpecial, uses }) => ({
        description: festGPSpecial,
        // @ts-ignore
        condition: unit.detail.festAbilityGPCondition,
        use: uses,
      }),
    )

  unit.detail.festGPLeader = // @ts-ignore
    (unit.detail.festAbilityGP?.base ?? unit.detail.festAbilityGP)?.map(
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
  if ([2831, 2999, 3098].includes(unit.id)) {
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
    unit.evolutionMap = unit.evolutionMap.includes(5016)
      ? unit.evolutionMap
      : [...unit.evolutionMap, 5016]
    if (unit.dbId === 1763) {
      unit.evolution = {
        evolution: [2784, 5016],
        evolvers: [
          ['skullQCK', 'skullQCK', 'skullQCK', 1180, 301],
          ['skullQCK', 'skullQCK', 'skullQCK', 1180, 301],
        ],
      }
    }
  }

  if (unit.evolutionMap?.includes(2830)) {
    // Robin 6+
    unit.evolutionMap = unit.evolutionMap.includes(5062)
      ? unit.evolutionMap
      : [...unit.evolutionMap, 5062]
    if (unit.dbId === 1951) {
      unit.evolution = {
        evolution: [2830, 5062],
        evolvers: [
          ['skullPSY', 'skullINT', 99, 304, 267],
          ['skullPSY', 'skullINT', 99, 304, 267],
        ],
      }
    }
  }

  if ([3719, 3720].includes(unit.id)) {
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

  if ([3787, 3788].includes(unit.id)) {
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

  if ([4004].includes(unit.id)) {
    if (unit.detail.special?.includes('<table')) {
      unit.detail.special = `Applies various effects depending on the character's Support Character's type, Captain's type, character's orb, and current HP percentage when the Special is activated.\n\n| | Condition | Effect |\n|------------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|\n| Captain Type | [STR] or [DEX] | Deals 80x character's ATK in [QCK] damage to all enemies at the end of the turn for 3 turns |\n| | [QCK] | Reduces Special Cooldown of all characters by 2 turns. |\n| | [PSY] or [INT] | Reduces Swap Cooldown and VS Special Cooldown of all characters by 2 turns. |\n| Character's Orb | [STR], [DEX], [QCK], [PSY] or [INT] | Reduces enemies' Corresponding Type Resistance by -20% for 1 turn. |\n| | [RCV] or [TND] | Locks all orbs for 1 turn and adds 1.1x to Chain multiplier for 1 turn. |\n| | [G] or [RAINBOW] | Reduces enemies' [STR], [DEX], [QCK], [PSY] and [INT] Resistance by -20% for 1 turn and barriers all character's orbs for 1 GREAT hit. |\n| | [SEMLA], [BLOCK] or [SUPERBLOCK] | Increases damage received by 2x for 3 turns. |\n| Percent HP | 100%-80.01% | Reduces damage received by 80% for 1 turn. |\n| | 80%-50.01% | Recovers 20,000 HP. |\n| | 50%-10.01% | Reduces damage received by 100% for 1 turn. |\n| | <=10% | Recovers all missing HP. |\n| Support Character Type | [STR] | Boosts ATK of all characters by 2x for 3 turns. |\n| | [DEX] | Boosts ATK of all characters by 2.25x for 2 turns. |\n| | [QCK] | Boosts ATK of all characters by 2.5x for 1 turn. |\n| | [PSY] | Increases boost effects of ATK UP buffs by +0.3x. |\n| | [INT] | Increases boost effects of ATK UP buffs to 2.5x. |\n| | None | Boosts Orb Effects of all characters by 2.25x for 2 turns. |\n\n> The following orbs have no effects: [WANO], [EMPTY], [BOMB]. Other orbs are untested.\n`
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

  if (unit.id === 4157) {
    if (Number.isNaN(unit.limitATK)) {
      unit.limitATK = 0
      unit.limitexATK = 0
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

  // @ts-ignore
  if (unit.pirateFest.class === 'BAL') {
    unit.pirateFest.class = ''
  }

  const missingEvolInMap = unit.evolutionMap
    .map(id => missingEvolutionMap[id])
    .filter(Boolean)[0]
  if (!!missingEvolInMap && !unit.evolutionMap.includes(missingEvolInMap)) {
    unit.evolutionMap = [...unit.evolutionMap, missingEvolInMap]
  }

  const missingEvolValue = missingEvolutionMap[unit.id]
  if (missingEvolValue) {
    if (!unit.evolution) {
      unit.evolution = {
        evolution: missingEvolValue,
        evolvers: [new Array(5).fill(`${missingEvolValue}-skull`)],
      }
    } else {
      console.warn(
        `issue (evolution) with unit ${unit.id} "${unit.name}" has been fixed`,
      )
    }
  }

  return unit
}

const missingEvolutionMap = {}

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

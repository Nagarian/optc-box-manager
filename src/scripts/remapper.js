// const { Flags } = require('../models/character.ts')
const Flags = [
  'rr',
  'lrr',
  'slrr',
  'tmlrr',
  'kclrr',
  'pflrr',
  'shop',
  'tmshop',

  'global-only',
  'japan-only',

  'special',
]
const { globalOnlyMissingInDb } = require('./glo-jap-remapper')

/** @returns { import("models/character").ExtendedCharacter } */
function remapper (
  /** @type import("models/old-units").ExtendedUnit */ unit,
) {
  const unitType = Array.isArray(unit.type)
    ? unit.detail.VSCondition ? 'VS' : 'DUAL'
    : unit.type

  if ((unitType === 'DUAL' || unitType === 'VS') && !unit.dualCharacters?.length) {
    throw new Error(`unit ${unit.dbId} "${unit.name}" is a new dual unit without their sub-mapping`)
  }

  return {
    id: unit.id,
    dbId: unit.dbId,
    name: unit.name,
    frenchName: unit.aliases?.[1],
    japanName: unit.aliases?.[0],
    familyId: Math.max(unit.family.id, 0) || undefined,
    family: unit.family.name
      ? Array.isArray(unit.family.name)
          ? unit.family.name
          : [unit.family.name]
      : undefined,
    type: unitType,
    class: typeof unit.class === 'string'
      ? [unit.class]
      : unitType === 'VS'
        ? []
        : Array.isArray(unit.class[0])
          ? unit.class[0]
          : unit.class,
    rarity: unit.stars,
    cost: unit.cost,
    slots: unit.slots,
    maxLevel: unit.maxLevel || undefined,
    maxExp: unit.maxEXP || undefined,
    stats: extractStats(unit),
    flags: computeFlags(unit),
    dropLocation: computeDropLocation(unit),
    links: {
      gamewithId: unit.gamewith,
    },
    aliases: unit.aliases?.slice(2) ?? [],
    captain: extractCaptain(unit),
    superType: !unit.detail.superSpecial
      ? undefined
      : {
          criteria: unit.detail.superSpecialCriteria,
          description: unit.detail.superSpecial,
        },
    special: extractSpecial(unit),
    sailor: extractSailor(unit),
    support: extractSupport(unit),
    evolution: extractEvolution(unit),
    evolutionMap: unit.evolutionMap,
    pirateFest: !unit.pirateFest.class || unitType === 'VS'
      ? undefined
      : {
          class: unit.pirateFest.class,
          stats: {
            DEF: unit.pirateFest.DEF,
            SPD: unit.pirateFest.SPD,
          },
          targetPriority: unit.detail.festAttackTarget ?? '',
          resistance: unit.detail.festResistance ?? unit.detail.festResilience,
          ability: unit.detail.festAbility ?? [],
          behaviorPattern: unit.detail.festAttackPattern ?? [],
          special: unit.detail.festSpecial ?? [],
        },
    limitBreak: extractLimitBreak(unit),
    images: {
      full: unit.images.full,
      thumbnail: unit.images.thumbnail,
      thumbnail1: unit.dualCharacters?.[2]?.images?.thumbnail,
      thumbnail2: unit.dualCharacters?.[3]?.images?.thumbnail,
    },
    characters: !unit.dualCharacters?.length
      ? undefined
      : unit.detail.VSCondition
        ? {
            criteria: unit.detail.VSCondition,
            character1: extractVersusUnit(unit.dualCharacters[0], unit, true),
            character2: extractVersusUnit(unit.dualCharacters[1], unit, false),
          }
        : {
            swap: unit.detail.swap,
            character1: extractDualUnit(unit.dualCharacters[0], unit),
            character2: extractDualUnit(unit.dualCharacters[1], unit),
          },
  }
}

/** @returns { import("models/character").Flag } */
function computeFlags (
  /** @type import("models/old-units").ExtendedUnit */ unit,
) {
  /** @type import("models/character").Flag[] */
  const flags = [...new Set(
    Object.keys(unit.flags)
      .concat(unit.dropLocations)
      .map(f => {
        switch (f) {
          case 'global':
          case 'rr':
          case 'fnonly':
          case 'raid':
          case 'promo':
          case 'arena':
          case 'limited RR':
          case 'support RR':
          case 'TM RR':
          case 'Kizuna RR':
          case 'Rumble RR':
            return ''
          case 'rro':
          case 'rarerecruit':
            return 'rr'
          case 'gloOnly':
            return 'global-only'
          case 'japOnly':
            return 'japan-only'
          default:
            return f
        }
      }).filter(f => Flags.includes(f)) ?? [],
  )]

  return flags
}

/** @returns { import("models/character").Flag } */
function computeDropLocation (
  /** @type import("models/old-units").ExtendedUnit */ unit,
) {
  return unit.dropLocations.filter(x => [
    'limited RR',
    'TM RR',
    'Kizuna RR',
    'Rumble RR',
  ].includes(x) === false)
}

/** @returns { import("models/character").Statistics } */
function extractStats (
  /** @type import("models/old-units").ExtendedUnit */ unit,
) {
  return {
    combo: unit.combo || 0,
    minATK: unit.minATK || 0,
    minHP: unit.minHP || 0,
    minRCV: unit.minRCV || 0,
    maxATK: unit.maxATK || 0,
    maxHP: unit.maxHP || 0,
    maxRCV: unit.maxRCV || 0,
    growth: unit.growth || 0,
  }
}

/** @returns { import("models/character").Captain } */
function extractCaptain (
  /** @type import("models/old-units").ExtendedUnit */ unit,
) {
  const captain = unit.detail.captain

  if (!captain) return undefined

  if (typeof captain === 'string') {
    return {
      description: captain,
    }
  }

  if (captain.combined) {
    return {
      description: captain.combined,
    }
  }

  if (captain.character1) {
    return {
      description: `character 1: ${captain.character1}\n\ncharacter 2:${captain.character2}`,
    }
  }

  if (captain.base) {
    const levels = Object
      .entries(captain)
      .filter(([key, desc]) => key === 'base' || key.startsWith('level'))
      .map(([key, description]) => ({ description }))

    return {
      description: levels[levels.length - 1].description,
      levels,
    }
  }

  return undefined
}

/** @returns { import("models/character").Special } */
function extractSpecial (
  /** @type import("models/old-units").ExtendedUnit */ unit,
) {
  if (!unit.detail.special) return undefined

  const special = unit.detail.special
  const cooldown = unit.cooldown ?? []

  if (typeof special === 'string') {
    return {
      name: unit.detail.specialName || '',
      description: special,
      cooldown: cooldown[0],
      maxLevel: cooldown[0] - cooldown[1] + 1 || undefined,
    }
  }

  if (special.global) {
    return {
      name: unit.detail.specialName || '',
      description: `global: ${special.global}\n\njapan:${special.japan}`,
      cooldown: cooldown[0],
      maxLevel: cooldown[0] - cooldown[1] + 1 || undefined,
    }
  }

  if (special.character1) {
    return {
      name: unit.detail.specialName || '',
      description: `character 1: ${special.character1}\n\ncharacter 2:${special.character2}`,
      cooldown: cooldown[0],
      maxLevel: cooldown[0] - cooldown[1] + 1 || undefined,
    }
  }

  if (Array.isArray(special)) {
    const spe = special[special.length - 1]
    return {
      name: unit.detail.specialName || '',
      description: spe.description,
      cooldown: spe.cooldown[0],
      maxLevel: spe.cooldown[0] - spe.cooldown[1] + 1 || undefined,
      stages: special
        .slice(0, special.length - 1)
        .map(({ description, cooldown: [initial] }) => ({
          description,
          cooldown: initial,
        })),
    }
  }

  return undefined
}

/** @returns { import("models/character").Sailor[] } */
function extractSailor (
  /** @type import("models/old-units").ExtendedUnit */ unit,
) {
  const sailor = unit.detail.sailor
  if (!sailor) return undefined

  if (typeof sailor === 'string') {
    return [
      { description: sailor },
    ]
  }

  /** @type { import("models/character").Sailor[] } */
  const result = []

  if (sailor.base && sailor.base !== 'None') {
    result.push({ description: sailor.base })
  }

  if (sailor.base2 && sailor.base2 !== 'None') {
    result.push({ description: sailor.base2 })
  }

  if (sailor.combined && sailor.combined !== 'None') {
    result.push({ description: sailor.combined })
  } else if (sailor.character1 && sailor.character1 !== 'None') {
    // VS unit only
    result.push({ description: `character 1: ${sailor.character1}\n\ncharacter 2:${sailor.character2}` })
  }

  if (sailor.level1) {
    const unlockLvl = unit.detail.limit?.findIndex(x =>
      x.description.includes(sailor.level1) ||
      x.description.includes('Acquire Sailor Ability 1'),
    ) + 1 || undefined

    if (!unlockLvl && unit.detail.limit?.length) throw new Error(`unit ${unit.id} sailor unlocked lvl not found for: ${sailor.level1}`)

    result.push({
      description: sailor.level1,
      unlockedAt: unlockLvl,
    })
  }

  if (sailor.level2) {
    const unlockLvl = unit.detail.limit?.findIndex(x =>
      x.description.includes(sailor.level2) ||
      x.description.includes('Acquire Sailor Ability 2'),
    ) + 1 || undefined

    if (!unlockLvl && unit.detail.limit?.length) throw new Error(`unit ${unit.id} sailor unlocked lvl not found for: ${sailor.level2}`)

    result.push({
      description: sailor.level2,
      unlockedAt: unlockLvl,
    })
  }

  return result.length ? result : undefined
}

const AtkRegex = /Adds.+%.+ATK/i
const HpRegex = /Adds.+%.+HP/i
const RcvRegex = /Adds.+%.+RCV/i
const damageRegex = /Reduces damage received from \[?(STR|DEX|QCK|PSY|INT)\]?/i
const supportValueRegex = /Adds (?<value>\d+|\?)%.+(ATK|HP|RCV)/i
const supportReductionRegex = /Reduces damage received from \[?(STR|DEX|QCK|PSY|INT)\]?.+by (?<value>\d+|\?)%/i
/** @returns { import("models/character").Support } */
function extractSupport (
  /** @type import("models/old-units").ExtendedUnit */ unit,
) {
  if (!unit.detail.support?.length) return undefined
  const desc = unit.detail.support[0].description
  const lastDesc = desc[desc.length - 1]

  /** @type { import("models/character").SupportType[] } */
  const supportType = []
  if (AtkRegex.test(lastDesc)) {
    supportType.push('atk')
  }
  if (HpRegex.test(lastDesc)) {
    supportType.push('hp')
  }
  if (RcvRegex.test(lastDesc)) {
    supportType.push('rcv')
  }
  if (damageRegex.test(lastDesc)) {
    const val = 'def-' + damageRegex.exec(lastDesc)[1].toLowerCase()
    supportType.push(val)
  }
  if (!supportType.length) {
    supportType.push('other')
  }

  return {
    criteria: unit.detail.support[0].Characters,
    type: supportType,
    levels: desc.map(d => ({
      description: d,
      value: parseInt(supportValueRegex.exec(d)?.groups.value) || undefined,
      reduction: parseInt(supportReductionRegex.exec(d)?.groups.value) || undefined,
    })),
  }
}

/** @returns { import("models/character").Evolution[] } */
function extractEvolution (
  /** @type import("models/old-units").ExtendedUnit */ unit,
) {
  if (!unit.evolution) return undefined

  if (Array.isArray(unit.evolution.evolution)) {
    return unit.evolution.evolution.map((u, i) => ({
      id: u,
      evolvers: unit.evolution.evolvers[i],
    }))
  }

  return [
    {
      id: unit.evolution.evolution,
      evolvers: unit.evolution.evolvers,
    },
  ]
}

/** @returns { import("models/limitbreak").LimitBreak } */
function extractLimitBreak (
  /** @type import("models/old-units").ExtendedUnit */ unit,
) {
  if (!unit.detail.limit?.length && !unit.detail.potential?.length) return undefined

  /** @type { import('models/limitbreak').LBPotential[] } */
  const potentials = unit.detail.potential?.map(p => ({
    type: p.Name,
    levels: p.description.map(desc => extractPotentialLevel(p.Name, desc)),
  })) ?? []

  const path = unit.detail.limit?.map(lb => extractLBPathLevel(lb.description)) ?? []

  return {
    path,
    potentials,
  }
}

/** @type { { [key in import('models/limitbreak').Potential]: RegExp[] } } */
const potentialsRegex = {
  Enrage: [
    /^Boosts base ATK by (?<value>\d+|\?) the turn after taking damage and reduces Increase Damage Taken duration by (?<reduction>\d+|\?) turns?$/i,
    /^Boosts base ATK by (?<value>\d+|\?)$/i,
  ],
  'Critical Hit': [
    /^If you hit a PERFECT with this charaf?cter, there is a (?<threshold>\d+|\?)% chance to deal (?<value>\d+|\?)% of this character's attack in extra damage$/i,
  ],
  'Reduce Slot Bind duration': [
    /^Reduces Slot Bind duration by (?<value>\d+|\?) turns? on this character$/i,
    /^Reduces Slot Bind duration (?<value>completely) on this character$/i,
  ],
  'Reduce No Healing duration': [
    /^Reduces No Healing duration by (?<value>\d+|\?) turns?$/i,
    /^If there are (?<threshold>\d+|\?) Shooter characters in your crew, reduces No Healing duration by (?<value>\d+|\?) turns?$/i,
  ],
  'Pinch Healing': [
    /^If HP is below (?<threshold>\d+|\?)% at the start of the turn, (recovers|heals for) (?<value>\d+\.?\d*|\?)x this character's RCV at the end of the turn each time you hit a PERFECT with this character$/i,
  ],
  'Barrier Penetration': [
    /^This character's normal attack will ignore barriers if HP is above (?<threshold>\d+|\?)% at the start of the turn$/i,
    /^This character's normal attack will ignore barriers(?<threshold>)$/i,
  ],
  '[STR] Damage Reduction': [
    /^Reduces? damage (taken|received) from \[?STR\]? (characters|enemies) by (?<value>\d+|\?)%$/i,
  ],
  '[DEX] Damage Reduction': [
    /^Reduces? damage (taken|received) from \[?DEX\]? (characters|enemies) by (?<value>\d+|\?)%$/i,
  ],
  '[QCK] Damage Reduction': [
    /^Reduces? damage (taken|received) from \[?QCK\]? (characters|enemies) by (?<value>\d+|\?)%$/i,
  ],
  '[PSY] Damage Reduction': [
    /^Reduces? damage (taken|received) from \[?PSY\]? (characters|enemies) by (?<value>\d+|\?)%$/i,
  ],
  '[INT] Damage Reduction': [
    /^Reduces? damage (taken|received) from \[?INT\]? (characters|enemies) by (?<value>\d+|\?)%$/i,
  ],
  'Cooldown Reduction': [
    /^Reduce own Special Cooldown by (?<value>\d+|\?) turns? at the start of the fight$/i,
  ],
  'Double Special Activation': [
    /^Once per an adventure, reduce own Special Cooldown by (?<value>\d+|\?) turns? after the first time this special is used$/i,
    /^Once per an adventure, sets your Special Gauge to (?<value>MAX) after the first time this special is used$/i,
  ],
  'Reduce Ship Bind duration': [
    /^Reduce Ship Bind duration by (?<value>\d+|\?) turns?$/i,
  ],
  'Reduce Sailor Despair duration': [
    /^Reduces? own Sailor Despair duration by (?<value>\d+|\?) turns?$/i,
    /^Reduces? Sailor Despair duration by (?<value>\d+|\?) turns?$/i,
  ],
  'Nutrition/Hunger reduction': [
    /^Boosts base ATK by (?<value>\d+|\?) the turn after recovering (?<threshold>\d+,?\d*|\?) HP and reduces Hunger stack by (?<reduction>\d+|\?) stacks?$/i,
  ],
}
/** @returns { import('models/limitbreak').LBPotentialLevel } */
function extractPotentialLevel (
  /** @type { import('models/old-units').PotentialKey } */ type,
  /** @type { string } */ potentialDesc,
) {
  const regexes = potentialsRegex[type]

  const matchingRegex = regexes.find(regex => regex.test(potentialDesc))

  if (!matchingRegex) {
    throw new Error(`can't parse this potential: ${potentialDesc}`)
  }

  const result = matchingRegex.exec(potentialDesc)

  const mapper = value => {
    switch (value) {
      case '?':
        return undefined
      case 'MAX':
      case 'completely':
        return 99
      case '':
        return 0
      default:
        return value
          ? parseInt(value.replace(',', ''))
          : undefined
    }
  }

  return {
    value: mapper(result.groups.value),
    threshold: mapper(result.groups.threshold),
    reduction: mapper(result.groups.reduction),
  }
}

/** @type { { [key in import('models/limitbreak').LBPathType]: RegExp } } */
const lbPathRegex = {
  atk: /Boosts base ATK by (\d+|\?)/i,
  hp: /Boosts base HP by (\d+|\?)/i,
  rcv: /Boosts base RCV by (\d+|\?)/i,
  key: /LOCKED WITH KEY/i,
  slot: /Acquire (\d+|\?) additional Socket slot/i,
  cooldown: /Reduce base Special Cooldown by (\d+|\?)( turns?)?/i,
  potential: /Acquire Potential [1-9]: (.*)/i,
  sailor: /Acquire Sailor Ability [1-9#]?: (.*)/,
  captain: /Acquire new Captain Ability: (.*)/i,
}
/** @returns { import('models/limitbreak').LBPath } */
function extractLBPathLevel (
  /** @type { string } */ pathLevelDesc,
) {
  const entry = Object
    .entries(lbPathRegex)
    .find(([key, regex]) => regex.test(pathLevelDesc))

  if (!entry) {
    throw new Error(`can't parse this LBPath: ${pathLevelDesc}`)
  }

  const [type, regex] = entry
  const value = regex.exec(pathLevelDesc)[1]

  if (['atk', 'hp', 'rcv', 'slot', 'cooldown'].includes(type)) {
    return {
      type,
      value: value === '?' ? undefined : parseInt(value),
    }
  }

  return {
    type,
    value,
  }
}

/** @returns { import('models/character').ExtendedDualCharacter } */
function extractDualUnit (
  /** @type import("models/old-units").ExtendedUnit */ unit,
  /** @type import("models/old-units").ExtendedUnit */ base,
) {
  const sailors = extractSailor(unit)

  return {
    name: unit.name.replace('[Dual Unit] ', ''),
    frenchName: unit.aliases?.[1],
    japanName: unit.aliases?.[0],
    class: unit.class,
    type: unit.type,
    images: {
      thumbnail: unit.images.thumbnail,
      full: unit.images.full,
    },
    captain: extractCaptain(unit) || extractCaptain(base),
    special: extractSpecial({ ...unit, cooldown: base.cooldown }) || extractSpecial(base),
    sailor: sailors?.length ? sailors : extractSailor(base),
    stats: extractStats(unit),
  }
}

/** @returns { import('models/character').ExtendedVersusCharacter } */
function extractVersusUnit (
  /** @type any */ unit,
  /** @type import("models/old-units").ExtendedUnit */ base,
  /** @type boolean */ isFirstChar,
) {
  const charLitteral = isFirstChar ? 'character1' : 'character2'

  return {
    name: unit.name.replace('[VS Unit] ', ''),
    frenchName: unit.aliases?.[1],
    japanName: unit.aliases?.[0],
    class: unit.class,
    type: unit.type,
    images: {
      thumbnail: unit.images.thumbnail,
      full: unit.images.full,
    },
    captain: {
      description: base.detail.captain[charLitteral],
    },
    special: {
      name: base.detail.specialName,
      description: base.detail.special[charLitteral],
      cooldown: base.cooldown[0],
      maxLevel: base.cooldown[0] - base.cooldown[1] + 1,
    },
    sailor: [
      {
        description: base.detail.sailor[charLitteral],
      },
      base.detail.sailor.level1 && {
        description: base.detail.sailor.level1,
      },
    ].filter(x => !!x),
    pirateFest: {
      class: isFirstChar
        ? base.pirateFest.class[0]
        : base.pirateFest.DEF[0],
      stats: {
        DEF: isFirstChar
          ? base.pirateFest.class[1]
          : base.pirateFest.DEF[1],
        SPD: isFirstChar
          ? base.pirateFest.class[2]
          : base.pirateFest.DEF[2],
      },
      targetPriority: base.detail.festAttackTarget?.[charLitteral],
      resistance: (base.detail.festResistance ?? base.detail.festResilience)?.[charLitteral],
      ability: base.detail.festAbility?.[charLitteral] ?? [],
      behaviorPattern: base.detail.festAttackPattern?.[charLitteral] ?? [],
      special: base.detail.festSpecial?.[charLitteral] ?? [],
    },
    versus: {
      description: base.detail.VSSpecial[charLitteral],
    },
    stats: extractStats(unit),
  }
}

module.exports = {
  remapper,
}

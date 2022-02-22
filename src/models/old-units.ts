export const UnitTypes = ['STR', 'DEX', 'QCK', 'PSY', 'INT'] as const
export type UnitType = typeof UnitTypes[number]

export const UnitClasses = [
  'Fighter',
  'Shooter',
  'Slasher',
  'Striker',
  'Free Spirit',
  'Cerebral',
  'Powerhouse',
  'Driven',
] as const
export type UnitClass = typeof UnitClasses[number] | 'Evolver' | 'Booster'

export const Rarity = [1, 2, 3, 4, '4+', 5, '5+', 6, '6+'] as const
export type UnitStar = typeof Rarity[number]

export const UnitPirateFestStyles = ['ATK', 'DEF', 'RCV', 'DBF', 'SPT'] as const
export type UnitPirateFestStyle = typeof UnitPirateFestStyles[number]

export type SingleUnitClass = UnitClass | UnitClass[]

export type BaseUnit = {
  name: string
  type: UnitType | [UnitType, UnitType]
  class: SingleUnitClass | [SingleUnitClass, SingleUnitClass, SingleUnitClass]
  stars: UnitStar
  families: string[] | null
  cost: number
  combo: number
  slots: number
  maxLevel: number | null
  maxEXP: number | null
  minHP: number
  minATK: number
  minRCV: number
  maxHP: number | null
  maxATK: number | null
  maxRCV: number | null
  limitHP: number | null
  limitATK: number | null
  limitRCV: number | null
  limitSlot: number
  limitCD: number
  limitexHP: number | null
  limitexATK: number | null
  limitexRCV: number | null
  limitexSlot: number
  limitexCD: number
  growth: {
    hp: number
    atk: number
    rcv: number
  }
  number: number
  limitStats: {
    hp: number[]
    atk: number[]
    rcv: number[]
    sailors: number[]
    captains: number[]
  }
  pirateFest: {
    class?: UnitPirateFestStyle | ''
    DEF?: number | null
    SPD?: number | null
    minCP?: null
    maxCP?: null
  }
  pirateFest2: {
    class?: UnitPirateFestStyle | ''
    DEF?: number | null
    SPD?: number | null
    minCP?: null
    maxCP?: null
  } | null
  incomplete?: boolean
  preview?: boolean
  support?: undefined
}

export type LimitBreak = {
  description: string
}

export const Potentials = [
  'Enrage/Reduce Increase Damage Taken duration',
  'Critical Hit',
  'Reduce Slot Bind duration',
  'Reduce No Healing duration',
  'Pinch Healing',
  'Barrier Penetration',
  '[STR] Damage Reduction',
  '[DEX] Damage Reduction',
  '[QCK] Damage Reduction',
  '[PSY] Damage Reduction',
  '[INT] Damage Reduction',
  'Cooldown Reduction',
  'Double Special Activation',
  'Reduce Ship Bind duration',
  'Reduce Sailor Despair duration',
  'Reduce Slot Barrier duration',
  'Reduce Healing Reduction duration',
  'Nutrition/Reduce Hunger duration',
  'Last Tap',
] as const

export type PotentialKey = typeof Potentials[number]

export const PowerSockets = [
  'Damage Reduction',
  'Charge Specials',
  'Bind Resistance',
  'Despair Resistance',
  'Auto-Heal',
  'RCV Boost',
  'Slot Rate Boost',
  'Poison Resistance',
  'Map Damage Resistance',
  'Resilience',
] as const
export type PowerSocketKey = typeof PowerSockets[number]

export type UnitPotential = {
  Name: PotentialKey
  description: string[]
}

export type UnitLastTap = {
  condition: string
  description: string[]
}

export type UnitSupport = {
  Characters: string
  description: string[]
}

export type UnitFestAbility = {
  description: string
}

export type UnitFestSpecial = {
  description: string
  cooldown: number
}

export type UnitCooldown = [number, number]

export type UnitSpecial =
  | string
  | {
      cooldown: UnitCooldown
      description: string
    }[]
  | {
      character1: string
      character2: string
    }
  | {
      global: string
      japan: string
    }

export type UnitCaptain =
  | string
  | undefined
  | {
      character1: string
      character2: string
      combined: string
    }
  | {
      base: string
      level1: string
      level2?: string
      level3?: string
      level4?: string
      level5?: string
      level6?: string
    }

export type UnitSailor =
  | string
  | undefined
  | {
      base?: string
      base2?: string
      level1?: string
      level2?: string
    }
  | {
      character1: string
      character2: string
      combined: string
      level1?: string
      level2?: string
    }

export type UnitSuperSwap = {
  base: string
  super: string
  superTurns: number
}

export type UnitDetail = {
  captain: UnitCaptain
  captainNotes?: string
  special?: UnitSpecial
  specialNotes?: string
  sailor?: UnitSailor
  sailorNotes?: string
  specialName?: string
  limit?: LimitBreak[]
  limitNotes?: string
  potential?: UnitPotential[]
  potentialNotes?: string
  lastTap?: UnitLastTap[]
  lastTapNotes?: string
  support?: UnitSupport[]
  supportNotes?: string
  festAbility?: UnitFestAbility[]
  festSpecial?: UnitFestSpecial[]
  festAttackPattern?: UnitFestAbility[]
  festAttackTarget?: string
  festResistance?: string
  festResilience?: string
  swap?: string | UnitSuperSwap
  swapNotes?: string
  superSpecial?: string
  superSpecialNotes?: string
  superSpecialCriteria?: string
  VSCondition?: string
  VSSpecial?: {
    character1: string
    character2: string
  }
}

export type UnitEvolution = {
  evolution: number | number[]
  evolvers: any[] | any[][]
}

export type UnitImages = {
  thumbnail: string
  full: string
}

export type UnitFlags = {
  /** global available */
  global: 1 | undefined

  /** Rare recruit pools (include all other rr) */
  rr: 1 | undefined
  /** rare recruit */
  rro: 1 | undefined
  /** limiter rare recruit */
  lrr: 1 | undefined
  /** Support limited rare recruit */
  slrr: 1 | undefined
  /** TM rare recruit */
  tmlrr: 1 | undefined
  /** Kizuna rare recruit */
  kclrr: 1 | undefined
  /** Pirate Festival rare recruit */
  pflrr: 1 | undefined
  /** Super limited rare recruit */
  superlrr: 1 | undefined

  /** Fortnight only */
  fnonly: 1 | undefined
  /** Raid only */
  raid: 1 | undefined

  /** Rayleigh shop */
  shop: 1 | undefined
  /** TM trade port */
  tmshop: 1 | undefined

  /** ??? */
  promo: 1 | undefined
  /** Special characters (gifted mostly) */
  special: 1 | undefined

  inkable: 1 | undefined
  /** manually added */
  gloOnly: 1 | undefined
  japOnly: 1 | undefined
}

export type UnitFamily = Record<number, string[]>

export type ExtendedUnitFamily = {
  name?: string[]
  id: number
}

export const ExtendedDropKeys = [
  'rarerecruit',
  'limited RR',
  'support RR',

  'TM RR',
  'Kizuna RR',
  'Rumble RR',

  'treasuremap',
  'kizunaclash',
  'piratefest',

  'story',
  'fortnight',
  'ambush',

  'raid',
  'coliseum',
  'arena',

  'special',
] as const
export type ExtendedDrop = typeof ExtendedDropKeys[number]

export type ExtendedUnit = BaseUnit & {
  id: number
  dbId: number
  images: UnitImages
  evolution?: UnitEvolution
  cooldown?: UnitCooldown | null
  detail: UnitDetail
  flags: UnitFlags
  family: ExtendedUnitFamily
  dropLocations: ExtendedDrop[]
  evolutionMap: number[]
  dualCharacters?: ExtendedUnit[]
  gamewith?: number
  aliases?: string[]
  // [
  //   char1: ExtendedUnit,
  //   char2: ExtendedUnit,
  //   dual1?: ExtendedUnit,
  //   dual2?: ExtendedUnit,
  // ]
}

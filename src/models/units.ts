export const ColorUnitTypes = ['STR', 'DEX', 'QCK', 'PSY', 'INT'] as const
export const UnitTypes = [...ColorUnitTypes, 'DUAL', 'VS'] as const
export type UnitType = (typeof UnitTypes)[number]

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
export type UnitClass = (typeof UnitClasses)[number] | 'Evolver' | 'Booster'

export const Rarity = [1, 2, 3, 4, '4+', 5, '5+', 6, '6+'] as const
export type UnitStar = (typeof Rarity)[number]

export const UnitPirateFestStyles = ['ATK', 'DEF', 'RCV', 'DBF', 'SPT'] as const
export type UnitPirateFestStyle = (typeof UnitPirateFestStyles)[number]

export type SingleUnitClass = UnitClass | UnitClass[]

export type BaseUnit = {
  name: string
  type: UnitType | [UnitType, UnitType]
  class: SingleUnitClass | [SingleUnitClass, SingleUnitClass, SingleUnitClass]
  stars: UnitStar
  cost: number
  combo: number
  slots: number
  maxLevel: number
  maxEXP: number
  minHP: number
  minATK: number
  minRCV: number
  maxHP: number
  maxATK: number
  maxRCV: number
  limitHP: number
  limitATK: number
  limitRCV: number
  llbmaxHP: number
  llbmaxATK: number
  llbmaxRCV: number
  limitSlot: number
  limitCD: number
  limitexHP: number
  limitexATK: number
  limitexRCV: number
  limitexSlot: number
  limitexCD: number
  growth: {
    hp: number
    atk: number
    rcv: number
  }
  number: number
  pirateFest: {
    class?: UnitPirateFestStyle
    DEF: number
    SPD: number
  }
  incomplete: boolean
  preview: boolean
}

export type LimitBreak = {
  description: string
}

export const Potentials = [
  'Reduce Slot Bind duration',
  'Reduce No Healing duration',
  'Barrier Penetration',
  'Pinch Healing',
  'Enrage/Reduce Increase Damage Taken duration',
  'Critical Hit',
  'Cooldown Reduction',
  'Double Special Activation',
  '[STR] Damage Reduction',
  '[DEX] Damage Reduction',
  '[QCK] Damage Reduction',
  '[PSY] Damage Reduction',
  '[INT] Damage Reduction',
  'Reduce Ship Bind duration',
  'Reduce Sailor Despair duration',
  'Reduce Special Use Limit duration',
  'Reduce Slot Barrier duration',
  'Reduce Healing Reduction duration',
  'Nutrition/Reduce Hunger stacks',
  'Last Tap',
  'Super Tandem',
  'Last Tap / Super Tandem',
  'Triple Special Activation',
  'Rush',
  'Super Tandem Boost',
] as const

export type PotentialKey = (typeof Potentials)[number]

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
export type PowerSocketKey = (typeof PowerSockets)[number]

export type UnitPotential = {
  Name: PotentialKey
  description: string[]
}

export type UnitLastTap = {
  condition: string
  description: string[]
}

export type UnitRush = {
  characterCondition: string[]
  description: string[]
  stats: string[]
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

export type UnitFestGPBurst = {
  description: string
  condition: string
  use: number
}

export type UnitFestSuperSpecialDetail = {
  description: string
  condition: string
}

export type UnitFestSuperSpecial = {
  base: UnitFestSuperSpecialDetail
  llbbase: UnitFestSuperSpecialDetail
}

export type UnitCooldown = [number, number]

export type UnitSpecial = string

export type UnitCaptain = string

export type UnitSailor =
  | string
  | undefined
  | {
      base?: string
      base2?: string
      level1?: string
      level2?: string
      llbbase?: string
      llblevel1?: string
      llblevel2?: string
    }
  | {
      character1: string
      character2: string
      combined: string
      level1?: string
      level2?: string
      llblevel?: string
      llblevel1?: string
      llbcharacter1?: string
      llbcharacter2?: string
      llbcombined?: string
    }

export type UnitSuperSwap = {
  base: string
  super: string
  superTurns: number
}

export type UnitSuperTandem = {
  condition?: string
  characterCondition: string[]
  description: string[]
}

export type UnitLevelLimitBreak = null | Partial<{
  rAbility: true
  rSpecial: true
  rResilience: true
  gpAbility: true
  gpSpecial: true
  rSuperSpecial: true
  captain: UnitCaptain
  special: UnitSpecial
  sailor: UnitSailor
}>

export type UnitDetail = {
  captain: UnitCaptain
  captainNotes?: string
  special: UnitSpecial
  specialNotes?: string
  sailor: UnitSailor
  sailorNotes: string
  specialName: string
  limit?: LimitBreak[]
  limitNotes?: string
  potential?: UnitPotential[]
  potentialNotes: string
  lLimit?: UnitLevelLimitBreak[]
  lastTap?: UnitLastTap
  lastTapNotes?: string
  superTandem?: UnitSuperTandem
  superTandemNotes?: string
  superTandemBoost?: UnitSuperTandem
  superTandemBoostNotes?: string
  rush?: UnitRush
  support: UnitSupport[]
  supportNotes?: string
  festAbility: UnitFestAbility[]
  festSpecial: UnitFestSpecial[]
  festGPLeader?: UnitFestAbility[]
  festGPBurst?: UnitFestGPBurst[]
  festSuperSpecial?: UnitFestSuperSpecial
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
  evolvers: (string | number)[] | (string | number)[][]
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
  /** Anniversary limited rare recruit */
  annilrr: 1 | undefined

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

export type UnitFamily = string[]

export type ExtendedUnitFamily = {
  name: UnitFamily
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

  'pka',
  'special',
  'legend',
] as const
export type ExtendedDrop = (typeof ExtendedDropKeys)[number]

export type ExtendedUnit = BaseUnit & {
  id: number
  dbId: number
  images: UnitImages
  evolution?: UnitEvolution
  cooldown: UnitCooldown
  detail: UnitDetail
  flags: UnitFlags
  family: ExtendedUnitFamily
  dropLocations: ExtendedDrop[]
  evolutionMap: number[]
}

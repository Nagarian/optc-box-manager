export const UnitTypes = ['STR', 'DEX', 'QCK', 'INT', 'PSY'] as const
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

export type BaseUnit = {
  name: string
  type: UnitType | [UnitType, UnitType]
  class: UnitClass | UnitClass[] | [UnitClass[], UnitClass[], UnitClass[]]
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
  limitStats: {
    hp: number[]
    atk: number[]
    rcv: number[]
    sailors: number[]
    captains: number[]
  }
  incomplete: boolean
  preview: boolean
}

export type LimitBreak = {
  description: string
}

export const Potentials = [
  'Enrage',
  'Critical Hit',
  'Reduce Slot Bind duration',
  'Reduce No Healing duration',
  'Pinch Healing',
  'Barrier Penetration',
  '[STR] Damage Reduction',
  '[DEX] Damage Reduction',
  '[QCK] Damage Reduction',
  '[INT] Damage Reduction',
  '[PSY] Damage Reduction',
  'Cooldown Reduction',
  'Double Special Activation',
] as const

export type PotentialKey = typeof Potentials[number] | 'Reduce Ship Bind duration' | 'Reduce Sailor Despair duration'

export type UnitPotential = {
  Name: PotentialKey
  description: string[]
}

export type UnitSupport = {
  Characters: string
  description: string[]
}

export type UnitSpecial =
  | string
  | {
      cooldown: UnitCooldown
      description: string
    }[]

export type UnitDetail = {
  captain: string
  special: UnitSpecial
  sailor: {
    base: string
    level1: string
    level2: string
  }
  sailorNotes: string
  specialName: string
  limit: LimitBreak[]
  potential?: UnitPotential[]
  potentialNotes: string
  support: UnitSupport[]
}

export type UnitCooldown = [number, number]

export type UnitEvolution = {
  evolution: number
  evolvers: any[]
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
  /** TM rare recruit */
  tmlrr: 1 | undefined
  /** Kizuna rare recruit */
  kclrr: 1 | undefined
  /** Pirate Festival rare recruit */
  pflrr: 1 | undefined

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
}

export type UnitFamily = string | null | string[]

export type ExtendedUnitFamily = {
  name: UnitFamily
  id: number
}

export type ExtendedUnit = BaseUnit & {
  /** OPTC-DB real ID (used in url) */
  id: number
  images: UnitImages
  evolution?: UnitEvolution
  cooldown: UnitCooldown
  detail: UnitDetail
  flags: UnitFlags
  family: ExtendedUnitFamily
}

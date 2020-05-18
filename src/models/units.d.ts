export type UnitType = 'STR' | 'DEX' | 'QCK' | 'INT' | 'PSY'

export type UnitClass =
  | 'Fighter'
  | 'Shooter'
  | 'Slasher'
  | 'Striker'
  | 'Free Spirit'
  | 'Cerebral'
  | 'Powerhouse'
  | 'Driven'
  | 'Evolver'
  | 'Booster'

export type UnitStar = 1 | 2 | 3 | 4 | '4+' | 5 | '5+' | 6 | '6+'

export type BaseUnit = {
  name: string
  type: UnitType | UnitType[2]
  class: UnitClass[] | UnitClass[][3]
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

type LimitBreak = {
  description: string
}

export type PotentialKey =
  | 'Enrage'
  | 'Reduce No Healing duration'
  | '[QCK] Damage Reduction'
  | 'Critical Hit'
  | 'Pinch Healing'
  | 'Reduce Slot Bind duration'
  | 'Barrier Penetration'
  | '[STR] Damage Reduction'
  | '[INT] Damage Reduction'
  | '[PSY] Damage Reduction'
  | '[DEX] Damage Reduction'
  | 'Cooldown Reduction'
  | 'Double Special Activation'
  | 'Reduce Ship Bind duration'
  | 'Reduce Sailor Despair duration'

type Potential = {
  Name: PotentialKey
  description: string[]
}

type Support = {
  Characters: string
  description: string[]
}

type UnitDetail = {
  captain: string
  special: string
  sailor: {
    base: string
    level1: string
    level2: string
  }
  sailorNotes: string
  specialName: string
  limit: LimitBreak[]
  potential: Potential[]
  potentialNotes: string
  support: Support[]
}

type UnitCooldown = number[2]

type UnitEvolution = {
  evolution: number
  evolvers: any[]
}

type UnitImages = {
  thumbnail: string
  full: string
}

type UnitFlags = {
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

type ExtendedUnit = BaseUnit & {
  /** OPTC-DB real ID (used in url) */
  id: number
  images: UnitImage
  evolution?: UnitEvolution
  cooldown: UnitCooldown
  detail: UnitDetail
  flags: UnitFlags
}

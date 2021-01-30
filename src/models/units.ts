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

export const UnitPirateFestStyles = [
  'ATK',
  'DEF',
  'RCV',
  'DBF',
  'SPT',
] as const
export type UnitPirateFestStyle = typeof UnitPirateFestStyles[number]

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
  'Enrage',
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
  'Nutrition/Reduce Hunger duration',
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
  | { [key: string]: any } // luffy/law + robin 767

export type UnitCaptain = string | undefined | {
  character1: string
  character2: string
  combined: string
} | {
  base: string
  level1: string
  level2: string
  level3: string
  level4: string
  level5: string
  level6: string
}

export type UnitSailor = string | undefined | {
  base: string
  level1?: string
  level2?: string
} | {
  character1: string
  character2: string
  combined: string
  level1?: string
  level2?: string
}

export type UnitDetail = {
  captain: UnitCaptain
  special: UnitSpecial
  sailor: UnitSailor
  sailorNotes: string
  specialName: string
  limit?: LimitBreak[]
  potential?: UnitPotential[]
  potentialNotes: string
  support: UnitSupport[]
  festAbility: UnitFestAbility[]
  festSpecial: UnitFestSpecial[]
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

  /** manually added */
  gloOnly: 1 | undefined
  japOnly: 1 | undefined
}

export type UnitFamily = string | null | string[]

export type ExtendedUnitFamily = {
  name: UnitFamily
  id: number
}

export const ExtendedDropKeys = [
  'rarerecruit',
  'story',
  'fortnight',
  'raid',
  'coliseum',
  'ambush',
  'treasuremap',
  'kizunaclash',
  'piratefest',
  'special',
] as const
export type ExtendedDrop = typeof ExtendedDropKeys[number]

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

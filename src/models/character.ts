import { LimitBreak } from './limitbreak'

export const Types = ['STR', 'DEX', 'QCK', 'PSY', 'INT', 'DUAL', 'VS'] as const
export type Type = typeof Types[number]

export const Classes = [
  'Fighter',
  'Shooter',
  'Slasher',
  'Striker',
  'Free Spirit',
  'Cerebral',
  'Powerhouse',
  'Driven',
] as const
export type Class = typeof Classes[number] | 'Evolver' | 'Booster'

export const Rarities = [1, 2, 3, 4, '4+', 5, '5+', 6, '6+'] as const
export type Rarity = typeof Rarities[number]

export const PirateFestStyles = ['ATK', 'DEF', 'RCV', 'DBF', 'SPT'] as const
export type PirateFestStyle = typeof PirateFestStyles[number]

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
export type PowerSocket = typeof PowerSockets[number]

export const Flags = [
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
] as const
export type Flag = typeof Flags[number]

export const DropLocations = [
  'rarerecruit',
  'treasuremap',
  'kizunaclash',
  'piratefest',
  'story',
  'fortnight',
  'raid',
  'coliseum',
  'arena',
  'ambush',
  'special',
] as const
export type DropLocation = typeof DropLocations[number]

export type Statistics = {
  combo: number
  minHP: number
  minATK: number
  minRCV: number
  maxHP: number
  maxATK: number
  maxRCV: number
  growth: {
    hp: number
    atk: number
    rcv: number
  }
}

export type Evolution = {
  id: number
  evolvers: (number | string)[]
}

export type CaptainLevel = {
  description: string
}

export type Captain = {
  name?: string
  description: string
  levels?: CaptainLevel[]
}

export type SuperType = {
  criteria: string
  description: string
}

export type SpecialStage = {
  description: string
  cooldown: number
}

export type Special = {
  name: string
  description: string
  cooldown?: number
  maxLevel?: number
  stages?: SpecialStage[]
}

export type Sailor = {
  description: string
  unlockedAt?: number
}

export const SupportTypes = ['atk', 'hp', 'rcv', 'def-str', 'def-dex', 'def-qck', 'def-psy', 'def-int', 'other'] as const
export type SupportType = typeof SupportTypes[number]

export type SupportLevel = {
  description?: string
  value?: number
  reduction?: number
}

export type Support = {
  type: SupportType[]
  criteria: string
  levels: SupportLevel[]
}

export type PFAbility = {
  description: string
}

export type PFSpecial = {
  description: string
  cooldown: number
}

export type PFBehavior = {
  description: string
}

export type PFStat = {
  DEF: number
  SPD: number
}

export type PirateFest = {
  class: PirateFestStyle
  ability: PFAbility[]
  special: PFSpecial[]
  behaviorPattern: PFBehavior[]
  targetPriority: string
  resistance?: string
  stats: PFStat
}

export type AffiliatedLinks = {
  gamewithId?: number
  officialJapan?: string
}

export type DualCharacter = {
  name: string
  japanName?: string
  frenchName?: string
  type: Type
  class: Class[]
  stats: Statistics
  captain?: Captain
  special?: Special
  sailor?: Sailor[]
}

export type DualUnit = {
  character1: DualCharacter
  character2: DualCharacter
  swap: string
}

export type Versus = {
  description: string
}

export type VersusCharacter = {
  name: string
  japanName?: string
  frenchName?: string
  type: Type
  class: Class[]
  stats: Statistics
  captain?: Captain
  special?: Special
  sailor?: Sailor[]
  pirateFest?: PirateFest
  versus: Versus
}

export type VersusUnit = {
  character1: VersusCharacter
  character2: VersusCharacter
  criteria: string
}

export type Character = {
  name: string
  japanName?: string
  frenchName?: string
  family?: string[]
  type: Type
  class: Class[]
  rarity: Rarity
  cost: number
  slots: number
  maxLevel?: number
  maxExp?: number
  stats: Statistics
  flags: Flag[]
  links: AffiliatedLinks
  aliases: string[]

  captain?: Captain
  superType?: SuperType
  special?: Special
  sailor?: Sailor[]
  limitBreak?: LimitBreak
  evolution?: Evolution[]
  support?: Support
  pirateFest?: PirateFest
  characters?: DualUnit | VersusUnit
}

export type CharacterImages = {
  thumbnail?: string
  full?: string
  thumbnail1?: string
  thumbnail2?: string
}

export type ExtendedDualCharacter = DualCharacter & {
  images: CharacterImages
}
export type ExtendedDualUnit = DualUnit & {
  character1: ExtendedDualCharacter
  character2: ExtendedDualCharacter
}

export type ExtendedVersusCharacter = VersusCharacter & {
  images: CharacterImages
}
export type ExtendedVersusUnit = VersusUnit & {
  character1: ExtendedVersusCharacter
  character2: ExtendedVersusCharacter
}

export type ExtendedCharacter = Character & {
  id: number
  dbId: number
  familyId?: number
  images: CharacterImages
  evolutionMap: number[]
  dropLocation: DropLocation[]
  characters?: ExtendedDualUnit | ExtendedVersusUnit
}

export type Attribute =
  | 'SPD'
  | 'ATK'
  | 'DEF'
  | 'HP'
  | 'RCV'
  | 'Critical Hit'
  | 'Guard'
  | 'Accuracy'
  | 'Blow Away'
  | 'Special CT'
  | 'Silence'
  | 'Provoke'
  | 'Paralysis'
  | 'Damage Over Time'
  | 'Action Bind'
  | 'near'
export type TargetingPriority = 'highest' | 'lowest'
export type TargetElement = Targets | Classes | Colors
export type Targets = 'self' | 'crew' | 'enemies'
export type Classes =
  | 'Fighter'
  | 'Slasher'
  | 'Shooter'
  | 'Striker'
  | 'Driven'
  | 'Free Spirit'
  | 'Cerebral'
  | 'Powerhouse'
export type Colors = '[STR]' | '[DEX]' | '[QCK]' | '[PSY]' | '[INT]'
export type EffectEnum =
  | 'buff'
  | 'debuff'
  | 'hinderance'
  | 'damage'
  | 'recharge'
  | 'boon'
  | 'penalty'
export type AttackEffectType = 'atk' | 'time' | 'cut' | 'fixed'
export type RechargeEffectType = 'Special CT' | 'RCV' | 'percentage' | 'fixed'
export type Direction = 'forward' | 'radial' | 'sideways'
export type Size = 'large' | 'small' | 'medium'
export type ConditionComparator =
  | 'above'
  | 'below'
  | 'remaining'
  | 'first'
  | 'after'
  | 'more'
  | 'less'
export type ConditionType = 'stat' | 'time' | 'crew' | 'enemies' | 'trigger'
export type Pattern = AttackPattern | HealPattern
export type Action = 'attack' | 'heal'
export type PatternType = 'Normal' | 'Power' | 'Full'
export type Area = 'Self' | 'Small' | 'Large' | 'Medium'
export type RumbleType = 'ATK' | 'DEF' | 'SPT' | 'DBF' | 'RCV'
export type Entry = Unit | Reference

export interface RumbleSchema {
  units?: Entry[]
  [k: string]: unknown
}
export interface Unit {
  ability: [Ability, Ability, Ability, Ability, Ability]
  global?: Unit
  id: number
  japan?: Unit
  pattern: [Pattern, ...Pattern[]]
  special: [
    Special,
    Special,
    Special,
    Special,
    Special,
    Special,
    Special,
    Special,
    Special,
    Special,
  ]
  stats: Stats
  target: TargetClass
  resilience?: DebuffResilience | HealingResilience
  isBaseForm?: boolean
  name?: string
  lvl5Ability?: Effect[]
  lvl10Special?: Effect[]
  lvl10Cooldown?: number
  thumbnailUrl?: string
}
export interface Ability {
  effects: (Effect | EffectOverride)[]
}
export interface Effect {
  attributes?: Attribute[]
  chance?: number
  duration?: number
  effect: EffectEnum
  targeting: Targeting
  amount?: number
  level?: number
  range?: Range
  condition?: Condition
  type?: AttackEffectType | RechargeEffectType
}
export interface EffectOverride {
  override?: {
    attributes?: Attribute[]
    chance?: number
    duration?: number
    targeting?: Targeting
    amount?: number
    level?: number
    range?: Range
    condition?: Condition
  }
}
export interface Targeting {
  count?: number
  priority?: TargetingPriority
  stat?: Attribute
  targets: TargetElement[]
}
export interface Range {
  direction: Direction
  size: Size
}
export interface Condition {
  comparator?: ConditionComparator
  stat?: Attribute
  type: ConditionType
  count?: number
}
export interface AttackPattern {
  action: Action
  type: PatternType
}
export interface HealPattern {
  action: Action
  area: Area
  level: number
}
export interface Special {
  cooldown: number
  effects: (Effect | EffectOverride)[]
}
export interface Stats {
  rumbleType: RumbleType
  def: number
  spd: number
  hp?: number
  atk?: number
  rcv?: number
  type?: string
  class1?: string
  class2?: string
}
export interface TargetClass {
  comparator?: TargetingPriority
  criteria: Attribute
}
export interface DebuffResilience {
  attribute: Attribute
  chance: number
}
export interface HealingResilience {
  condition?: Condition
  amount: number
  interval: number
}
export interface Reference {
  id: number
  basedOn: number
}

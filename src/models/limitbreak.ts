export const Potentials = [
  'Reduce Slot Bind duration',
  'Reduce No Healing duration',
  'Barrier Penetration',
  'Pinch Healing',
  'Enrage', // Enrage/Reduce Increase Damage Taken duration
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
  'Nutrition/Reduce Hunger duration',
] as const
export type Potential = typeof Potentials[number]

export const LBPathTypes = [
  'hp',
  'atk',
  'rcv',
  'potential',
  'slot',
  'sailor',
  'cooldown',
  'captain',
  'key',
] as const
export type LBPathType = typeof LBPathTypes[number]

export type LBPath = {
  type: LBPathType
  value?: number | string
}

export type LBPotentialLevel = {
  threshold?: number
  value?: number
  reduction?: number
}

export type LBPotential = {
  type: Potential
  levels: LBPotentialLevel[]
}

export type LimitBreak = {
  path: LBPath[]
  potentials: LBPotential[]
}

export const LBDescriptionPattern = {
  Enrage: 'Boosts base ATK by {value} the turn after taking damage and reduces Increase Damage Taken duration by {reduction} turn',
  'Critical Hit': 'If you hit a PERFECT with this character, there is a {threshold}% chance to deal {value}% of this character\'s attack in extra damage',
  'Reduce Slot Bind duration': 'Reduces Slot Bind duration by {value} turn on this character',
  'Reduce No Healing duration': 'Reduces No Healing duration by {value} turn',
  'Pinch Healing': 'If HP is below {threshold}% at the start of the turn, recovers {value}x this character\'s RCV at the end of the turn each time you hit a PERFECT with this character',
  'Barrier Penetration': 'This character\'s normal attack will ignore barriers if HP is above {threshold}% at the start of the turn',
  '[STR] Damage Reduction': 'Reduce damage taken from STR characters by {value}%',
  '[DEX] Damage Reduction': 'Reduce damage taken from DEX characters by {value}%',
  '[QCK] Damage Reduction': 'Reduce damage taken from QCK characters by {value}%',
  '[PSY] Damage Reduction': 'Reduce damage taken from PSY characters by {value}%',
  '[INT] Damage Reduction': 'Reduce damage taken from INT characters by {value}%',
  'Cooldown Reduction': 'Reduce own Special Cooldown by {value} turn at the start of the fight',
  'Double Special Activation': 'Once per an adventure, reduce own Special Cooldown by {value} turns after the first time this special is used',
  'Reduce Ship Bind duration': 'Reduce Ship Bind duration by {value} turn',
  'Reduce Sailor Despair duration': 'Reduce own Sailor Despair duration by {value} turns',
  'Nutrition/Reduce Hunger duration': 'Boosts base ATK by {value} the turn after recovering {threshold} HP and reduces Hunger stack by {reduction} stacks',
}

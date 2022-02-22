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
  'Reduce Slot Barrier duration',
  'Reduce Healing Reduction duration',
  'Nutrition/Reduce Hunger duration',
  'Last Tap',
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

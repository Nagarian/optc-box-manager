export const GatherIslandTypes = [
  'gemTree',
  'berryCave',
  'trainingGround',
  'meatRoaster',
  'fishingSpot',
  'treasureHunters',
  'guidingMine',
  'springOfVitality',
  'monumentOfFerocity',
  'monumentOfHealing',
  'monumentOfEndurance',
] as const
export type GatherIslandType = (typeof GatherIslandTypes)[number]

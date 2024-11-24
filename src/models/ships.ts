export type Ship = {
  id: number
  name: string
  obtention: string
  images: ShipImage
  levels: ShipLevel[]
  skills?: readonly [ShipSkill, ShipSkill]
  notes?: string
  events?: ShipEventLevel[]
}

export type ShipImage = {
  thumbnail: string
  full: string
}

export type ShipLevel = {
  cola: number
  superCola: number
  ability: ShipAbility
  special?: ShipSpecial
}

export type ShipAbility = {
  description: string
}

export type ShipSpecial = {
  cooldown: number
  description: string
}

export type ShipSkill = {
  condition: string
  /** Detail of the modification as shown into the game */
  description: string
  ability?: ShipAbility
  special?: ShipSpecial
}

export type ShipEventLevel = {
  /** Reason of the event level */
  description: string
  ability: ShipAbility
  special?: ShipSpecial
}

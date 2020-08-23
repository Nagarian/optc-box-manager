import { UnitType } from './units'

export type EventDrop = {
  id: string
  name: string
  icon: string
  units: number[]
  manual: number[]
}

export type EventDropLight = number[]

export type BookEventDrop = EventDrop & {
  category: UnitType
}
